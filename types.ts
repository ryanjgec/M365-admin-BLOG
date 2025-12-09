
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown/HTML string
  category: string;
  tags: string[];
  author: string;
  readTime: number; // minutes
  views: number;
  publishedDate: string;
  coverImage?: string;
  series?: string; // New field for Series clustering
}

export interface Script {
  id: string;
  title: string;
  description: string;
  category: string;
  code: string;
  language: 'powershell';
  downloads: number;
  prerequisites: string[];
  coverImage?: string;
  lastUpdated?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  count: number;
  color: string; // Hex code
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  url: string;
  date: string;
  important: boolean;
}
