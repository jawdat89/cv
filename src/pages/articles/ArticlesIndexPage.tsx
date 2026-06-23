import React, { useEffect } from "react";
import { useI18n } from "@/hooks";
import { Link } from "@/components/ui";
import ArticlePageShell from "./ArticlePageShell";
import { articles } from "@/data/articles";

const ArticlesIndexPage: React.FC = () => {
  const { t } = useI18n();

  useEffect(() => {
    document.title = t("articles.indexPageTitle");
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", t("articles.indexMetaDescription"));
    }
  }, [t]);

  return (
    <ArticlePageShell>
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-brand-text">{t("articles.title")}</h1>
        <p className="mt-3 text-lg text-brand-muted">{t("articles.subtitle")}</p>
      </header>

      <div className="space-y-6">
        {articles.map((article) => (
          <Link
            key={article.slug}
            to={`/articles/${article.slug}`}
            className="block rounded-xl border border-brand-border/50 bg-brand-surface/80 p-6 transition-colors hover:border-brand-accent/50 hover:bg-brand-elevated/30"
          >
            <div className="mb-2 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-accent/10 px-2.5 py-0.5 text-xs font-medium text-brand-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-2xl font-semibold text-brand-text transition-colors group-hover:text-brand-accent">
              {article.title}
            </h2>
            <p className="mt-2 text-brand-muted">{article.subtitle}</p>
            <div className="mt-3 flex gap-3 text-sm text-brand-muted">
              <time dateTime={article.date}>{article.dateLabel}</time>
              <span aria-hidden>·</span>
              <span>{article.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </ArticlePageShell>
  );
};

export default ArticlesIndexPage;
