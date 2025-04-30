export interface NewsArticle {
  article_id: string;
  title: string;
  description: string;
  source_name: string;
  creator: string[];
  link: string;
  image_url: string;
  pubDate: string;
  pubDateTZ: string;
}

export interface NewsResponse {
  total: number;
  articles: NewsArticle[];
}

export type NewsCategoryType =
  | 'top'
  | 'sports'
  | 'technology'
  | 'business'
  | 'science'
  | 'entertainment'
  | 'health'
  | 'world'
  | 'politics'
  | 'environment'
  | 'food';
