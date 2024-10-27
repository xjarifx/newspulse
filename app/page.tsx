"use client";

import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
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

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  // Array of themes
  const themeOptions = ["light", "dark", "cyberpunk", "retro", "lemonade"];

  return (
    <>
      <div className="dropdown absolute left-3 top-3 mb-72">
        <div tabIndex={0} role="button" className="btn m-1">
          Theme
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] w-52 rounded-box bg-base-300 p-2 shadow-2xl"
        >
          {themeOptions.map((themeValue) => (
            <li key={themeValue}>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                aria-label={
                  themeValue.charAt(0).toUpperCase() + themeValue.slice(1)
                }
                value={themeValue}
                checked={theme === themeValue}
                onChange={handleThemeChange}
              />
            </li>
          ))}
        </ul>
      </div>

      <div
        data-theme={theme}
        className="flex min-h-screen flex-col items-center justify-center"
      >
        {/* search section */}
        <div className="my-6 flex">
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
                  <div
                    key={index}
                    className="mb-6 rounded border border-accent p-4"
                  >
                    <div className="flex">
                      <div>
                        <h1 className="mb-2 text-3xl font-extrabold">
                          {Snews.title}
                        </h1>
                        <p className="">{Snews.description}</p>
                      </div>
                      <img
                        src={Snews.urlToImage}
                        alt=""
                        className="ml-3 h-40 rounded"
                      />
                    </div>

                    <p>{Snews.publishedAt}</p>

                    <a
                      href={Snews.url}
                      target="_blank"
                      className="text-secondary"
                    >
                      Read more
                    </a>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
