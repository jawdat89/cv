import React from "react";
import clsx from "clsx";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  ariaLabel: string;
  type?: "button" | "submit";
  external?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  href,
  className,
  ariaLabel,
  type = "button",
  external = false,
}) => {
  const styles = clsx(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150",
    variant === "primary" &&
      "bg-brand-accent px-6 py-3 text-white shadow-sm hover:bg-brand-accent-hover hover:shadow-md",
    variant === "secondary" &&
      "border border-brand-border bg-brand-elevated/40 px-[22px] py-[10px] text-brand-text hover:border-brand-accent/40 hover:bg-brand-accent-subtle/10 hover:text-brand-accent",
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
