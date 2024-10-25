"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface NewsArticle {
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
}

interface NewsResponse {
  articles: NewsArticle[];
}

export default function Home() {
  const apiKey = "345ad07025394e39908c0fe5143db723";
  const query = "technology";
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  // Function to fetch news articles based on page
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}&page=${page}&pageSize=10`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: NewsResponse = await response.json();
      console.log(data);
      setNews((prevNews) => [
        ...prevNews,
        ...data.articles.filter(
          (article) =>
            article.author &&
            article.source.name &&
            article.title &&
            article.description &&
            article.urlToImage &&
            article.url &&
            article.publishedAt,
        ),
      ]); // Append new articles to existing list, filtering them
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [url, page]);

  // Set up infinite scroll observer
  const lastNewsElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading],
  );

  // Fetch initial news articles and subsequent pages when page changes
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex flex-col items-center justify-center px-6 text-neutral-950">
      <section>
        {news.map((singleNews, index) => (
          <article
            key={index}
            className="w-[800px]"
            ref={index === news.length - 1 ? lastNewsElementRef : null} // Attach ref to last item
          >
            {/* Author and source */}
            <div className="mb-3 flex items-center justify-start">
              <img
                src="/panda.png"
                alt="Author's logo"
                width={24}
                height={24}
                className="mr-2 inline-block"
              />
              <p className="inline-block text-xs">
                {singleNews.author}{" "}
                <span className="inline text-neutral-400">from</span>{" "}
                {singleNews.source.name}
              </p>
            </div>

            {/* Title and description */}
            <div className="mb-3 flex">
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-bold leading-7">
                  {singleNews.title}
                </h2>
                <p className="leading-5 text-neutral-500">
                  {singleNews.description}
                </p>
              </div>

              <img
                src={singleNews.urlToImage ?? "/placeholder-image.png"}
                alt={singleNews.title}
                className="ml-3 h-36 w-36 object-cover"
              />
            </div>

            {/* Date and source page link */}
            <div className="flex text-xs">
              <p className="mr-5">
                Published on:{" "}
                {new Date(singleNews.publishedAt).toLocaleDateString()}
              </p>
              <a
                href={singleNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline"
              >
                Read more
              </a>
            </div>

            {/* Divider */}
            <hr className="my-8 h-[1px] w-full border-none bg-neutral-200" />
          </article>
        ))}
        {loading && (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}
      </section>
    </main>
  );
}
