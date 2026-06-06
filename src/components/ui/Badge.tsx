import React from "react";
import clsx from "clsx";

interface BadgeProps {
  text: string;
  variant?: "blue" | "teal" | "gray";
  className?: string;
}

const variantStyles = {
  blue: "border-brand-accent/25 bg-brand-accent-subtle/10 text-brand-accent",
  teal: "border-brand-teal/25 bg-brand-teal/10 text-brand-teal",
  gray: "border-brand-border bg-brand-elevated/50 text-brand-muted",
};

const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "blue",
  className,
}) => (
  <span
    className={clsx(
      "inline-block rounded-md border px-2.5 py-1 text-sm font-medium",
      variantStyles[variant],
      className
    )}
  >
    {text}
  </span>
);

export default Badge;
