import React from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { FaArrowLeft, FaArrowRight, FaMoon, FaSun } from "react-icons/fa";
import { RootState } from "@/store";
import { setTheme } from "@/store/cvSlice";
import { useI18n } from "@/hooks";
import LanguageSelector from "@/components/LanguageSelector";
import RelaxingDropsBackground from "@/components/RelaxingDropsBackground";
import { Link } from "@/components/ui";

interface ArticlePageShellProps {
  children: React.ReactNode;
  backTo?: string;
  backLabel?: string;
}

const ArticlePageShell: React.FC<ArticlePageShellProps> = ({
  children,
  backTo = "/",
  backLabel,
}) => {
  const { t, direction } = useI18n();
  const dispatch = useDispatch();
  const cvData = useSelector((state: RootState) => state.cv);
  const isRtl = direction === "rtl";
  const BackIcon = isRtl ? FaArrowRight : FaArrowLeft;

  const toggleTheme = () => {
    const newTheme = cvData.theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="relative min-h-screen">
      <RelaxingDropsBackground theme={cvData.theme} />

      <nav
        className="layer-nav border-b border-brand-border/50 bg-brand-bg/75 backdrop-blur-md"
        aria-label="Article navigation"
      >
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to={backTo}
            className={clsx(
              "inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition-colors hover:text-brand-accent",
              isRtl && "flex-row-reverse"
            )}
            ariaLabel={backLabel ?? t("articles.backToHome")}
          >
            <BackIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
            {backLabel ?? t("articles.backToHome")}
          </Link>

          <div
            className={clsx(
              "flex items-center",
              direction === "rtl" ? "space-x-reverse space-x-3" : "space-x-3"
            )}
          >
            <LanguageSelector />
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border/50 bg-brand-surface text-brand-muted transition-colors hover:text-brand-accent"
              aria-label={
                cvData.theme === "light"
                  ? t("actions.switchToDark")
                  : t("actions.switchToLight")
              }
            >
              {cvData.theme === "light" ? (
                <FaMoon className="h-4 w-4" />
              ) : (
                <FaSun className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="layer-content mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default ArticlePageShell;
