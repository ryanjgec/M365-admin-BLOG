
import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, BookOpen, AlertTriangle, ChevronRight, FileText, Wrench } from 'lucide-react';
import { Button, ArticleCard, ScriptCard, CategoryCard, SpotlightCard, AnimatedTerminal } from '../components/UI';
import { ARTICLES, SCRIPTS, CATEGORIES } from '../data';
import { Script } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/Layout';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  // Get latest 4 articles - Ensure we have dates to sort by, fallback to ID if needed
  const recentArticles = [...ARTICLES]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .slice(0, 4);
    
  // Get top 4 scripts by downloads
  const topScripts = [...SCRIPTS].sort((a, b) => b.downloads - a.downloads).slice(0, 4);

  const handleViewScript = (script: Script) => {
    navigate('/scripts');
  };

  // Rotating Tagline Logic
  const taglines = [
    "Deep-dive tutorials for real admins",
    "PowerShell automation, troubleshooting runbooks",
    "Exchange, Teams, Intune, Entra & Security in one place"
  ];
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [isTaglineVisible, setIsTaglineVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setIsTaglineVisible(false);
      setTimeout(() => {
        setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
        setIsTaglineVisible(true);
      }, 700); // Wait for fade out
    }, 5000); // Rotate every 5s

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="space-y-20">
      <SEO 
        title="MicrosoftAdmin.in | M365 Knowledge Base & Scripts" 
        description="The ultimate resource for Microsoft 365 administrators. Guides, PowerShell scripts, troubleshooting, and best practices for Exchange, Teams, Intune, and Entra ID."
      />
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-4 lg:pt-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-3/5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
              <span className="text-neon-dark dark:text-neon-green text-xs font-bold tracking-wide">ENTERPRISE ADMIN RESOURCE</span>
            </div>
            
            <div>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-navy-900 dark:text-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Master Microsoft 365 <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-dark to-neon-blue dark:from-neon-green dark:to-neon-blue">Administration</span>
                </h1>
                
                <p 
                    className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed transition-opacity duration-700" 
                    style={{ opacity: isTaglineVisible ? 1 : 0, willChange: 'opacity' }}
                >
                    {taglines[currentTaglineIndex]}
                </p>
            </div>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button to="/knowledge-base">Browse Knowledge Base</Button>
              <Button variant="outline" to="/scripts">Get PowerShell Scripts</Button>
            </div>
          </div>

          <div className="lg:w-2/5 w-full relative animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg blur opacity-20"></div>
            <AnimatedTerminal />
          </div>
        </div>
      </section>

      {/* Spotlight Cards */}
      <section className="container mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard 
            title="Knowledge Base"
            description="Deep-dive tutorials and architecture guides."
            icon={<BookOpen size={24} />}
            to="/knowledge-base"
          />
          <SpotlightCard 
            title="PowerShell Scripts"
            description="Copy-paste ready automation tools."
            icon={<Terminal size={24} />}
            to="/scripts"
          />
          <SpotlightCard 
            title="Troubleshooting Hub"
            description="Error codes, diagnostics, and quick fixes."
            icon={<AlertTriangle size={24} />}
            to="/troubleshooting"
          />
        </div>
      </section>

      {/* 3 Concise Homepage Sections */}
      
      {/* 1. Latest from the Knowledge Base */}
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <FileText className="text-neon-blue" size={24} /> Latest from the Knowledge Base
            </h2>
            <Link to="/knowledge-base" className="text-sm font-bold text-neon-dark dark:text-neon-green hover:underline flex items-center">
                View All <ChevronRight size={16} />
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArticles.map(article => (
                <Link key={article.id} to={`/kb/${article.slug}`} className="group block">
                    <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-lg p-5 h-full hover:border-neon-blue transition-all shadow-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2 block">{article.category}</span>
                        <h3 className="font-bold text-navy-900 dark:text-white text-base mb-2 group-hover:text-neon-blue transition-colors line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{article.excerpt}</p>
                    </div>
                </Link>
            ))}
        </div>
      </section>

      {/* 2. Popular Troubleshooting Playbooks */}
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <Wrench className="text-orange-400" size={24} /> Popular Troubleshooting Playbooks
            </h2>
            <Link to="/troubleshooting" className="text-sm font-bold text-neon-dark dark:text-neon-green hover:underline flex items-center">
                Visit Hub <ChevronRight size={16} />
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
                { title: "Sign-In & Authentication Failures", desc: "CA blocking, MFA loops, and error AADSTS50020.", link: "troubleshoot-conditional-access-blocking" },
                { title: "Exchange Mail Flow Delivery", desc: "Troubleshoot NDRs, delayed mail, and quarantine.", link: "exchange-message-trace-guide" },
                { title: "OneDrive Sync Issues", desc: "Fix stuck processing, red X errors, and auth loops.", link: "onedrive-sync-issues" },
            ].map((item, i) => (
                <Link key={i} to={`/kb/${item.link}`} className="group block">
                    <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-lg p-5 h-full hover:border-orange-400 transition-all shadow-sm flex items-start gap-4">
                        <div className="bg-orange-400/10 text-orange-400 p-2 rounded-md">
                            <AlertTriangle size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-navy-900 dark:text-white text-base mb-1 group-hover:text-orange-400 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{item.desc}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      </section>

      {/* 3. Most-used PowerShell Scripts */}
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white flex items-center gap-2">
                <Terminal className="text-neon-green" size={24} /> Most-used PowerShell Scripts
            </h2>
            <Link to="/scripts" className="text-sm font-bold text-neon-dark dark:text-neon-green hover:underline flex items-center">
                Script Library <ChevronRight size={16} />
            </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topScripts.map(script => (
                <div key={script.id} onClick={() => handleViewScript(script)} className="cursor-pointer group">
                    <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-lg p-5 h-full hover:border-neon-green transition-all shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-[10px] bg-gray-100 dark:bg-white/5 px-2 py-1 rounded text-gray-500">{script.language}</span>
                            <span className="text-[10px] text-gray-400">{script.downloads} DLs</span>
                        </div>
                        <h3 className="font-bold text-navy-900 dark:text-white text-sm mb-2 group-hover:text-neon-green transition-colors line-clamp-1">
                            {script.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{script.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-navy-900 dark:text-white">Browse Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

    </div>
  );
};
