
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Mail, 
  WifiOff, 
  Smartphone, 
  Cloud, 
  Lock, 
  Search, 
  Server, 
  ChevronRight,
  ArrowRight,
  Monitor,
  HelpCircle,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TROUBLESHOOTING_DATA, ARTICLES } from '../data';
import { SEO } from '../components/Layout';

export const Troubleshooting: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 130; // Increased offset to account for sticky mobile header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const getIcon = (id: string) => {
    switch(id) {
        case 'auth': return <ShieldAlert className="w-6 h-6 text-red-500" />;
        case 'exchange': return <Mail className="w-6 h-6 text-blue-400" />;
        case 'teams': return <WifiOff className="w-6 h-6 text-purple-500" />;
        case 'intune': return <Smartphone className="w-6 h-6 text-orange-400" />;
        case 'onedrive': return <Cloud className="w-6 h-6 text-sky-400" />;
        case 'sharepoint': return <Lock className="w-6 h-6 text-yellow-500" />;
        case 'outlook': return <Monitor className="w-6 h-6 text-indigo-400" />;
        default: return <Server className="w-6 h-6 text-gray-400" />;
    }
  };

  const getArticleDetails = (slug: string) => {
    return ARTICLES.find(a => a.slug === slug);
  };

  const filteredSections = TROUBLESHOOTING_DATA.map(section => {
      if (!searchTerm) return section;
      const matchingIssues = section.issues.filter(issue => 
          issue.question.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchingIssues.length > 0) {
          return { ...section, issues: matchingIssues };
      }
      return null;
  }).filter(Boolean);

  return (
    <div className="container mx-auto px-6">
      <SEO 
        title="Microsoft 365 Troubleshooting Hub" 
        description="Diagnose and fix common M365 issues. Error codes, authentication loops, and mail flow troubleshooting."
        keywords={["M365 Troubleshooting", "Error Codes", "Sign-in issues", "Exchange Errors"]}
      />

      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-red-500/10 rounded-xl mb-6">
            <ShieldAlert size={32} className="text-red-500" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-navy-900 dark:text-white tracking-tight">Troubleshooting Hub</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Search our library of common symptoms and error codes to find immediate solutions and playbooks.
        </p>
        
        <div className="relative max-w-xl mx-auto group">
            <div className="absolute inset-0 bg-neon-green/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-neon-dark dark:group-focus-within:text-neon-green transition-colors" />
            <input 
              type="text" 
              placeholder="Search by symptom or error (e.g. 5.1.1, 50020)..." 
              className="relative w-full bg-white dark:bg-navy-900 border border-gray-200 dark:border-white/10 rounded-full pl-14 pr-6 py-4 text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-neon-dark dark:focus:border-neon-green focus:ring-4 focus:ring-neon-green/10 shadow-xl transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 relative items-start">
        {/* Sidebar Navigation - Desktop */}
        <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28 self-start animate-fade-in">
            <div className="bg-white/50 dark:bg-navy-800/50 backdrop-blur-xl p-5 rounded-2xl border border-gray-200 dark:border-white/5 shadow-lg">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2 flex items-center gap-2">
                    <Server size={12} /> Topics
                </h3>
                <nav className="space-y-1">
                    {TROUBLESHOOTING_DATA.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left px-4 py-3 text-sm font-medium rounded-xl text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 hover:text-neon-dark dark:hover:text-neon-green hover:shadow-md transition-all flex items-center justify-between group"
                    >
                        <span>{section.title}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </button>
                    ))}
                </nav>
            </div>
            
            <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-neon-green/10 to-neon-blue/10 border border-neon-green/20">
                <h4 className="font-bold text-navy-900 dark:text-white mb-2 text-sm">Need AI Assistance?</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                    Can't find your error? Ask our AI assistant for real-time debugging help.
                </p>
                <div className="text-xs font-bold text-neon-dark dark:text-neon-green flex items-center">
                    Look for the chat icon <ArrowRight size={12} className="ml-1" />
                </div>
            </div>
        </aside>

        {/* Mobile Quick Jump - Sticky */}
        <div className="lg:hidden flex overflow-x-auto gap-3 pb-2 w-full snap-x no-scrollbar sticky top-20 z-40 py-2 bg-gray-50/90 dark:bg-navy-900/90 backdrop-blur-md">
             {TROUBLESHOOTING_DATA.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex-shrink-0 px-5 py-2.5 bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 rounded-full text-sm font-medium text-navy-900 dark:text-white whitespace-nowrap snap-start shadow-sm"
                >
                    {section.title}
                </button>
             ))}
        </div>

        {/* Main Content Area */}
        <div className="flex-grow w-full space-y-10 mb-20">
            {filteredSections.length > 0 ? (
                filteredSections.map((section: any) => (
                    <div 
                        key={section.id} 
                        id={section.id}
                        className="scroll-mt-32 animate-fade-in"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white dark:bg-navy-800 rounded-xl border border-gray-200 dark:border-white/10 shadow-md">
                                {getIcon(section.id)}
                            </div>
                            <h2 className="text-2xl font-bold text-navy-900 dark:text-white">{section.title}</h2>
                        </div>
                        
                        <div className="grid gap-4">
                            {section.issues.map((issue: any) => {
                                const article = getArticleDetails(issue.articleSlug);
                                return (
                                    <Link 
                                        key={issue.id}
                                        to={`/kb/${issue.articleSlug}`}
                                        state={{ from: 'troubleshooting' }}
                                        className="group relative bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/5 rounded-xl p-5 md:p-6 hover:border-neon-dark dark:hover:border-neon-green hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-4 md:items-start"
                                    >
                                        <div className="mt-1 flex-shrink-0 hidden md:block">
                                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 group-hover:bg-neon-dark group-hover:text-white dark:group-hover:bg-neon-green dark:group-hover:text-navy-900 transition-colors">
                                                <HelpCircle size={16} />
                                            </div>
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <div className="flex items-start justify-between gap-4">
                                                <h3 className="font-bold text-lg text-navy-900 dark:text-white group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors mb-2">
                                                    {issue.question}
                                                </h3>
                                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-neon-dark dark:group-hover:text-neon-green opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 flex-shrink-0" />
                                            </div>
                                            
                                            {article ? (
                                                <div className="bg-gray-50 dark:bg-black/20 rounded-lg p-3 md:p-4 border border-gray-100 dark:border-white/5 group-hover:bg-blue-50 dark:group-hover:bg-neon-green/5 transition-colors">
                                                    <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                                                        <FileText size={10} /> Recommended Guide
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                                                        {article.excerpt}
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-red-500 italic mt-2 border-l-2 border-red-500 pl-2">
                                                    Linked article not found. Please check KB.
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-20 bg-white/50 dark:bg-navy-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-white/10">
                    <ShieldAlert size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500 text-lg mb-2">No topics found matching "{searchTerm}"</p>
                    <p className="text-sm text-gray-400">Try searching for error codes like "50020" or "5.7.1"</p>
                    <button 
                        onClick={() => setSearchTerm('')} 
                        className="mt-6 px-6 py-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-full text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/20 transition-colors"
                    >
                        Clear Search
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
