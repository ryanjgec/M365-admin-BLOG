import React from 'react';
import { NEWS_ITEMS } from '../data';
import { ExternalLink, RefreshCw } from 'lucide-react';

export const News: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
       <div className="flex justify-between items-end mb-12">
        <div>
           <h1 className="text-4xl font-bold mb-4 text-navy-900 dark:text-white">M365 News Feed</h1>
           <p className="text-gray-600 dark:text-gray-400">Latest updates from the official Microsoft 365 blogs.</p>
        </div>
        <button className="flex items-center text-sm text-neon-dark dark:text-neon-green hover:text-navy-900 dark:hover:text-white transition-colors">
            <RefreshCw size={14} className="mr-2" /> Refresh Feed
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-4xl">
        {NEWS_ITEMS.map(item => (
          <div key={item.id} className="glass-panel p-6 rounded-xl hover:border-neon-blue/30 transition-all group relative overflow-hidden">
            {item.important && (
                <div className="absolute top-0 right-0 bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 text-[10px] font-bold px-2 py-1 uppercase rounded-bl-lg">
                    Important
                </div>
            )}
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-neon-blue">{item.source}</span>
                <span className="text-xs text-gray-500">{item.date}</span>
            </div>
            <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-neon-blue transition-colors">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{item.excerpt}</p>
            <a href={item.url} className="inline-flex items-center text-sm font-medium text-navy-900 dark:text-white hover:text-neon-dark dark:hover:text-neon-green">
                Read on Microsoft.com <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
