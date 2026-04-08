import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { normalizeExternalUrl } from "@/utils/url";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import clsx from "clsx";

const HeroComponent: React.FC = () => {
  const { t, currentLanguage, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);

  // Function to get the appropriate name based on current language
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
      initial={{ opacity: 0, y: -28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
      className="mt-0 mb-16"
    >
        <div className="relative overflow-hidden rounded-b-3xl rounded-t-none border border-gray-200/80 bg-white/95 p-6 shadow-xl backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-800/95 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
        <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl dark:bg-primary/25" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-blue-400/20 blur-3xl dark:bg-blue-500/20" />

        <div
          className={clsx(
            "relative z-10 grid items-center gap-8 lg:grid-cols-2"
          )}
        >
          <div
            className={clsx(
              "text-center lg:text-left",
              direction === "rtl" && "lg:text-right"
            )}
          >
            <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              {getLocalizedName()}
            </h1>

            <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200 sm:text-xl">
              {t("hero.title")}
            </p>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 sm:text-base">
              {t("hero.subtitle")}
            </p>

            <div
              className={clsx(
                "mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start",
                direction === "rtl" && "lg:justify-end"
              )}
            >
              <a
                href="#projects"
                className={clsx(
                  "inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark",
                  direction === "rtl" && "flex-row-reverse"
                )}
              >
                {t("hero.viewProjects")}
                <FaArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={normalizeExternalUrl(cvData.personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-200"
              >
                <FaLinkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={normalizeExternalUrl(cvData.personalInfo.website)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300/80 bg-white/70 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary dark:border-gray-600 dark:bg-gray-800/70 dark:text-gray-200"
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            </div>

          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/40 to-blue-400/30 blur-md" />
            <div className="relative rounded-3xl border border-white/70 bg-white/85 p-5 shadow-2xl backdrop-blur-sm dark:border-gray-700/70 dark:bg-gray-900/80">
              <div className="mb-5 flex items-center gap-4">
                <img
                  src="/images/IMG-20241010-WA0030.jpg"
                  alt={getLocalizedName()}
                  className="h-20 w-20 rounded-2xl object-cover object-center ring-2 ring-primary/30"
                  style={{ objectPosition: "center 30%" }}
                />
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {getLocalizedName()}
                  </p>
                  <p className="text-sm text-primary dark:text-primary-light">
                    {t("hero.fullStackDeveloper")}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200/80 bg-white/70 p-3 text-sm text-gray-700 dark:border-gray-700/70 dark:bg-gray-800/70 dark:text-gray-300">
                <p className="font-semibold text-gray-900 dark:text-white">{t("hero.currentFocusTitle")}</p>
                <p className="mt-1">{t("hero.currentFocusBody")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employers Section */}
        <div className="relative z-10 mt-8 flex flex-col items-center space-y-3 mb-6">
          {/* Current Employer */}
          <div
            className={clsx(
              "relative z-10 flex items-center bg-white/70 dark:bg-gray-700/70 px-4 py-2 rounded-xl border border-gray-200/70 dark:border-gray-600/70 shadow-sm",
              direction === "rtl"
                ? "space-x-reverse space-x-3"
                : "space-x-3"
            )}
          >
            <img
              src="/logos/Strauss_Group_Logo.png"
              alt="Strauss Group Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {t("hero.employer1")}
            </span>
          </div>

          {/* Previous Employer */}
          <div
            className={clsx(
              "relative z-10 flex items-center bg-white/70 dark:bg-gray-700/70 px-4 py-2 rounded-xl border border-gray-200/70 dark:border-gray-600/70 shadow-sm opacity-90",
              direction === "rtl"
                ? "space-x-reverse space-x-3"
                : "space-x-3"
            )}
          >
            <img
              src="/logos/BestTuqay.png"
              alt="BestTuqay Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {t("hero.employer2")}
            </span>
          </div>

          <div
            className={clsx(
              "relative z-10 flex items-center bg-white/70 dark:bg-gray-700/70 px-4 py-2 rounded-xl border border-gray-200/70 dark:border-gray-600/70 shadow-sm opacity-90",
              direction === "rtl"
                ? "space-x-reverse space-x-3"
                : "space-x-3"
            )}
          >
            <img
              src="https://www.atid.org.il/wp-content/uploads/2025/02/לוגו-ראשי-300x113.png"
              alt="Atid Logo"
              className="h-7 w-auto object-contain"
            />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {t("hero.studentAtid")}
            </span>
          </div>
        </div>

        {/* Contact Info - Desktop */}
        <div
          className={clsx(
            "relative z-10 hidden md:flex justify-center text-sm text-gray-500 dark:text-gray-400",
            direction === "rtl" ? "space-x-reverse space-x-6" : "space-x-6"
          )}
        >
          {/* <span>📍 {t("hero.available")}</span> */}
          <span>
            📧{" "}
            <a
              href={`mailto:${cvData.personalInfo.email}`}
              className="hover:text-primary transition-colors"
            >
              {cvData.personalInfo.email}
            </a>
          </span>
          <span>
            📱{" "}
            <a
              href={`tel:${cvData.personalInfo.phone.replace(/\s/g, "")}`}
              className="hover:text-primary transition-colors"
              dir="ltr"
            >
              {cvData.personalInfo.phone}
            </a>
          </span>
        </div>

        {/* Contact Info - Mobile */}
        <div className="relative z-10 md:hidden space-y-2 text-sm text-gray-500 dark:text-gray-400">
          {/* <div className="flex items-center justify-center">
            <span>📍 {t("hero.available")}</span>
          </div> */}
          <div className="flex flex-col items-center space-y-1">
            <a
              href={`mailto:${cvData.personalInfo.email}`}
              className="hover:text-primary transition-colors flex items-center"
            >
              📧 {cvData.personalInfo.email}
            </a>
            <a
              href={`tel:${cvData.personalInfo.phone.replace(/\s/g, "")}`}
              className="hover:text-primary transition-colors flex items-center"
              dir="ltr"
            >
              📱 {cvData.personalInfo.phone}
            </a>
          </div>
        </div>
        </div>
    </motion.section>
  );
};

export default HeroComponent;
