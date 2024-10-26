import { NewsArticle } from "../lib/fetchNews";

interface NewsArticleProps {
  article: NewsArticle;
}

export default function NewsArticleComponent({ article }: NewsArticleProps) {
  return (
    <article className="w-[800px]">
      <div className="mb-3 flex items-center">
        <img
          src="/panda.png"
          alt="Author's logo"
          width={24}
          height={24}
          className="mr-2"
        />
        <p className="text-xs">
          {article.author} <span className="text-neutral-400">from</span>{" "}
          {article.source.name}
        </p>
      </div>
      <div className="mb-3 flex">
        <div className="flex-1">
          <h2 className="mb-2 text-2xl font-bold">{article.title}</h2>
          <p className="text-neutral-500">{article.description}</p>
        </div>
        <img
          src={article.urlToImage ?? "/placeholder-image.png"}
          alt={article.title}
          className="ml-3 h-36 w-36 object-cover"
        />
      </div>
      <div className="flex text-xs">
        <p className="mr-5">
          Published on: {new Date(article.publishedAt).toLocaleDateString()}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          Read more
        </a>
      </div>
      <hr className="my-8 h-[1px] w-full bg-neutral-200" />
    </article>
  );
}
