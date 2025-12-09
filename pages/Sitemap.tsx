import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, Terminal, AlertTriangle, Info, Rss, Shield, LayoutGrid, Users } from 'lucide-react';
import { CATEGORIES } from '../data';

export const Sitemap: React.FC = () => {
  return (
    <div className="container mx-auto px-6 mb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-navy-900 dark:text-white">Site Map</h1>
        <p className="text-gray-600 dark:text-gray-400">Navigate the entire structure of MicrosoftAdmin.in</p>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Central Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-dark/0 via-neon-dark/30 to-neon-dark/0 dark:from-neon-green/0 dark:via-neon-green/30 dark:to-neon-green/0 hidden md:block"></div>

        {/* Root Node */}
        <div className="flex justify-center mb-16 relative z-10">
          <Link to="/" className="flex flex-col items-center group">
            <div className="w-20 h-20 bg-white dark:bg-navy-900 border-2 border-neon-dark dark:border-neon-green rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(94,247,166,0.2)] group-hover:scale-110 transition-transform duration-300">
              <Home className="w-8 h-8 text-neon-dark dark:text-neon-green" />
            </div>
            <span className="mt-4 font-bold text-lg text-navy-900 dark:text-white px-4 py-1 rounded-full bg-gray-100 dark:bg-white/5">Home</span>
          </Link>
        </div>

        {/* Level 1: Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 relative z-10">
          
          {/* Left Branch - Resources */}
          <div className="text-right md:pr-12 relative">
             {/* Connector Line Right */}
             <div className="hidden md:block absolute top-6 right-0 w-12 h-px bg-neon-dark/30 dark:bg-neon-green/30"></div>
             
             <div className="inline-block">
                <Link to="/articles" className="inline-flex items-center justify-end gap-4 group mb-6">
                    <span className="font-bold text-xl text-navy-900 dark:text-white group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors">Knowledge Base</span>
                    <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center group-hover:border-neon-dark dark:group-hover:border-neon-green transition-colors">
                        <FileText className="w-5 h-5 text-gray-500 group-hover:text-neon-dark dark:group-hover:text-neon-green" />
                    </div>
                </Link>
                {/* Sub-list for KB */}
                <div className="mr-6 border-r border-gray-200 dark:border-white/10 pr-6 space-y-3">
                    {CATEGORIES.slice(0, 5).map(cat => (
                        <Link key={cat.id} to={`/articles?category=${cat.name}`} className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green hover:translate-x-[-4px] transition-all">
                            {cat.name}
                        </Link>
                    ))}
                    <Link to="/articles" className="block text-sm font-bold text-neon-dark dark:text-neon-green mt-2">View All Categories →</Link>
                </div>
             </div>
          </div>

          {/* Right Branch - Tools */}
          <div className="text-left md:pl-12 relative">
             {/* Connector Line Left */}
             <div className="hidden md:block absolute top-6 left-0 w-12 h-px bg-neon-dark/30 dark:bg-neon-green/30"></div>

             <div className="inline-block">
                <Link to="/scripts" className="inline-flex flex-row-reverse md:flex-row items-center justify-start gap-4 group mb-6">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center group-hover:border-neon-dark dark:group-hover:border-neon-green transition-colors">
                        <Terminal className="w-5 h-5 text-gray-500 group-hover:text-neon-dark dark:group-hover:text-neon-green" />
                    </div>
                    <span className="font-bold text-xl text-navy-900 dark:text-white group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors">Script Library</span>
                </Link>
                 <div className="ml-0 md:ml-6 border-l border-gray-200 dark:border-white/10 pl-6 space-y-3">
                    <Link to="/scripts" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors">Entra ID Scripts</Link>
                    <Link to="/scripts" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors">Exchange Management</Link>
                    <Link to="/scripts" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors">Teams Automation</Link>
                    <Link to="/scripts" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors">Report Generators</Link>
                 </div>
             </div>
          </div>

          {/* Left Branch - Support */}
          <div className="text-right md:pr-12 relative mt-8">
             {/* Connector Line Right */}
             <div className="hidden md:block absolute top-6 right-0 w-12 h-px bg-neon-dark/30 dark:bg-neon-green/30"></div>
             
             <div className="inline-block">
                <Link to="/troubleshooting" className="inline-flex items-center justify-end gap-4 group mb-6">
                    <span className="font-bold text-xl text-navy-900 dark:text-white group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors">Troubleshooting</span>
                    <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center group-hover:border-neon-dark dark:group-hover:border-neon-green transition-colors">
                        <AlertTriangle className="w-5 h-5 text-gray-500 group-hover:text-neon-dark dark:group-hover:text-neon-green" />
                    </div>
                </Link>
                 <div className="mr-6 border-r border-gray-200 dark:border-white/10 pr-6 space-y-3">
                    <Link to="/troubleshooting" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green hover:translate-x-[-4px] transition-all">Common Error Codes</Link>
                    <Link to="/troubleshooting" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green hover:translate-x-[-4px] transition-all">Sign-in Diagnostic</Link>
                    <Link to="/troubleshooting" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green hover:translate-x-[-4px] transition-all">Mail Flow Issues</Link>
                 </div>
             </div>
          </div>

          {/* Right Branch - Info */}
          <div className="text-left md:pl-12 relative mt-8">
             {/* Connector Line Left */}
             <div className="hidden md:block absolute top-6 left-0 w-12 h-px bg-neon-dark/30 dark:bg-neon-green/30"></div>

             <div className="inline-block">
                <Link to="/about" className="inline-flex flex-row-reverse md:flex-row items-center justify-start gap-4 group mb-6">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center group-hover:border-neon-dark dark:group-hover:border-neon-green transition-colors">
                        <Info className="w-5 h-5 text-gray-500 group-hover:text-neon-dark dark:group-hover:text-neon-green" />
                    </div>
                    <span className="font-bold text-xl text-navy-900 dark:text-white group-hover:text-neon-dark dark:group-hover:text-neon-green transition-colors">Company</span>
                </Link>
                 <div className="ml-0 md:ml-6 border-l border-gray-200 dark:border-white/10 pl-6 space-y-3">
                    <Link to="/about" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors">About Author</Link>
                    <Link to="/news" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors">News Feed</Link>
                    <Link to="/admin" className="block text-sm text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors">Admin Login</Link>
                 </div>
             </div>
          </div>

        </div>

        {/* Footer Nodes */}
        <div className="flex justify-center mt-16 gap-8 relative z-10">
            <Link to="/privacy" className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs text-gray-500 hover:text-navy-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-xs text-gray-500 hover:text-navy-900 dark:hover:text-white transition-colors">Terms of Service</Link>
        </div>

      </div>
    </div>
  );
};