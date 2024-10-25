"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchData(url: string) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: NewsResponse = await response.json();
        console.log(data);
        setNews(data.articles);
      } catch (error: any) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData(url);
  }, [url]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="flex flex-col items-center justify-center px-6 text-neutral-950">
      <section>
        {news.length > 0 ? (
          news.map((singleNews, index) => (
            <>
              <article key={index} className="w-[800px]">
                {/* author and source */}
                <div className="mb-3 flex items-center justify-start">
                  <img
                    src="/panda.png" // Using <img> tag for local images
                    alt="Author's logo"
                    width={24} // Adjust width according to your needs
                    height={24} // Adjust height according to your needs
                    className="mr-2 inline-block"
                  />
                  <p className="inline-block text-xs">
                    {singleNews.author || "Unknown Author"}{" "}
                    <span className="inline text-neutral-400">from</span>{" "}
                    {singleNews.source.name}
                  </p>
                </div>
                {/* title and description */}
                <div className="mb-3 flex">
                  <div className="flex-1">
                    <h2 className="mb-2 text-2xl font-bold leading-7">
                      {singleNews.title}
                    </h2>
                    <p className="leading-5 text-neutral-500">
                      {singleNews.description}
                    </p>
                  </div>

                  {singleNews.urlToImage && (
                    <img
                      src={singleNews.urlToImage} // Using <img> tag for external images
                      alt={singleNews.title}
                      className="h-36 w-36 ml-3 object-cover" // Control image size here
                    />
                  )}
                </div>
                {/* date and source page link */}
                <div className="flex text-xs">
                  <p className="mr-5">
                    Published on:{" "}
                    {new Date(singleNews.publishedAt).toLocaleDateString()}
                  </p>{" "}
                  <a
                    href={singleNews.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline"
                  >
                    Read more
                  </a>{" "}
                </div>
              </article>
              {/* breaker */}
              <hr className="my-8 h-[1px] w-full border-none bg-neutral-200" />
            </>
          ))
        ) : (
          <p>No news articles found.</p> // Message for no articles
        )}
      </section>
    </main>
  );
}
