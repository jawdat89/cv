import React from "react";
import clsx from "clsx";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className, hover = true }) => (
  <div
    className={clsx(
      "rounded-xl border border-brand-border/40 bg-brand-elevated/30 p-6",
      hover &&
        "transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-border/60 hover:bg-brand-elevated/50",
      className
    )}
  >
    {children}
  </div>
);

export default Card;
