import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import { ArticleCard } from '../components/UI';
import { ARTICLES, CATEGORIES } from '../data';
import { SEO } from '../components/Layout';

const ITEMS_PER_PAGE = 12;

export const KnowledgeBase: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract Series
  const seriesList = useMemo(() => {
      const allSeries = ARTICLES.filter(a => a.series).reduce((acc, curr) => {
          if (!acc.some(s => s.series === curr.series)) {
              acc.push(curr);
          }
          return acc;
      }, [] as typeof ARTICLES);
      return allSeries.slice(0, 3); // Top 3 series
  }, []);

  const filteredArticles = useMemo(() => {
    return ARTICLES.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-6">
      <SEO 
        title="M365 Knowledge Base | Tutorials & Guides" 
        description="Comprehensive Knowledge Base for Microsoft 365. Tutorials for Exchange, Teams, SharePoint, and Security compliance." 
        keywords={["Knowledge Base", "M365 Tutorials", "Exchange Guides", "Teams Admin"]}
      />

      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold mb-4 text-navy-900 dark:text-white">Knowledge Base</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Explore technical guides and best practices for Microsoft 365.</p>
      </div>

      {/* Series Row - "AdminDroid Style" */}
      {seriesList.length > 0 && selectedCategory === 'All' && !searchTerm && (
          <div className="mb-12">
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
                  <Layers size={16} className="text-indigo-500" /> Featured Series
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {seriesList.map((item, idx) => (
                      <div key={idx} className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-500/20 p-5 rounded-lg flex flex-col justify-between hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors">
                          <div>
                              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2 block">Series</span>
                              <h3 className="font-bold text-navy-900 dark:text-white text-lg mb-2">{item.series}</h3>
                              <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">In-depth coverage on {item.category} topics.</p>
                          </div>
                          <button 
                            onClick={() => setSearchTerm(item.series || '')}
                            className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline"
                          >
                              View Series <ChevronRight size={12} />
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      )}

      {/* Search and Filter Bar - Non-sticky, Compact */}
      <div className="glass-panel p-4 md:p-6 rounded-2xl mb-12 flex flex-col gap-6 shadow-xl border border-white/20 dark:border-white/5">
        
        {/* Row 1: Large Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search guides, error codes, tags..." 
            className="w-full bg-white dark:bg-navy-900/80 border border-gray-200 dark:border-white/10 rounded-xl pl-12 pr-6 py-3 text-base text-navy-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-neon-green/50 focus:ring-2 focus:ring-neon-green/20 transition-all shadow-inner"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Row 2: Category Filters */}
        <div className="flex flex-col gap-3">
            <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                <Filter className="w-3 h-3 mr-2" />
                Filter by Category
            </div>
            <div className="flex flex-wrap gap-3">
            <button 
                onClick={() => handleCategoryChange('All')}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                selectedCategory === 'All' 
                    ? 'bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 shadow-lg shadow-neon-green/20 scale-105' 
                    : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20'
                }`}
            >
                All
            </button>
            {CATEGORIES.map(cat => (
                <button 
                key={cat.id}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.name 
                    ? 'bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 shadow-lg shadow-neon-green/20 scale-105' 
                    : 'bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20'
                }`}
                >
                {cat.name}
                </button>
            ))}
            </div>
        </div>
      </div>

      {/* Results Meta */}
      <div className="mb-6 text-sm text-gray-500 font-medium flex justify-between items-center px-2">
        <span>Found {filteredArticles.length} articles</span>
        <span>Page {currentPage} of {totalPages || 1}</span>
      </div>

      {/* Articles Grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 mb-12">
        {paginatedArticles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>

      {/* No Results */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-xl border border-black/5 dark:border-white/5 border-dashed">
          <p className="text-gray-600 dark:text-gray-400 text-lg">No articles found matching your criteria.</p>
          <button 
            onClick={() => { setSearchTerm(''); handleCategoryChange('All'); }}
            className="mt-4 text-neon-dark dark:text-neon-green hover:underline font-bold"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pb-20">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-3 rounded-xl bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm"
          >
            <ChevronLeft size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                  currentPage === page 
                    ? 'bg-neon-dark dark:bg-neon-green text-white dark:text-navy-900 shadow-md transform scale-110' 
                    : 'bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-3 rounded-xl bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/10 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm"
          >
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      )}
    </div>
  );
};