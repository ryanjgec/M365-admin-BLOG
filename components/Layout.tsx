
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, ArrowUp, ExternalLink, ChevronDown } from 'lucide-react';
import { ChatBot } from './ChatBot';
import { CATEGORIES } from '../data';

export const Header: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isTopicsOpen, setIsTopicsOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTopicsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setIsTopicsOpen(false);
    setIsMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Knowledge Base', path: '/articles' },
    { name: 'Scripts', path: '/scripts' },
    { name: 'Troubleshooting', path: '/troubleshooting' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass-panel border-b border-black/5 dark:border-white/5 py-3 shadow-lg' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-navy-900 dark:text-white group">
          Microsoft<span className="text-neon-dark dark:text-neon-green group-hover:text-neon-blue transition-colors">Admin</span>.in
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          
          {/* Topics Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsTopicsOpen(!isTopicsOpen)}
              className={`nav-link text-sm font-medium transition-colors flex items-center gap-1 ${
                isTopicsOpen ? 'text-neon-dark dark:text-neon-green' : 'text-gray-600 dark:text-gray-300 hover:text-neon-dark dark:hover:text-neon-green'
              }`}
            >
              Topics <ChevronDown size={14} className={`transition-transform duration-200 ${isTopicsOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isTopicsOpen && (
              <div className="absolute top-full left-0 mt-4 w-64 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl p-2 animate-fade-in flex flex-col gap-1 z-50">
                {CATEGORIES.slice(0, 8).map((cat) => (
                  <Link 
                    key={cat.id} 
                    to={`/articles?category=${encodeURIComponent(cat.name)}`}
                    className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-neon-green/10 hover:text-neon-dark dark:hover:text-neon-green rounded-lg transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link text-sm font-medium transition-colors hover:text-neon-dark dark:hover:text-neon-green ${
                location.pathname === link.path ? 'text-neon-dark dark:text-neon-green' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={toggleTheme}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-navy-900 dark:hover:text-white transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10 btn-press"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center md:hidden gap-4">
          <button 
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-400 p-2"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button 
            className="text-gray-900 dark:text-gray-300 hover:text-white p-2"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl border-b border-black/10 dark:border-white/10 p-6 flex flex-col space-y-6 shadow-xl animate-fade-in h-screen overflow-y-auto">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">Topics</div>
            {CATEGORIES.slice(0, 8).map((cat) => (
               <Link
                key={cat.id}
                to={`/articles?category=${encodeURIComponent(cat.name)}`}
                onClick={() => setIsMobileOpen(false)}
                className="block text-lg font-medium text-gray-800 dark:text-gray-300 hover:text-neon-dark dark:hover:text-neon-green"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          
          <div className="border-t border-gray-200 dark:border-white/10 pt-4 space-y-4">
             <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">Resources</div>
             {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-lg font-medium text-gray-800 dark:text-gray-300 hover:text-neon-dark dark:hover:text-neon-green"
                >
                  {link.name}
                </Link>
              ))}
          </div>
        </div>
      )}
    </header>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-6 md:mt-12 bg-white/70 dark:bg-[#1e293b]/40 backdrop-blur-xl border-t border-neon-dark/20 dark:border-neon-green/20 py-6 md:pt-10 md:pb-6 transition-colors duration-300 text-sm overflow-hidden">
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-30" style={{
            backgroundImage: 'linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(90deg, var(--grid-color) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
        }}></div>

        <div className="container mx-auto px-6 relative z-10">
            {/* Main Footer Content - Mobile: Flex Col Stack, Desktop: Grid */}
            <div className="flex flex-col space-y-6 md:grid md:grid-cols-4 md:gap-12 md:space-y-0 mb-8">
                
                {/* Column 1: Brand & Newsletter */}
                <div className="w-full flex flex-col space-y-4 md:col-span-1 md:pr-4 text-left">
                    <div>
                      <Link to="/" className="text-lg font-bold text-navy-900 dark:text-white mb-2 block">
                          Microsoft<span className="text-neon-dark dark:text-neon-green">Admin</span>.in
                      </Link>
                      <p className="text-gray-500 dark:text-gray-400 text-xs mb-4 leading-relaxed max-w-xs">
                          Professional M365 Admin Resource
                      </p>
                    </div>
                    
                    {/* Newsletter */}
                    <div className="space-y-2 max-w-sm">
                         <h5 className="text-lg font-semibold tracking-tight mb-2 text-neon-dark dark:text-neon-green">
                           Join the Inner Circle
                         </h5>
                         <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                             <input 
                                type="email" 
                                placeholder="Enter email" 
                                className="flex-1 min-w-0 bg-white dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg px-3 py-1.5 text-xs text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-neon-dark dark:focus:border-neon-green focus:ring-1 focus:ring-neon-dark/50 dark:focus:ring-neon-green/50 transition-all" 
                             />
                             <button className="px-3 py-1.5 bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 text-xs font-bold rounded-lg hover:bg-neon-blue hover:text-white dark:hover:bg-white transition-all shadow-lg hover:shadow-neon-dark/20 dark:hover:shadow-neon-green/20 whitespace-nowrap btn-press">
                                 Sign Up
                             </button>
                         </form>
                         <p className="text-[10px] text-gray-400">Weekly tips & M365 updates</p>
                    </div>
                </div>

                {/* Column 2: Explore */}
                <div className="w-full flex flex-col space-y-2 text-left">
                    <h4 className="text-lg font-semibold tracking-tight mb-2 text-neon-dark dark:text-neon-green">Explore</h4>
                    <ul className="space-y-1 text-sm leading-tight">
                        <li><Link to="/articles" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Knowledge Base</Link></li>
                        <li><Link to="/scripts" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">PowerShell Scripts</Link></li>
                        <li><Link to="/troubleshooting" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Troubleshooting Hub</Link></li>
                        <li><Link to="/news" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">M365 News Feed</Link></li>
                        <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">About</Link></li>
                    </ul>
                </div>

                {/* Column 3: Categories */}
                <div className="w-full flex flex-col space-y-2 text-left">
                    <h4 className="text-lg font-semibold tracking-tight mb-2 text-neon-dark dark:text-neon-green">Core Topics</h4>
                    <ul className="space-y-1 text-sm leading-tight">
                        <li><Link to="/articles?category=Exchange" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Exchange Online</Link></li>
                        <li><Link to="/articles?category=Teams" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Microsoft Teams</Link></li>
                        <li><Link to="/articles?category=Intune" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Intune & Devices</Link></li>
                        <li><Link to="/articles?category=Entra ID" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Entra ID / Identity</Link></li>
                        <li><Link to="/articles?category=Security" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Security & Compliance</Link></li>
                        <li><Link to="/articles?category=SharePoint" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">SharePoint Online</Link></li>
                        <li><Link to="/articles?category=OneDrive" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">OneDrive for Business</Link></li>
                        <li><Link to="/articles?category=Reporting" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Reporting & Power Platform</Link></li>
                        <li><Link to="/articles?category=Automation" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Automation & Scripts</Link></li>
                    </ul>
                </div>

                {/* Column 4: Connect */}
                <div className="w-full flex flex-col space-y-2 text-left md:col-span-1">
                     <h4 className="text-lg font-semibold tracking-tight mb-2 text-neon-dark dark:text-neon-green">Connect</h4>
                     <ul className="space-y-1 text-sm leading-tight mb-4">
                        <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">About & Contact</Link></li>
                        <li><Link to="/sitemap" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Full Sitemap</Link></li>
                        <li><a href="mailto:sayan@microsoftadmin.in" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors block py-0.5">Email Us</a></li>
                     </ul>

                     <h4 className="text-lg font-semibold tracking-tight mb-2 text-neon-dark dark:text-neon-green">Social</h4>
                     <ul className="space-y-1 text-sm leading-tight">
                        <li>
                          <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors flex items-center py-0.5 group">
                            GitHub <ExternalLink size={10} className="ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                        <li>
                          <a href="https://www.linkedin.com/company/microsoftadmin/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-neon-dark dark:hover:text-neon-green transition-colors flex items-center py-0.5 group">
                            LinkedIn <ExternalLink size={10} className="ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </li>
                     </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-4 border-t border-black/5 dark:border-white/5 flex flex-col items-center space-y-2 md:flex-row md:justify-between md:space-y-0 text-[10px] text-gray-500 dark:text-gray-500">
                <p>© 2025 MicrosoftAdmin.in · Not affiliated with Microsoft Corporation</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/privacy" className="hover:text-navy-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-navy-900 dark:hover:text-white transition-colors">Terms of Service</Link>
                    <Link to="/sitemap" className="hover:text-navy-900 dark:hover:text-white transition-colors">Sitemap</Link>
                </div>
            </div>
        </div>
    </footer>
  );
};

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          // Changed to fixed bottom-24 right-6 to stack above the ChatBot button
          className="fixed bottom-24 right-6 z-40 p-3 rounded-full bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 shadow-xl hover:bg-neon-blue dark:hover:bg-white transition-all duration-300 transform hover:scale-110 focus:outline-none hover:shadow-[0_0_25px_rgba(94,247,166,0.6)] btn-press"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export const SEO: React.FC<{ 
  title?: string; 
  description?: string; 
  keywords?: string[];
  image?: string;
  type?: string; 
  url?: string;
}> = ({ 
  title = "MicrosoftAdmin.in | M365 Knowledge Base", 
  description = "The professional resource for Microsoft 365 administrators. Guides, scripts, and real-world solutions.",
  keywords = ["Microsoft 365", "Office 365", "Exchange Online", "Teams", "Intune", "Powershell", "Admin"],
  image = "https://microsoftadmin.in/og-default.png", 
  type = "website",
  url
}) => {
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  useEffect(() => {
    document.title = title;
    
    // Helper to set meta tag
    const setMeta = (name: string, content: string) => {
        let element = document.querySelector(`meta[name="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('name', name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    // Helper to set property tag (OG)
    const setProperty = (property: string, content: string) => {
        let element = document.querySelector(`meta[property="${property}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute('property', property);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    // Basic Meta
    setMeta('description', description);
    setMeta('keywords', keywords.join(', '));
    setMeta('author', 'MicrosoftAdmin.in');

    // Open Graph
    setProperty('og:title', title);
    setProperty('og:description', description);
    setProperty('og:type', type);
    setProperty('og:url', currentUrl);
    setProperty('og:image', image);
    setProperty('og:site_name', 'MicrosoftAdmin.in');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

  }, [title, description, keywords, image, type, currentUrl]);

  return null;
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-neon-green selection:text-navy-900 flex flex-col text-navy-900 dark:text-white transition-colors duration-300">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow pt-24 pb-8">
        {children}
      </main>
      <ScrollToTop />
      <ChatBot />
      <Footer />
    </div>
  );
};
