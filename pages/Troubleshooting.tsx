
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Mail, 
  WifiOff, 
  Smartphone, 
  Cloud, 
  Lock, 
  CreditCard, 
  Search, 
  Server, 
  ChevronRight,
  ArrowRight,
  Monitor
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TROUBLESHOOTING_DATA } from '../data';
import { SEO } from '../components/Layout';

export const Troubleshooting: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const generateId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const getIcon = (id: string) => {
    switch(id) {
        case 'auth': return <ShieldAlert className="w-5 h-5 text-red-500" />;
        case 'exchange': return <Mail className="w-5 h-5 text-blue-400" />;
        case 'teams': return <WifiOff className="w-5 h-5 text-purple-500" />;
        case 'intune': return <Smartphone className="w-5 h-5 text-orange-400" />;
        case 'onedrive': return <Cloud className="w-5 h-5 text-sky-400" />;
        case 'sharepoint': return <Lock className="w-5 h-5 text-yellow-500" />;
        case 'outlook': return <Monitor className="w-5 h-5 text-indigo-400" />;
        default: return <Server className="w-5 h-5 text-gray-400" />;
    }
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

      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-bold mb-4 text-navy-900 dark:text-white">Troubleshooting Hub</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
            Identify your issue below and jump directly to the solution guide.
        </p>
        
        <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by symptom or error code (e.g. 5.1.1, 50020)..." 
              className="w-full bg-white dark:bg-navy-900/50 border border-gray-200 dark:border-white/10 rounded-full pl-12 pr-6 py-4 text-navy-900 dark:text-white focus:outline-none focus:border-neon-green/50 shadow-lg transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative items-start">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-28 self-start">
            <div className="glass-panel p-4 rounded-xl border border-gray-200 dark:border-white/10">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-2">Troubleshooting Topics</h3>
                <nav className="space-y-1">
                    {TROUBLESHOOTING_DATA.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="w-full text-left px-3 py-2 text-sm rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-neon-dark dark:hover:text-neon-green transition-colors flex items-center justify-between group"
                    >
                        <span>{section.title}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    ))}
                </nav>
            </div>
        </aside>

        {/* Mobile Quick Jump */}
        <div className="lg:hidden flex overflow-x-auto gap-2 pb-4 w-full snap-x">
             {TROUBLESHOOTING_DATA.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="flex-shrink-0 px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm text-navy-900 dark:text-white whitespace-nowrap snap-start"
                >
                    {section.title}
                </button>
             ))}
        </div>

        {/* Main Content */}
        <div className="flex-grow w-full space-y-8 mb-20">
            {filteredSections.length > 0 ? (
                filteredSections.map((section: any) => (
                    <div 
                        key={section.id} 
                        id={section.id}
                        className="glass-panel rounded-xl overflow-hidden scroll-mt-28 border border-gray-200 dark:border-white/5"
                    >
                        <div className="p-4 md:p-6 border-b border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex items-center">
                            <div className="p-2 bg-white dark:bg-navy-900 rounded-lg border border-gray-200 dark:border-white/10 mr-3 shadow-sm">
                                {getIcon(section.id)}
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 dark:text-white">{section.title}</h3>
                        </div>
                        
                        <div className="p-4 md:p-6">
                            <ul className="grid gap-3">
                                {section.issues.map((issue: any) => (
                                    <li key={issue.id}>
                                        <Link 
                                            to={`/kb/${issue.articleSlug}`}
                                            className="group flex items-start md:items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/5"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1 md:mt-0 w-1.5 h-1.5 rounded-full bg-neon-dark dark:bg-neon-green flex-shrink-0"></div>
                                                <span className="text-sm md:text-base font-medium text-navy-900 dark:text-gray-200 group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors">
                                                    {issue.question}
                                                </span>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-neon-dark dark:group-hover:text-neon-green opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No troubleshooting topics found for "{searchTerm}".</p>
                    <button onClick={() => setSearchTerm('')} className="text-neon-dark dark:text-neon-green hover:underline mt-2">Clear search</button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
