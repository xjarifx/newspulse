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

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="mb-6 rounded border border-accent p-2">
      <img
        src={article.urlToImage}
        alt={article.title}
        className="mb-5 h-48 w-full rounded object-cover"
        width={400}
        height={200}
        loading="lazy"
      />
      <h1 className="mb-5 text-xl font-extrabold">{article.title}</h1>
      <p className="mb-5">{article.description}</p>
      <div className="mb-5 flex items-center space-x-2 text-sm">
        <span>
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <span className="mx-1">|</span>
        <span>Source:</span>
        <span className="font-semibold text-primary">
          {article.source.name}
        </span>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary hover:underline"
      >
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;
