
import React, { useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Clock, ChevronLeft, Tag, List, Calendar, User, ArrowLeft } from 'lucide-react';
import { ARTICLES } from '../data';
import { CodeBlock, Badge, RelatedArticleCard, SocialShare } from '../components/UI';
import { SEO } from '../components/Layout';

const TableOfContents: React.FC<{ content: string }> = ({ content }) => {
    const headings = useMemo(() => {
        const regex = /^(##|###)\s+(.+)$/gm;
        const results = [];
        let match;
        while ((match = regex.exec(content)) !== null) {
            results.push({
                level: match[1].length,
                text: match[2],
                id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-')
            });
        }
        return results;
    }, [content]);

    const scrollToHeading = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    if (headings.length === 0) return null;

    return (
        <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-6 sticky top-28 hidden lg:block">
            <h4 className="font-bold text-navy-900 dark:text-white mb-4 flex items-center gap-2">
                <List size={16} className="text-neon-blue" />
                Contents
            </h4>
            <nav className="space-y-1">
                {headings.map((heading, idx) => (
                    <button
                        key={idx}
                        onClick={() => scrollToHeading(heading.id)}
                        className={`block text-left w-full text-sm py-1.5 transition-colors border-l-2 border-transparent hover:border-neon-dark dark:hover:border-neon-green ${
                            heading.level === 3 ? 'pl-6 text-xs text-gray-500' : 'pl-3 text-gray-700 dark:text-gray-300 font-medium'
                        } hover:text-neon-dark dark:hover:text-neon-green`}
                    >
                        {heading.text}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const article = ARTICLES.find(a => a.slug === slug);
  
  // Detect if user came from Troubleshooting page via state or just assume back is valuable
  const fromTroubleshooting = location.state?.from === 'troubleshooting';

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    let related = ARTICLES.filter(a => a.category === article.category && a.id !== article.id);
    if (related.length < 3) {
        const remaining = ARTICLES.filter(a => a.category !== article.category && a.id !== article.id);
        related = [...related, ...remaining];
    }
    return related.slice(0, 3);
  }, [article]);

  const processedContent = useMemo(() => {
      if (!article) return '';
      return article.content.replace(/^(##|###)\s+(.+)$/gm, (match, level, text) => {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
          return `${level} ${text} <a id="${id}" class="invisible absolute -mt-24"></a>`;
      });
  }, [article]);

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-20 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4 text-navy-900 dark:text-white">Article Not Found</h2>
        <p className="text-gray-600 mb-8">The guide you are looking for does not exist or has been moved.</p>
        <Link to="/articles" className="px-6 py-3 bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 rounded-lg font-bold">Return to Knowledge Base</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": article.coverImage || "https://microsoftadmin.in/og-default.png",
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "MicrosoftAdmin.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://microsoftadmin.in/logo.png"
      }
    },
    "datePublished": article.publishedDate,
    "description": article.excerpt
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]*?)```/);
        const lang = match ? match[1] : 'powershell';
        const code = match ? match[2] : part.slice(3, -3);
        return <CodeBlock key={index} language={lang || 'powershell'} code={code.trim()} />;
      } else {
        return (
          <div key={index} className="prose prose-slate dark:prose-invert max-w-none text-navy-800 dark:text-gray-300">
            {part.split('\n').map((line, i) => {
                if (line.includes('<a id=')) {
                    const cleanLine = line.replace(/<a id=".*?" class=".*?"><\/a>/, '');
                    const match = line.match(/id="(.*?)"/);
                    const id = match ? match[1] : '';
                    if (line.startsWith('# ')) return <h1 key={`${index}-${i}`} id={id} className="scroll-mt-24 text-3xl font-bold mt-10 mb-6 text-navy-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-4">{cleanLine.replace('# ', '')}</h1>;
                    if (line.startsWith('## ')) return <h2 key={`${index}-${i}`} id={id} className="scroll-mt-24 text-2xl font-bold mt-10 mb-6 text-neon-blue">{cleanLine.replace('## ', '')}</h2>;
                    if (line.startsWith('### ')) return <h3 key={`${index}-${i}`} id={id} className="scroll-mt-24 text-xl font-bold mt-6 mb-4 text-navy-900 dark:text-white">{cleanLine.replace('### ', '')}</h3>;
                }
                if (line.startsWith('# ')) return <h1 key={`${index}-${i}`} className="text-3xl font-bold mt-10 mb-6 text-navy-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-4">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={`${index}-${i}`} className="text-2xl font-bold mt-10 mb-6 text-neon-blue">{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={`${index}-${i}`} className="text-xl font-bold mt-6 mb-4 text-navy-900 dark:text-white">{line.replace('### ', '')}</h3>;
                if (line.trim().startsWith('* ')) return <li key={`${index}-${i}`} className="ml-4 list-disc marker:text-neon-dark dark:marker:text-neon-green mb-2 pl-1">{line.replace('* ', '')}</li>;
                if (line.match(/^\d+\. /)) return <li key={`${index}-${i}`} className="ml-4 list-decimal marker:text-neon-blue mb-2 pl-1">{line.replace(/^\d+\. /, '')}</li>;
                if (line.startsWith('> ')) return <blockquote key={`${index}-${i}`} className="border-l-4 border-neon-green pl-4 italic text-gray-600 dark:text-gray-400 my-6 bg-gray-50 dark:bg-white/5 py-4 pr-4 rounded-r">{line.replace('> ', '')}</blockquote>;
                if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
                     const cells = line.split('|').filter(c => c.trim() !== '');
                     return (
                         <div key={`${index}-${i}`} className="grid grid-cols-2 md:grid-cols-3 gap-4 border-b border-gray-200 dark:border-white/10 py-3 text-sm">
                             {cells.map((cell, cIdx) => <div key={cIdx} className="font-mono">{cell.trim()}</div>)}
                         </div>
                     )
                }
                if (line.trim() === '') return <br key={`${index}-${i}`} className="block h-2" />;
                
                const boldParts = line.split(/(\*\*.*?\*\*)/g);
                return (
                    <p key={`${index}-${i}`} className="mb-4 leading-7 text-base md:text-lg">
                        {boldParts.map((part, bIdx) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={bIdx} className="text-navy-900 dark:text-white font-bold">{part.slice(2, -2)}</strong>;
                            }
                            return part;
                        })}
                    </p>
                );
            })}
          </div>
        );
      }
    });
  };

  return (
    <>
      <SEO 
        title={`${article.title} | MicrosoftAdmin.in`} 
        description={article.excerpt} 
        keywords={article.tags}
        image={article.coverImage}
        type="article" 
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex flex-col gap-2 mb-8">
             <div className="flex items-center space-x-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-2">
                <Link to="/" className="hover:text-navy-900 dark:hover:text-white">Home</Link>
                <ChevronLeft size={12} className="rotate-180 flex-shrink-0" />
                <Link to="/articles" className="hover:text-navy-900 dark:hover:text-white">Knowledge Base</Link>
                <ChevronLeft size={12} className="rotate-180 flex-shrink-0" />
                <Link to={`/articles?category=${encodeURIComponent(article.category)}`} className="hover:text-navy-900 dark:hover:text-white">{article.category}</Link>
                <ChevronLeft size={12} className="rotate-180 flex-shrink-0" />
                <span className="text-neon-dark dark:text-neon-green truncate max-w-[200px] font-medium">{article.title}</span>
             </div>
             {/* Conditional Back Link for Troubleshooting Context */}
             {fromTroubleshooting && (
                 <Link to="/troubleshooting" className="text-xs font-bold text-neon-blue hover:underline flex items-center gap-1">
                     <ArrowLeft size={12} /> Back to Troubleshooting Hub
                 </Link>
             )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Main Article Column */}
            <div className="lg:col-span-8">
                {/* Header */}
                <div className="mb-10">
                    {article.series && (
                        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wide">
                            <List size={12} /> Part of Series: {article.series}
                        </div>
                    )}
                    <div className="mb-4">
                        <Badge text={article.category} color="bg-neon-green/10 text-neon-dark dark:text-neon-green" />
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight text-navy-900 dark:text-white tracking-tight">{article.title}</h1>
                    
                    {/* Meta Block */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-white/10">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center mr-3 text-navy-900 font-bold shadow-lg">
                                {article.author.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-navy-900 dark:text-white">{article.author}</div>
                                <div className="text-xs">M365 Architect</div>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-gray-200 dark:bg-white/10 hidden sm:block"></div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center" title="Published Date">
                                <Calendar size={16} className="mr-2 text-neon-dark dark:text-neon-green" /> 
                                <span>{article.publishedDate}</span>
                            </div>
                            <div className="flex items-center" title="Reading Time">
                                <Clock size={16} className="mr-2 text-neon-blue" /> 
                                <span>{article.readTime} min read</span>
                            </div>
                        </div>
                    </div>

                    {article.coverImage && (
                        <div className="rounded-2xl overflow-hidden shadow-2xl mb-10 border border-gray-200 dark:border-white/10 relative group">
                            <img 
                                src={article.coverImage} 
                                alt={article.title} 
                                className="w-full max-h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"></div>
                        </div>
                    )}

                    <div className="p-6 bg-blue-50 dark:bg-navy-800 rounded-xl border border-blue-100 dark:border-navy-700 mb-10 border-l-4 border-l-neon-blue">
                        <p className="text-lg md:text-xl text-navy-900 dark:text-gray-300 italic leading-relaxed">
                            {article.excerpt}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <article className="mb-16 min-h-[500px]">
                    {renderContent(processedContent)}
                </article>

                <div className="mb-12">
                    <SocialShare title={article.title} />
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 pt-10 mt-10 mb-16">
                    <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4 font-bold">Filed Under</h4>
                    <div className="flex flex-wrap gap-2 mb-10">
                        {article.tags.map(tag => (
                            <span key={tag} className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm border border-gray-200 dark:border-white/10 hover:border-neon-dark dark:hover:border-neon-green transition-colors cursor-default">
                                <Tag size={12} className="mr-2" /> {tag}
                            </span>
                        ))}
                    </div>
                    
                    <Link to="/articles" className="inline-flex items-center px-6 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-navy-900 dark:text-white rounded-lg font-bold hover:bg-gray-50 dark:hover:bg-white/10 transition-colors">
                        <ChevronLeft size={20} className="mr-2" /> Back to Knowledge Base
                    </Link>
                </div>
            </div>

            {/* Sidebar Column (TOC) */}
            <div className="lg:col-span-4 relative">
                <TableOfContents content={article.content} />
            </div>

          </div>

          {/* Related Articles Block */}
          <div className="mt-20 border-t border-gray-200 dark:border-white/10 pt-12">
            <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-8">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                  <RelatedArticleCard key={rel.id} article={rel} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};
