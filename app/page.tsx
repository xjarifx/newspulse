// app/page.tsx
"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import NewsArticleComponent from "../components/NewsArticle";
import { fetchNews, NewsArticle as NewsArticleType } from "../lib/fetchNews";

export default function Home() {
  const [news, setNews] = useState<NewsArticleType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [initialCount, setInitialCount] = useState(4); // State to store the initial article count
  const [articlesPerPage, setArticlesPerPage] = useState(5); // Control articles per page
  const observer = useRef<IntersectionObserver | null>(null);

  const apiKey = process.env.API_KEY;

  // Infinite Scroll Observer
  const handleObserver = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) setPage((prevPage) => prevPage + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading],
  );

  // Fetch news articles when the page changes
  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const newArticles = await fetchNews(page, apiKey);

        // Filter articles to ensure all required fields are present
        const filteredArticles = newArticles.filter(
          (article) =>
            article.author &&
            article.source.name &&
            article.title &&
            article.description &&
            article.urlToImage &&
            article.url &&
            article.publishedAt,
        );

        // Set initial count on the first page load
        if (page === 1) {
          setInitialCount(filteredArticles.length); // Update the initial count with the number of articles fetched
        }

        // Append new filtered articles to the existing list
        setNews((prev) => [...prev, ...filteredArticles]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, [page]);

  // Handle change in articles per page
  const handleArticlesPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setArticlesPerPage(Number(e.target.value));
    setPage(1); // Reset page to 1 to fetch new articles based on selection
    setNews([]); // Clear previous articles
  };

  if (error) return <div>Error: {error}</div>;

  // Calculate how many articles to display based on articlesPerPage and current page
  const displayedArticles = news.slice(0, articlesPerPage * page);

  return (
    <main className="flex flex-col items-center px-6 text-neutral-950">
      <section>
        {displayedArticles.map((article, index) => (
          <div
            key={index}
            ref={index === displayedArticles.length - 1 ? handleObserver : null}
          >
            <NewsArticleComponent article={article} />
          </div>
        ))}
        {loading && <div className="loading loading-spinner loading-lg"></div>}
      </section>
    </main>
  );
}
