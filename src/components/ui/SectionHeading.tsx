import React from "react";
import clsx from "clsx";
import { IconType } from "react-icons";

interface SectionHeadingProps {
  icon: IconType;
  title: string;
  subtitle?: string;
  direction?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  icon: Icon,
  title,
  subtitle,
  direction = "ltr",
}) => (
  <div className="mb-8">
    <h2 className="flex items-center text-3xl font-bold leading-tight text-brand-text">
      <Icon
        className={clsx(
          "h-6 w-6 shrink-0 text-brand-accent",
          direction === "rtl" ? "ml-3" : "mr-3"
        )}
        aria-hidden
      />
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-base leading-relaxed text-brand-muted">{subtitle}</p>
    )}
  </div>
);

export default SectionHeading;
