import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, Calendar, User, ChevronLeft, Tag } from 'lucide-react';
import { ARTICLES } from '../data';
import { CodeBlock, Badge, RelatedArticleCard, SocialShare } from '../components/UI';
import { SEO } from '../components/Layout';

export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find(a => a.slug === slug);

  // Related Articles Logic
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    
    // 1. Filter by same category, exclude current
    let related = ARTICLES.filter(a => a.category === article.category && a.id !== article.id);
    
    // 2. Fallback if not enough
    if (related.length < 3) {
        const remaining = ARTICLES.filter(a => a.category !== article.category && a.id !== article.id);
        related = [...related, ...remaining];
    }
    
    // Return top 4
    return related.slice(0, 4);
  }, [article]);

  if (!article) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4 text-navy-900 dark:text-white">Article Not Found</h2>
        <Link to="/articles" className="text-neon-dark dark:text-neon-green hover:underline">Return to Knowledge Base</Link>
      </div>
    );
  }

  // Robust renderer for mixed Markdown content
  const renderContent = (content: string) => {
    // Split by code blocks first
    const parts = content.split(/```/);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        const [lang, ...codeLines] = part.split('\n');
        return <CodeBlock key={index} language={lang.trim() || 'powershell'} code={codeLines.join('\n').trim()} />;
      } else {
        // This is text content (Markdown-ish)
        return (
          <div key={index} className="prose prose-slate dark:prose-invert max-w-none text-navy-800 dark:text-gray-300">
            {part.split('\n').map((line, i) => {
                // Headers
                if (line.startsWith('# ')) return <h1 key={`${index}-${i}`} className="text-3xl font-bold mt-10 mb-6 text-navy-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-4">{line.replace('# ', '')}</h1>;
                if (line.startsWith('## ')) return <h2 key={`${index}-${i}`} className="text-2xl font-bold mt-8 mb-4 text-neon-blue">{line.replace('## ', '')}</h2>;
                if (line.startsWith('### ')) return <h3 key={`${index}-${i}`} className="text-xl font-bold mt-6 mb-3 text-navy-900 dark:text-white">{line.replace('### ', '')}</h3>;
                if (line.startsWith('#### ')) return <h4 key={`${index}-${i}`} className="text-lg font-bold mt-4 mb-2 text-gray-700 dark:text-gray-200">{line.replace('#### ', '')}</h4>;
                
                // Lists
                if (line.trim().startsWith('* ')) return <li key={`${index}-${i}`} className="ml-4 list-disc marker:text-neon-dark dark:marker:text-neon-green mb-1 pl-1">{line.replace('* ', '')}</li>;
                if (line.trim().startsWith('- ')) return <li key={`${index}-${i}`} className="ml-4 list-disc marker:text-neon-blue mb-1 pl-1">{line.replace('- ', '')}</li>;
                if (line.match(/^\d+\. /)) return <li key={`${index}-${i}`} className="ml-4 list-decimal marker:text-neon-blue mb-1 pl-1 font-medium">{line.replace(/^\d+\. /, '')}</li>;
                
                // Blockquotes
                if (line.startsWith('> ')) return <blockquote key={`${index}-${i}`} className="border-l-4 border-neon-green pl-4 italic text-gray-600 dark:text-gray-400 my-4 bg-gray-50 dark:bg-white/5 py-2 pr-2 rounded-r">{line.replace('> ', '')}</blockquote>;

                // Tables (Simple detection)
                if (line.includes('|') && line.includes('-')) return null; // Skip separator lines for now
                if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
                    const cells = line.split('|').filter(c => c.trim() !== '');
                    return (
                        <div key={`${index}-${i}`} className="grid grid-cols-2 md:grid-cols-3 gap-4 border-b border-gray-200 dark:border-white/10 py-2 text-sm">
                            {cells.map((cell, cIdx) => <div key={cIdx} className="font-mono">{cell.trim()}</div>)}
                        </div>
                    )
                }

                // Images
                const imgMatch = line.match(/!\[(.*?)\]\((.*?)\)/);
                if (imgMatch) {
                    return (
                        <figure key={`${index}-${i}`} className="my-8">
                            <img src={imgMatch[2]} alt={imgMatch[1]} className="rounded-xl w-full object-cover shadow-lg border border-gray-200 dark:border-white/10" />
                            <figcaption className="text-center text-sm text-gray-500 mt-2 italic">{imgMatch[1]}</figcaption>
                        </figure>
                    );
                }

                if (line.trim() === '') return <br key={`${index}-${i}`} className="block h-2" />;
                
                // Bold text parser (simple)
                const boldParts = line.split(/(\*\*.*?\*\*)/g);
                return (
                    <p key={`${index}-${i}`} className="mb-3 leading-7">
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
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-8 overflow-hidden whitespace-nowrap">
            <Link to="/" className="hover:text-navy-900 dark:hover:text-white">Home</Link>
            <span>/</span>
            <Link to="/articles" className="hover:text-navy-900 dark:hover:text-white">KB</Link>
            <span>/</span>
            <span className="text-neon-dark dark:text-neon-green truncate">{article.title}</span>
          </div>

          {/* Header */}
          <div className="mb-8">
              <Badge text={article.category} color="bg-neon-green/10 text-neon-dark dark:text-neon-green mb-4" />
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-navy-900 dark:text-white animate-fade-in">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6 border-b border-gray-200 dark:border-white/10 pb-8">
                  <div className="flex items-center">
                      <User size={16} className="mr-2 text-neon-blue" /> {article.author}
                  </div>
                  <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-neon-blue" /> {article.publishedDate}
                  </div>
                  <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-neon-blue" /> {article.readTime} min read
                  </div>
              </div>

              {article.coverImage && (
                  <div className="rounded-2xl overflow-hidden shadow-2xl mb-8 border border-gray-200 dark:border-white/10 relative group animate-scale-in">
                      <img 
                        src={article.coverImage} 
                        alt={article.title} 
                        className="w-full max-h-[450px] object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"></div>
                  </div>
              )}

              <SocialShare title={article.title} />

              <div className="p-6 bg-blue-50 dark:bg-navy-800 rounded-xl border border-blue-100 dark:border-navy-700 mb-8 border-l-4 border-l-neon-blue">
                  <p className="text-lg text-navy-900 dark:text-gray-300 italic">
                      "{article.excerpt}"
                  </p>
              </div>
          </div>

          {/* Content */}
          <article className="mb-12 min-h-[500px]">
              {renderContent(article.content)}
          </article>

          {/* Footer of Article */}
          <div className="border-t border-gray-200 dark:border-white/10 pt-8 mt-12 mb-16">
              <h4 className="text-sm uppercase tracking-wider text-gray-500 mb-4">Tags</h4>
              <div className="flex flex-wrap gap-2 mb-8">
                  {article.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 text-sm border border-gray-200 dark:border-white/10 hover:border-neon-dark dark:hover:border-neon-green transition-colors cursor-default">
                          <Tag size={12} className="mr-2" /> {tag}
                      </span>
                  ))}
              </div>
              
              <Link to="/articles" className="inline-flex items-center px-6 py-3 bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 rounded-lg font-bold hover:opacity-90 transition-opacity btn-press">
                  <ChevronLeft size={20} className="mr-2" /> Back to Knowledge Base
              </Link>
          </div>

          {/* 9. Related Articles Block */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto pb-4 snap-x">
              {relatedArticles.map(rel => (
                <div key={rel.id} className="snap-start">
                  <RelatedArticleCard article={rel} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};