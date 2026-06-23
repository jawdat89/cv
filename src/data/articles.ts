export interface ArticleMeta {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  dateLabel: string;
  tags: string[];
  readTime: string;
}

export const articles: ArticleMeta[] = [
  {
    slug: "minimal-direct-expense-more-managed",
    title: "Minimal Direct Expense, More Managed",
    subtitle: "Systems thinking applied to operational decision-making",
    date: "2025-06-23",
    dateLabel: "June 23, 2025",
    tags: ["Systems Thinking", "Process Optimization"],
    readTime: "5 min read",
  },
];
