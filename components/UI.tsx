import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Download, Eye, Calendar, Clock, 
  Shield, Mail, Users, Smartphone, Lock, FileText, Terminal, BarChart,
  BookOpen, HelpCircle, AlertTriangle, Lightbulb, ArrowLeftRight, Target, Book,
  Fingerprint, Cloud, PlayCircle, Sparkles,
  Share2, Linkedin, Twitter, Link as LinkIcon
} from 'lucide-react';
import { Article, Script, Category } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAiSummary } from '../hooks/useAiSummary';

export const Button: React.FC<{
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  to?: string;
}> = ({ variant = 'primary', children, onClick, className = '', to }) => {
  const baseStyle = "btn-press inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold text-sm transition-all duration-300 will-change-transform";
  
  const variants = {
    primary: "bg-neon-green text-navy-900 hover:bg-neon-blue hover:text-white hover:shadow-lg hover:shadow-neon-green/30 dark:hover:shadow-[0_0_20px_rgba(94,247,166,0.4)]",
    secondary: "bg-neon-blue text-white hover:bg-navy-800 dark:hover:bg-white dark:hover:text-navy-900 hover:shadow-md",
    outline: "border border-neon-dark dark:border-neon-green text-neon-dark dark:text-neon-green hover:bg-neon-dark/5 dark:hover:bg-neon-green/10"
  };

  if (to) {
    return (
      <Link to={to} className={`${baseStyle} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Badge: React.FC<{ text: string; color?: string; style?: React.CSSProperties }> = ({ text, color, style }) => {
  const defaultColor = 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300';
  return (
    <span 
      className={`inline-block px-2 py-1 rounded text-xs font-medium uppercase tracking-wider ${color || defaultColor}`}
      style={style}
    >
      {text}
    </span>
  );
};

export const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const { summary, isAiGenerated } = useAiSummary(article.content, article.id, article.excerpt);

  return (
    <div className="glass-panel rounded-xl overflow-hidden border border-transparent hover:border-neon-dark/40 dark:hover:border-neon-green/40 transition-all duration-300 group flex flex-col h-full hover:scale-[1.02] will-change-transform shadow-lg hover:shadow-2xl hover:shadow-neon-green/10">
      {article.coverImage && (
        <div className="h-48 overflow-hidden relative">
          <img 
            src={article.coverImage} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent opacity-60"></div>
          <div className="absolute bottom-4 left-4">
            <Badge text={article.category} color="bg-black/60 text-white backdrop-blur-md border border-white/10" />
          </div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        {!article.coverImage && (
          <div className="flex justify-between items-start mb-4">
            <Badge text={article.category} color="bg-blue-50 dark:bg-neon-blue/10 text-neon-dark dark:text-neon-blue" />
          </div>
        )}
        <div className="mb-3">
           <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center">
            <Clock size={10} className="mr-1" /> {article.readTime} min read
          </span>
        </div>
        <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-3 group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors leading-tight">
          <Link to={`/kb/${article.slug}`}>
            <span className="bg-gradient-to-r from-neon-dark to-neon-dark dark:from-neon-green dark:to-neon-green bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500">
              {article.title}
            </span>
          </Link>
        </h3>
        
        {/* AI Summary Block */}
        <div className="relative mb-6 flex-grow">
          <div className={`pl-3 border-l-2 ${isAiGenerated ? 'border-neon-dark dark:border-neon-green' : 'border-gray-300 dark:border-white/20'} transition-colors duration-500`}>
            {isAiGenerated && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-neon-dark dark:text-neon-green mb-1 uppercase tracking-wider opacity-80">
                    <Sparkles size={10} /> AI Summary
                </div>
            )}
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
              {summary}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5 mt-auto">
          <span className="text-xs text-gray-500">{article.publishedDate}</span>
          <Link to={`/kb/${article.slug}`} className="text-neon-dark dark:text-neon-green text-sm font-bold flex items-center group-hover:translate-x-1 transition-transform">
            Read Guide <ArrowRight size={14} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const SpotlightCard: React.FC<{ 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  to: string;
}> = ({ title, description, icon, to }) => {
  return (
    <Link to={to} className="block group">
      <div className="glass-panel p-6 rounded-xl border border-transparent hover:border-neon-dark/50 dark:hover:border-neon-green/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-neon-green/10 h-full flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-neon-green/5 rounded-full blur-2xl group-hover:bg-neon-green/10 transition-colors"></div>
        
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 text-neon-dark dark:text-neon-green border border-gray-200 dark:border-white/10 group-hover:bg-neon-green group-hover:text-navy-900 transition-colors duration-300">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-1 group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const RelatedArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <Link to={`/kb/${article.slug}`} className="block group min-w-[260px] md:min-w-[300px]">
      <div className="glass-panel p-4 rounded-lg hover:border-neon-dark/30 dark:hover:border-neon-green/30 transition-all hover:bg-white/50 dark:hover:bg-white/5 h-full">
        <div className="text-xs text-gray-500 mb-2 flex items-center">
           <span className="w-1.5 h-1.5 rounded-full bg-neon-green mr-2"></span>
           {article.readTime} min read
        </div>
        <h4 className="font-bold text-sm text-navy-900 dark:text-white mb-2 line-clamp-2 group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors">
          {article.title}
        </h4>
        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
};

export const ScriptCard: React.FC<{ script: Script; onView: (s: Script) => void }> = ({ script, onView }) => {
  // Use description + code snippet for context
  const context = `${script.description}. Code snippet: ${script.code.substring(0, 300)}`;
  const { summary, isAiGenerated } = useAiSummary(context, script.id, script.description);

  const difficultyColor = {
    'Beginner': 'text-green-500',
    'Intermediate': 'text-yellow-500',
    'Advanced': 'text-red-500'
  };

  return (
    <div className="glass-panel rounded-xl overflow-hidden hover:border-neon-dark/30 dark:hover:border-neon-green/30 transition-all duration-300 group flex flex-col h-full hover:scale-[1.02] hover:shadow-xl">
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-gray-100 dark:bg-navy-800 p-3 rounded-lg border border-gray-200 dark:border-white/10 text-neon-dark dark:text-neon-green group-hover:text-white group-hover:bg-neon-dark dark:group-hover:bg-neon-green transition-colors shadow-inner">
            <Terminal size={18} />
          </div>
          <div className="text-right">
             <div className={`text-xs font-bold ${difficultyColor[script.difficulty || 'Intermediate']}`}>{script.difficulty}</div>
             <div className="text-xs text-gray-500">{script.lastUpdated}</div>
          </div>
        </div>
        <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2 line-clamp-1" title={script.title}>{script.title}</h3>
        
        {/* AI Summary for Script */}
        <div className="mb-4 flex-grow relative">
             {isAiGenerated && (
                <div className="flex items-center gap-1 text-[9px] font-bold text-neon-dark dark:text-neon-green mb-1 uppercase tracking-wider opacity-70">
                    <Sparkles size={9} /> AI Summary
                </div>
            )}
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {summary}
            </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
            <span className="text-xs text-gray-500 flex items-center">
                <Download size={12} className="mr-1" /> {script.downloads}
            </span>
            <button 
            onClick={() => onView(script)}
            className="text-sm font-bold text-neon-dark dark:text-neon-green hover:underline flex items-center group/btn"
            >
            Preview <PlayCircle size={14} className="ml-1 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
        </div>
      </div>
    </div>
  );
};

// Map icon names to Lucide components
const IconMap: Record<string, React.ElementType> = {
  'Envelope': Mail, // Exchange
  'Users': Users, // Teams
  'Device': Smartphone, // Intune
  'Identity': Fingerprint, // Entra
  'Shield': Shield, // Security
  'SharePoint': FileText, // SharePoint
  'Cloud': Cloud, // OneDrive
  'Transfer': ArrowLeftRight, // Migration
  'Lightbulb': Lightbulb, // Real-world
  'Strategy': Target, // Governance
  'Book': Book, // Fundamentals
  'Terminal': Terminal, // Automation
  'BarChart': BarChart, // Reporting
};

export const CategoryCard: React.FC<{ category: Category }> = ({ category }) => {
  const IconComponent = IconMap[category.iconName] || Terminal;

  return (
    <Link to={`/articles?category=${encodeURIComponent(category.name)}`} className="block h-full group">
      <div 
        className="h-full bg-white/50 dark:bg-navy-800/50 border border-gray-200 dark:border-white/5 rounded-xl p-6 transition-all duration-300 text-center shadow-sm dark:shadow-none flex flex-col items-center hover:bg-white dark:hover:bg-navy-800 hover:scale-[1.05]"
        style={{ borderColor: 'transparent' }}
      >
        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[var(--hover-color)] transition-colors pointer-events-none" style={{ '--hover-color': category.color } as React.CSSProperties}></div>

        <div 
            className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 group-hover:scale-110 transition-transform shadow-inner"
            style={{ backgroundColor: `${category.color}20`, color: category.color }}
        >
          <IconComponent className="w-6 h-6" />
        </div>
        <h3 className="text-navy-900 dark:text-white font-semibold mb-1">{category.name}</h3>
        <p className="text-xs text-gray-500">{category.count} Articles</p>
      </div>
    </Link>
  );
};

export const CodeBlock: React.FC<{ code: string; language?: string }> = ({ code, language = 'powershell' }) => (
  <div className="rounded-lg overflow-hidden border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-[#0d1117] my-6 text-sm shadow-xl">
    <div className="flex items-center justify-between px-4 py-2 bg-gray-200 dark:bg-white/5 border-b border-gray-300 dark:border-white/5">
      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{language}</span>
      <div className="flex space-x-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
      </div>
    </div>
    <div className="code-container font-mono">
      <SyntaxHighlighter 
        language={language.toLowerCase()} 
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1.5rem',
          backgroundColor: 'transparent',
          fontSize: '0.875rem',
          lineHeight: '1.6',
        }}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  </div>
);

export const SocialShare: React.FC<{ title: string; url?: string }> = ({ title, url }) => {
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);

    const shareLinks = [
        { name: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
        { name: 'Twitter', icon: Twitter, href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
        { name: 'Email', icon: Mail, href: `mailto:?subject=${encodedTitle}&body=Check this out: ${encodedUrl}` },
    ];

    const copyToClipboard = () => {
        navigator.clipboard.writeText(currentUrl);
        // Could add toast notification here
    };

    return (
        <div className="flex items-center gap-2 my-6 animate-fade-in">
            <span className="text-xs font-bold text-gray-500 uppercase mr-2 tracking-wider">Share:</span>
            {shareLinks.map((link) => (
                <a 
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-neon-dark dark:hover:bg-neon-green hover:text-white dark:hover:text-navy-900 transition-colors"
                    title={`Share on ${link.name}`}
                >
                    <link.icon size={16} />
                </a>
            ))}
            <a 
                href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-[#ff4500] hover:text-white transition-colors"
                title="Share on Reddit"
            >
                <span className="text-xs font-bold px-0.5">Rd</span>
            </a>
            <button 
                onClick={copyToClipboard}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-neon-dark dark:hover:bg-neon-green hover:text-white dark:hover:text-navy-900 transition-colors"
                title="Copy Link"
            >
                <LinkIcon size={16} />
            </button>
        </div>
    );
};