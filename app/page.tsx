"use client";

import { useState, useEffect, useRef } from "react";
import ArticleCard from "../components/ArticleCard";
import SearchBar from "../components/SearchBar";
import ThemeSelector from "../components/ThemeSelector";

interface Article {
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  url: string;
}

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [theme, setTheme] = useState<string>("retro");
  const [news, setNews] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const api = "75d54c21191f4e1abde0e90a8ef29c02";
  const loader = useRef<HTMLDivElement | null>(null);
  const initialLoad = useRef<boolean>(true);

  async function dataFetch() {
    if (!search || isLoading || !hasMore) return;

    setLoading(true);
    const url = `https://newsapi.org/v2/everything?q=${search}&page=${page}&pageSize=5&apiKey=${api}`;

    try {
      const response = await fetch(url);
      const dataJson = await response.json();

      if (dataJson.status === "error") {
        console.error("API Error:", dataJson.message);
        setHasMore(false);
        if (dataJson.code === "rateLimited") {
          alert(
            "You've made too many requests. Please wait and try again later.",
          );
        }
        return;
      }

      if (dataJson.articles.length === 0 || page * 5 >= dataJson.totalResults) {
        setHasMore(false);
      }

      const validArticles = dataJson.articles.filter(
        (article: Article) =>
          article.title && article.description && article.urlToImage,
      );

      setNews((prevNews) =>
        page === 1 ? validArticles : [...prevNews, ...validArticles],
      );
    } catch (error) {
      console.error("Error fetching news:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      initialLoad.current = false;
    }
  }

  const handleSearch = () => {
    if (!search.trim()) return;

    setPage(1);
    setNews([]);
    setHasMore(true);
    initialLoad.current = true;
    dataFetch();
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLoading &&
          hasMore &&
          !initialLoad.current
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.5 },
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [isLoading, hasMore]);

  useEffect(() => {
    if (!initialLoad.current || page === 1) {
      dataFetch();
    }
  }, [page]);

  return (
    <>
      <nav className="fixed flex w-full min-w-[476px] justify-between bg-primary-content p-2">
        <ThemeSelector theme={theme} setTheme={setTheme} />
        <SearchBar
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
          isLoading={isLoading}
        />
      </nav>

      <div
        data-theme={theme}
        className="flex min-h-screen min-w-[476px] flex-col items-center justify-center"
      >
        <div className="h-20" />

        {news.length > 0 ? (
          <div className="w-[400px]">
            {news.map((article, index) => (
              <ArticleCard
                key={`${article.title}-${index}`}
                article={article}
              />
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="mt-10 text-center text-gray-500">
              {search
                ? "No articles found. Try a different search term."
                : "Enter a search term to find news articles."}
            </div>
          )
        )}

        <div ref={loader} className="mb-5 flex justify-center">
          {isLoading && (
            <span className="loading loading-spinner loading-md"></span>
          )}
          {!isLoading && !hasMore && news.length > 0 && (
            <p className="text-center text-gray-500">
              No more articles available.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
