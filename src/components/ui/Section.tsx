import React from "react";
import clsx from "clsx";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  spacing?: "normal" | "large";
}

const Section: React.FC<SectionProps> = ({
  children,
  id,
  title,
  subtitle,
  className,
  spacing = "normal",
}) => (
  <section
    id={id}
    className={clsx(
      "mx-auto w-full max-w-[1200px]",
      spacing === "large" ? "py-24" : "py-16",
      "px-4 sm:px-6 lg:px-8",
      className
    )}
    aria-labelledby={title ? `${id}-title` : undefined}
  >
    {title && (
      <h2
        id={`${id}-title`}
        className="mb-2 text-[2.5rem] font-bold leading-tight text-brand-text"
      >
        {title}
      </h2>
    )}
    {subtitle && (
      <p className="mb-8 text-lg leading-relaxed text-brand-muted">{subtitle}</p>
    )}
    {children}
  </section>
);

export default Section;
