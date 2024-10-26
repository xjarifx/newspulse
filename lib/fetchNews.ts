// lib/fetchNews.ts
export interface NewsArticle {
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}

export const fetchNews = async (
  page: number,
  apiKey: string,
  query: string = "technology",
) => {
  const url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&pageSize=10&apiKey=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = await response.json();
  return data.articles as NewsArticle[];
};
