import React, { useState } from 'react';
import { Search, X, Copy, Download, Check, Maximize2 } from 'lucide-react';
import { SCRIPTS } from '../data';
import { Script } from '../types';
import { ScriptCard, CodeBlock, Button } from '../components/UI';
import { SEO } from '../components/Layout';

export const Scripts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [copied, setCopied] = useState(false);

  const filteredScripts = SCRIPTS.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = () => {
    if (selectedScript) {
      navigator.clipboard.writeText(selectedScript.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="container mx-auto px-6">
      <SEO 
        title="PowerShell Scripts for M365 Admins | MicrosoftAdmin.in" 
        description="Library of PowerShell scripts for automating Exchange, Teams, Entra ID, and Intune tasks. Copy-paste ready." 
        keywords={["PowerShell", "Scripts", "Automation", "M365", "Azure AD"]}
      />

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-navy-900 dark:text-white">PowerShell Library</h1>
        <p className="text-gray-600 dark:text-gray-400">Ready-to-use scripts for automating Entra ID, Exchange, and Teams tasks.</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Search scripts..." 
          className="w-full md:w-1/2 bg-white dark:bg-navy-900/50 border border-gray-200 dark:border-white/10 rounded-lg pl-10 pr-4 py-3 text-navy-900 dark:text-white focus:outline-none focus:border-neon-green/50 transition-colors shadow-inner"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredScripts.map(script => (
          <ScriptCard key={script.id} script={script} onView={setSelectedScript} />
        ))}
      </div>

      {/* Fullscreen Script Modal */}
      {selectedScript && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy-900/95 backdrop-blur-md" onClick={() => setSelectedScript(null)}></div>
          
          {/* Modal Content */}
          <div className="relative bg-white/95 dark:bg-[#0d1117]/95 border border-gray-200 dark:border-white/10 rounded-2xl w-full h-full max-w-6xl overflow-hidden shadow-2xl flex flex-col animate-scale-in">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-neon-dark/10 dark:bg-neon-green/10 rounded-lg text-neon-dark dark:text-neon-green">
                        <Maximize2 size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-navy-900 dark:text-white leading-none mb-1">{selectedScript.title}</h3>
                        <p className="text-xs md:text-sm text-gray-500">{selectedScript.category} • {selectedScript.downloads} downloads</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleCopy}
                        className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                            copied 
                            ? 'bg-green-500/20 text-green-500 border border-green-500/50' 
                            : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-neon-dark dark:hover:border-neon-green text-navy-900 dark:text-white'
                        }`}
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'Copied' : 'Copy Script'}
                    </button>
                    <button 
                        onClick={() => setSelectedScript(null)} 
                        className="p-2 hover:bg-red-500/10 hover:text-red-500 text-gray-500 transition-colors rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gray-50 dark:bg-transparent">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
                
                {/* Left Col: Description & Metadata */}
                <div className="lg:col-span-1 space-y-8">
                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Description</h4>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{selectedScript.description}</p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Prerequisites</h4>
                        <ul className="space-y-2">
                            {selectedScript.prerequisites.map((req, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-400 bg-white dark:bg-white/5 p-2 rounded border border-gray-200 dark:border-white/5">
                                    <span className="w-1.5 h-1.5 bg-neon-dark dark:bg-neon-green rounded-full mr-2"></span>
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-500/30 rounded-lg">
                        <h4 className="text-blue-700 dark:text-blue-300 font-bold text-sm mb-1">Safety First</h4>
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                            Always test scripts in a non-production environment first. Review code comments for parameter requirements.
                        </p>
                    </div>
                    
                    {/* Mobile Copy Button */}
                    <div className="md:hidden">
                        <Button className="w-full" onClick={handleCopy}>
                            {copied ? 'Copied to Clipboard' : 'Copy Script'}
                        </Button>
                    </div>
                </div>

                {/* Right Col: Code Viewer */}
                <div className="lg:col-span-2 h-full flex flex-col">
                    <div className="flex-1 rounded-xl overflow-hidden border border-gray-300 dark:border-white/10 shadow-inner bg-[#1e1e1e]">
                        <CodeBlock code={selectedScript.code} />
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};