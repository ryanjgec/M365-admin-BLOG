
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { ArticleDetail } from './pages/ArticleDetail';
import { Scripts } from './pages/Scripts';
import { News } from './pages/News';
import { Troubleshooting } from './pages/Troubleshooting';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import { Sitemap } from './pages/Sitemap';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/kb/:slug" element={<ArticleDetail />} />
          <Route path="/scripts" element={<Scripts />} />
          <Route path="/troubleshooting" element={<Troubleshooting />} />
          <Route path="/news" element={<News />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
