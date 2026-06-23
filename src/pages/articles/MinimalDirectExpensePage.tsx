import React, { useEffect } from "react";
import { useI18n } from "@/hooks";
import ArticlePageShell from "./ArticlePageShell";

const ARTICLE_TITLE = "Minimal Direct Expense, More Managed | Jawdat";
const ARTICLE_DESCRIPTION =
  "A demonstration of systems thinking applied to operational decision-making—not financial advice.";

const MinimalDirectExpensePage: React.FC = () => {
  const { t } = useI18n();

  useEffect(() => {
    document.title = ARTICLE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute("content", ARTICLE_DESCRIPTION);
    }
  }, []);

  return (
    <ArticlePageShell backTo="/articles" backLabel={t("articles.backToArticles")}>
      <article>
        <header className="mb-12 border-b border-brand-border/50 pb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-brand-accent">
            Systems Thinking · Operational Decision-Making
          </p>
          <h1 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            Minimal Direct Expense, More Managed
          </h1>
          <p className="mt-4 text-base text-brand-muted">
            A case study in systems thinking—not financial advice.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-brand-muted">
            <span>By Jawdat</span>
            <span aria-hidden>·</span>
            <time dateTime="2025-06-23">June 23, 2025</time>
            <span aria-hidden>·</span>
            <span>5 min read</span>
          </div>
        </header>

        <div className="space-y-6 text-base leading-relaxed text-brand-text">
          <p>
            For years I approached personal finance the way most people do: work hard, earn
            money, pay bills, and hope there is something left at the end of the month.
            Eventually I realized I was trying to solve the wrong problem. Instead of focusing
            only on increasing income, I asked a different question:
          </p>

          <blockquote className="border-s-4 border-brand-accent bg-brand-surface/80 py-4 pe-6 ps-6 italic text-brand-muted">
            How can I minimize direct expenses and manage the difference automatically?
          </blockquote>

          <p>
            That question led me to a simple principle:{" "}
            <strong>Minimal Direct Expense, More Managed.</strong>
          </p>

          <h2 className="pt-4 text-2xl font-bold text-brand-text">
            The First Principle: Minimize Direct Expense
          </h2>
          <p>
            Transportation became the first variable I chose to optimize. Rather than viewing a
            vehicle as a purchase, I viewed it as a <strong>system</strong>. The result was a
            Hyundai Ioniq Hybrid capable of approximately 20 kilometers per liter (4.6–5.0
            liters per 100 km).
          </p>
          <p>
            The government controls fuel taxes. Global markets influence oil prices. I control
            neither. What I can control is <strong>consumption</strong>. By reducing fuel
            consumption, I reduce my exposure to rising fuel prices.
          </p>

          <h3 className="text-xl font-semibold text-brand-text">The Hidden Profit</h3>
          <p>
            Most people call this saving money. I call it <strong>creating capital</strong>. If
            one person spends 1,000 NIS per month on transportation and another spends 700 NIS,
            the difference is available capital that can be redirected toward security and
            future goals.
          </p>

          <h2 className="pt-4 text-2xl font-bold text-brand-text">
            The Second Principle: More Managed
          </h2>
          <p>Reducing expenses alone is not enough. Money must be directed intentionally.</p>
          <ul className="list-disc space-y-2 ps-6">
            <li>
              <strong>750 NIS</strong> transferred automatically into a PayBox savings fund.
            </li>
            <li>
              <strong>300 NIS</strong> transferred automatically into a second savings account.
            </li>
          </ul>
          <p>
            <strong>Total managed savings: 1,050 NIS per month.</strong>
          </p>
          <p>
            Automation removes emotion from the process. Savings become{" "}
            <strong>infrastructure</strong> instead of intention.
          </p>

          <h2 className="pt-4 text-2xl font-bold text-brand-text">
            Credit Card Companies: The Memory Leaks of Personal Finance
          </h2>
          <p>
            As a developer, I learned that the most dangerous software bugs are often{" "}
            <strong>memory leaks</strong>. They do not crash a program immediately. Instead,
            they quietly consume resources in the background until performance suffers.
          </p>
          <p>
            Personal finance has an equivalent phenomenon:{" "}
            <strong>unmanaged credit card spending.</strong>
          </p>
          <p>
            The problem is not the credit card itself. The problem is the separation between
            action and consequence. Spending happens today, payment happens later. This delay
            creates the illusion that resources still exist.
          </p>
          <ul className="list-disc space-y-2 ps-6">
            <li>A streaming subscription.</li>
            <li>A convenience purchase.</li>
            <li>An online order.</li>
            <li>A restaurant meal.</li>
            <li>A service nobody uses anymore.</li>
          </ul>
          <p>
            Each expense appears harmless. Together they become a{" "}
            <strong>financial memory leak</strong>. Hundreds or thousands of shekels disappear
            not because of one catastrophic decision, but because of many tiny allocations
            accumulating in the background.
          </p>
          <blockquote className="border-s-4 border-brand-accent bg-brand-surface/80 py-4 pe-6 ps-6 italic text-brand-muted">
            In software, a developer would identify and fix a memory leak. In personal finance,
            recurring unnecessary spending should be treated the same way.
          </blockquote>

          <h2 className="pt-4 text-2xl font-bold text-brand-text">
            From Emergency to Maintenance
          </h2>
          <p>
            Without reserves, repairs and unexpected bills become <strong>emergencies</strong>.
            With reserves, they become <strong>maintenance</strong>. The event itself does not
            change; preparation changes everything.
          </p>
          <p>
            A future hybrid battery replacement, for example, becomes a planned expense rather
            than a crisis because the system has already been funding it for years.
          </p>

          <h2 className="pt-4 text-2xl font-bold text-brand-text">
            Thinking Like a Developer
          </h2>
          <p>
            Developers solve problems through systems. When a system produces bad results
            repeatedly, we redesign the system instead of blaming the output.
          </p>
          <p>My financial system became simple:</p>
          <ol className="list-decimal space-y-2 ps-6">
            <li>Minimize direct expenses.</li>
            <li>Eliminate financial memory leaks.</li>
            <li>Automate savings.</li>
            <li>Reduce unnecessary decisions.</li>
            <li>Allow time to compound results.</li>
          </ol>

          <h2 className="pt-4 text-2xl font-bold text-brand-text">The Equation</h2>
          <div className="rounded-xl bg-brand-surface/80 p-6 text-center">
            <p className="text-lg font-semibold text-brand-text">
              Minimal Direct Expense + More Managed − Financial Memory Leaks ={" "}
              <span className="text-brand-teal">Financial Stability</span>
            </p>
          </div>
          <p>
            The efficient vehicle reduces recurring costs. The automated savings system captures
            the difference. Eliminating financial leaks prevents silent resource loss. Time
            compounds the results.
          </p>

          <h2 className="pt-4 text-2xl font-bold text-brand-text">Conclusion</h2>
          <p>
            The breakthrough was not finding a secret investment strategy. The breakthrough was
            discovering a <strong>better operating system</strong>. I stopped focusing
            exclusively on earning more and started focusing on <strong>preserving more</strong>.
          </p>
          <p>
            The solution was never really about a car. It was never really about money. It was
            about <strong>system design</strong>.
          </p>
          <p className="pt-4 text-xl font-bold text-brand-text">
            Minimal Direct Expense. More Managed. No Memory Leaks. Equation Solved.
          </p>

          <p className="border-t border-brand-border/50 pt-8 text-sm italic text-brand-muted">
            This article is not financial advice. It demonstrates how I apply
            systems thinking to operational decision-making—the same approach I
            bring to logistics processes, SAP environments, and software systems.
          </p>
        </div>
      </article>
    </ArticlePageShell>
  );
};

export default MinimalDirectExpensePage;
