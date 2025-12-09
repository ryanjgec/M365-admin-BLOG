
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button, Badge, ArticleCard } from './UI';
import { BrowserRouter } from 'react-router-dom';
import { Article } from '../types';

// Declare Jest globals to fix TypeScript errors
declare const jest: any;
declare const describe: any;
declare const it: any;
declare const expect: any;

// Mock the custom hook to isolate component testing
jest.mock('../hooks/useAiSummary', () => ({
  useAiSummary: (content: string, id: string, excerpt: string) => ({
    summary: 'Mocked AI Summary',
    isAiGenerated: true
  }),
}));

const mockArticle: Article = {
  id: '1',
  title: 'Test Article Title',
  slug: 'test-article-slug',
  excerpt: 'Original Excerpt',
  content: 'Full article content here...',
  category: 'Test Category',
  tags: ['Tag1', 'Tag2'],
  author: 'Test Author',
  readTime: 7,
  views: 1234,
  publishedDate: '2023-10-27',
};

describe('UI Components', () => {
  describe('Button', () => {
    it('renders children text correctly', () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    it('calls onClick handler when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Action</Button>);
      
      fireEvent.click(screen.getByText('Action'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders as a React Router Link when "to" prop is provided', () => {
      render(
        <BrowserRouter>
          <Button to="/internal-path">Navigate</Button>
        </BrowserRouter>
      );
      
      const link = screen.getByRole('link', { name: /Navigate/i });
      expect(link).toHaveAttribute('href', '/internal-path');
    });

    it('applies variant classes correctly', () => {
      render(<Button variant="outline">Outline Button</Button>);
      const btn = screen.getByText('Outline Button');
      // Checking for a class specific to the outline variant in UI.tsx
      expect(btn.className).toContain('border-neon-dark');
    });
  });

  describe('Badge', () => {
    it('renders text correctly', () => {
      render(<Badge text="New Feature" />);
      expect(screen.getByText('New Feature')).toBeInTheDocument();
    });

    it('applies custom color styles if provided', () => {
      const customColor = 'bg-red-500 text-white';
      render(<Badge text="Alert" color={customColor} />);
      const badge = screen.getByText('Alert');
      expect(badge.className).toContain('bg-red-500');
    });
  });

  describe('ArticleCard', () => {
    it('renders article information correctly', () => {
      render(
        <BrowserRouter>
          <ArticleCard article={mockArticle} />
        </BrowserRouter>
      );

      // Check Title
      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      
      // Check Category Badge
      expect(screen.getByText(mockArticle.category)).toBeInTheDocument();
      
      // Check Read Time
      expect(screen.getByText(`${mockArticle.readTime} min read`)).toBeInTheDocument();
      
      // Check Date
      expect(screen.getByText(mockArticle.publishedDate)).toBeInTheDocument();

      // Check Summary (should be the mocked value)
      expect(screen.getByText('Mocked AI Summary')).toBeInTheDocument();
      expect(screen.getByText('AI Summary')).toBeInTheDocument(); // The small label indicating AI generation
    });

    it('renders cover image when provided', () => {
      const articleWithImage = { 
        ...mockArticle, 
        coverImage: 'https://example.com/image.jpg' 
      };

      render(
        <BrowserRouter>
          <ArticleCard article={articleWithImage} />
        </BrowserRouter>
      );

      const img = screen.getByAltText(mockArticle.title);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('links to the correct slug', () => {
      render(
        <BrowserRouter>
          <ArticleCard article={mockArticle} />
        </BrowserRouter>
      );

      const links = screen.getAllByRole('link');
      // One link on title, one "Read Guide" button/link
      const guideLink = links.find(l => l.getAttribute('href') === `/kb/${mockArticle.slug}`);
      expect(guideLink).toBeInTheDocument();
    });
  });
});
