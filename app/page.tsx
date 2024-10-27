"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);
  const api = process.env.NEXT_PUBLIC_API_KEY;

  let url = search
    ? `https://newsapi.org/v2/everything?q=${search}&apiKey=${api}`
    : "";

  async function dataFetch() {
    if (!search) return;
    try {
      const data = await fetch(url);
      const dataJson = await data.json();
      setNews(dataJson.articles);
      console.log(dataJson);
    } catch (error) {
      console.error("error: ", error);
    }
  }

  const handelSearch = () => {
    dataFetch();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* search section */}
      <div className="flex">
        <input
          type="text"
          placeholder="Search here"
          className="input input-bordered input-primary mr-2 w-full max-w-xs"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handelSearch();
            }
          }}
        />
        <button className="btn btn-primary" onClick={() => handelSearch()}>
          Search
        </button>
      </div>
      {/* news render section */}
      {news.length > 0 && (
        <div className="w-[800px]">
          {news
            .filter(
              (article) =>
                article.title && article.description && article.urlToImage,
            )
            .map((Snews, index) => {
              return (
                <div key={index} className="mb-6">
                  <div className="flex">
                    <div>
                      <h1 className="text-3xl font-extrabold">{Snews.title}</h1>
                      <p className="">{Snews.description}</p>
                    </div>
                    <img src={Snews.urlToImage} alt="" className="h-40" />
                  </div>

                  <a href={Snews.url} target="_blank">
                    Read more
                  </a>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
