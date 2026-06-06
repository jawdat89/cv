import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { normalizeExternalUrl } from "@/utils/url";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import { Button } from "@/components/ui";
import CVDownloadSelect from "@/components/CVDownloadSelect";
import clsx from "clsx";

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

      <div className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-brand-accent">
          {t("hero.role")}
        </p>

        <h1 className="max-sm:text-4xl text-[3.5rem] font-extrabold leading-tight tracking-tight text-brand-text">
          {getLocalizedName()}
        </h1>

        <p className="mt-4 max-w-3xl text-xl font-medium leading-snug text-brand-text/90 max-sm:text-lg sm:text-2xl">
          {t("hero.title")}
        </p>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-brand-muted">
          {t("hero.subtitle")}
        </p>

        <div
          className={clsx(
            "mt-8 flex flex-wrap items-center justify-center gap-3",
            direction === "rtl" && "flex-row-reverse"
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

        <div className="mt-12 flex flex-col items-center gap-3">
          <div
            className={clsx(
              "flex items-center rounded-xl border border-brand-border/50 bg-brand-surface/80 px-4 py-2.5 backdrop-blur-sm",
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
      </div>
    </motion.section>
  );
};

export default HeroComponent;
