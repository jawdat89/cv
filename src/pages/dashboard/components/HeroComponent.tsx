import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { normalizeExternalUrl } from "@/utils/url";
import { LOCATION_PAGE_PATH } from "@/utils/googleMaps";
import { FaArrowRight, FaGithub, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa";
import { Button, Link } from "@/components/ui";
import CVDownloadSelect from "@/components/CVDownloadSelect";
import clsx from "clsx";

const PROFILE_IMAGE = "/images/IMG-20241010-WA0030.jpg";
const PROFILE_OBJECT_POSITION = "25% 35%";

const HeroComponent: React.FC = () => {
  const { t, currentLanguage, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);

  const getLocalizedName = () => {
    switch (currentLanguage) {
      case "ar":
        return `${cvData.personalInfo.firstNameAr} ${cvData.personalInfo.lastNameAr}`;
      case "he":
        return `${cvData.personalInfo.firstNameHe} ${cvData.personalInfo.lastNameHe}`;
      default:
        return `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative mb-16 min-h-[85vh] overflow-hidden"
      aria-label="Introduction"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--brand-border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--brand-border) / 0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div
        className={clsx(
          "relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center gap-10 px-4 py-16 sm:px-6 md:flex-row md:items-center md:gap-12 lg:gap-16 lg:px-8",
          direction === "rtl" && "md:flex-row-reverse"
        )}
      >
        <div
          className={clsx(
            "flex flex-1 flex-col items-center text-center md:items-start md:text-start",
            direction === "rtl" && "md:items-end md:text-end"
          )}
        >
          <h1 className="max-sm:text-4xl text-[3.5rem] font-extrabold leading-tight tracking-tight text-brand-text">
            {getLocalizedName()}
          </h1>

          <p className="mt-3 text-xl font-semibold text-brand-accent sm:text-2xl">
            {t("hero.role")}
          </p>

          <div
            className={clsx(
              "mt-2 flex justify-center md:justify-start",
              direction === "rtl" && "md:justify-end"
            )}
          >
            <Link
              to={LOCATION_PAGE_PATH}
              className={clsx(
                "inline-flex items-center gap-1.5 text-sm text-brand-muted transition-colors hover:text-brand-accent",
                direction === "rtl" && "flex-row-reverse"
              )}
              ariaLabel={t("hero.location")}
            >
              <FaMapMarkerAlt
                className="h-3.5 w-3.5 shrink-0 text-brand-accent/80"
                aria-hidden
              />
              {t("hero.location")}
            </Link>
          </div>

          <div
            className={clsx(
              "mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start",
              direction === "rtl" && "flex-row-reverse md:justify-end"
            )}
          >
            <Button href="#projects" ariaLabel={t("hero.viewProjects")}>
              {t("hero.viewProjects")}
              <FaArrowRight
                className={clsx(
                  "h-3.5 w-3.5 shrink-0",
                  direction === "rtl" && "-scale-x-100"
                )}
                aria-hidden
              />
            </Button>
            <CVDownloadSelect variant="secondary" />
            <Button
              variant="secondary"
              href="#contact"
              ariaLabel={t("hero.contactMe")}
            >
              {t("hero.contactMe")}
            </Button>
            <Button
              variant="secondary"
              href={normalizeExternalUrl(cvData.personalInfo.linkedin)}
              ariaLabel={t("hero.linkedin")}
              external
            >
              <FaLinkedin className="h-4 w-4" aria-hidden />
              {t("hero.linkedin")}
            </Button>
            <Button
              variant="secondary"
              href={normalizeExternalUrl(cvData.personalInfo.website)}
              ariaLabel={t("hero.github")}
              external
            >
              <FaGithub className="h-4 w-4" aria-hidden />
              {t("hero.github")}
            </Button>
          </div>

          <div
            className={clsx(
              "mt-10 flex items-center rounded-xl border border-brand-border/50 bg-brand-surface/80 px-4 py-2.5 backdrop-blur-sm",
              direction === "rtl" ? "space-x-reverse space-x-3" : "space-x-3"
            )}
          >
            <img
              src="/logos/Strauss_Group_Logo.png"
              alt="Strauss Group"
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm font-medium text-brand-muted">
              {t("hero.employer1")}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs shrink-0 md:max-w-sm">
          <div
            className="absolute -inset-1 rounded-3xl bg-brand-accent/25 blur-md"
            aria-hidden
          />
          <div className="relative overflow-hidden rounded-3xl border border-brand-border/60 bg-brand-surface/80 p-3 shadow-xl backdrop-blur-sm">
            <img
              src={PROFILE_IMAGE}
              alt={getLocalizedName()}
              width={288}
              height={288}
              className="aspect-square w-full rounded-2xl object-cover ring-2 ring-brand-accent/30"
              style={{ objectPosition: PROFILE_OBJECT_POSITION }}
              fetchPriority="high"
              decoding="sync"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroComponent;
