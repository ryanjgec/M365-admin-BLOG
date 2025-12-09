import React from 'react';
import { ArrowRight, Terminal, BookOpen, AlertTriangle } from 'lucide-react';
import { Button, ArticleCard, ScriptCard, CategoryCard, SpotlightCard } from '../components/UI';
import { ARTICLES, SCRIPTS, CATEGORIES } from '../data';
import { Script } from '../types';
import { useNavigate, Link } from 'react-router-dom';
import { SEO } from '../components/Layout';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  // Get latest 3 articles
  const recentArticles = [...ARTICLES].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()).slice(0, 3);
  const featuredScripts = SCRIPTS.slice(0, 3);

  const handleViewScript = (script: Script) => {
    navigate('/scripts');
  };

  return (
    <div className="space-y-20">
      <SEO 
        title="MicrosoftAdmin.in | M365 Knowledge Base & Scripts" 
        description="The ultimate resource for Microsoft 365 administrators. Guides, PowerShell scripts, troubleshooting, and best practices for Exchange, Teams, Intune, and Entra ID."
      />
      {/* Hero Section - Reduced padding */}
      <section className="container mx-auto px-6 pt-4 lg:pt-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-3/5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
              <span className="text-neon-dark dark:text-neon-green text-xs font-bold tracking-wide">ENTERPRISE ADMIN RESOURCE</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-navy-900 dark:text-white animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Master Microsoft 365 <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-dark to-neon-blue dark:from-neon-green dark:to-neon-blue">Administration</span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              The professional knowledge base for Entra ID, Exchange, Teams, and Intune. 
              Enterprise-grade tutorials, PowerShell automation, and troubleshooting guides.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button to="/articles">Browse Knowledge Base</Button>
              <Button variant="outline" to="/scripts">Get PowerShell Scripts</Button>
            </div>
          </div>

          <div className="lg:w-2/5 w-full relative animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg blur opacity-20"></div>
            <div className="relative bg-gray-900 dark:bg-[#0d1117] border border-white/10 rounded-lg p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-4">
                <Terminal className="text-neon-green w-5 h-5" />
                <span className="text-sm text-gray-400 font-mono">Administrator: Windows PowerShell</span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <p className="text-gray-400">PS C:\Admin> </p>
                <p>
                  <span className="text-blue-400">Connect-MgGraph</span> <span className="text-gray-300">-Scopes</span> <span className="text-orange-300">"User.Read.All"</span>
                </p>
                <p className="text-green-400">Welcome to Microsoft Graph!</p>
                <p className="text-gray-400">PS C:\Admin> </p>
                <p>
                  <span className="text-blue-400">Get-MgUser</span> <span className="text-gray-300">-Filter</span> <span className="text-orange-300">"AccountEnabled eq true"</span>
                </p>
                <div className="animate-pulse bg-neon-green h-4 w-2 inline-block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1B. Spotlight Cards */}
      <section className="container mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SpotlightCard 
            title="Knowledge Base"
            description="Deep-dive tutorials and architecture guides."
            icon={<BookOpen size={24} />}
            to="/articles"
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

      {/* Categories Grid */}
      <section className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8 text-navy-900 dark:text-white">Browse Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {CATEGORIES.map(cat => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Recent Articles */}
      <section className="bg-gray-100/50 dark:bg-navy-800/30 py-20 border-y border-black/5 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-navy-900 dark:text-white">Latest Guides</h2>
              <p className="text-gray-600 dark:text-gray-400">Fresh from the admin console.</p>
            </div>
            <Link to="/articles" className="text-neon-dark dark:text-neon-green hover:text-navy-900 dark:hover:text-white flex items-center text-sm font-bold nav-link">
              View All <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Scripts */}
      <section className="container mx-auto px-6 pb-20">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-navy-900 dark:text-white">Popular Scripts</h2>
          <Button variant="secondary" to="/scripts">Script Library</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredScripts.map(script => (
            <ScriptCard key={script.id} script={script} onView={handleViewScript} />
          ))}
        </div>
      </section>
    </div>
  );
};