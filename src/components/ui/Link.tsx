import React from "react";
import { Link as RouterLink } from "react-router-dom";

const isExternalUrl = (url: string) =>
  /^(https?:|mailto:|tel:)/i.test(url);

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
  dir?: "ltr" | "rtl" | "auto";
}

const Link: React.FC<LinkProps> = ({
  to,
  children,
  className,
  ariaLabel,
  external,
  dir,
}) => {
  const isExternal = external ?? isExternalUrl(to);
  const opensInNewTab =
    isExternal && !to.startsWith("mailto:") && !to.startsWith("tel:");

  if (isExternal || to.startsWith("#")) {
    return (
      <a
        href={to}
        className={className}
        aria-label={ariaLabel}
        target={opensInNewTab ? "_blank" : undefined}
        rel={opensInNewTab ? "noopener noreferrer" : undefined}
        dir={dir}
      >
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to} className={className} aria-label={ariaLabel} dir={dir}>
      {children}
    </RouterLink>
  );
};

export default Link;
