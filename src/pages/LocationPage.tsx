import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { FaArrowLeft, FaMapMarkerAlt, FaMoon, FaSun } from "react-icons/fa";
import { RootState } from "@/store";
import { setTheme } from "@/store/cvSlice";
import { useI18n } from "@/hooks";
import { useLocationMapContent } from "@/hooks/useLocationMapContent";
import LanguageSelector from "@/components/LanguageSelector";
import RelaxingDropsBackground from "@/components/RelaxingDropsBackground";
import { Card, Link } from "@/components/ui";

const LocationPage: React.FC = () => {
  const { t, direction } = useI18n();
  const dispatch = useDispatch();
  const cvData = useSelector((state: RootState) => state.cv);
  const mapContent = useLocationMapContent(cvData.personalInfo.address);
  const [isMapReady, setIsMapReady] = useState(false);

  useEffect(() => {
    setIsMapReady(true);
  }, []);

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
        aria-label="Location page navigation"
      >
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className={clsx(
              "inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition-colors hover:text-brand-accent",
              direction === "rtl" && "flex-row-reverse"
            )}
            ariaLabel={t("location.backToHome")}
          >
            <FaArrowLeft
              className={clsx("h-3.5 w-3.5", direction === "rtl" && "-scale-x-100")}
              aria-hidden
            />
            {t("location.backToHome")}
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

      <main className="layer-content mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-widest text-brand-accent">
            <FaMapMarkerAlt className="h-3.5 w-3.5" aria-hidden />
            {t("location.eyebrow")}
          </p>
          <h1 className="text-3xl font-bold text-brand-text sm:text-4xl">
            {t("location.title")}
          </h1>
          <p className="mt-3 text-lg text-brand-muted">{mapContent.query}</p>
        </div>

        <Card hover={false} className="overflow-hidden p-0">
          {isMapReady && mapContent.embedUrl ? (
            <iframe
              title={t("location.mapTitle")}
              src={mapContent.embedUrl}
              width="600"
              height="450"
              className="aspect-[4/3] w-full border-0 bg-brand-surface"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-4 bg-brand-surface px-6 text-center">
              <p className="text-sm text-brand-muted">{t("location.mapUnavailable")}</p>
              <Link
                to={mapContent.mapsUrl}
                external
                className="font-semibold text-brand-accent transition-colors hover:text-brand-accent-hover"
                ariaLabel={t("location.openInGoogleMaps")}
              >
                {t("location.openInGoogleMaps")}
              </Link>
            </div>
          )}
        </Card>

        <p className="mt-6 text-center text-sm text-brand-muted">
          <Link
            to={mapContent.mapsUrl}
            external
            className="font-medium text-brand-accent transition-colors hover:text-brand-accent-hover"
            ariaLabel={t("location.openInGoogleMaps")}
          >
            {t("location.openInGoogleMaps")}
          </Link>
        </p>
      </main>
    </div>
  );
};

export default LocationPage;
