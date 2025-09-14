import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import clsx from "clsx";

interface HeroProps {
  onImageClick: () => void;
}

const HeroComponent: React.FC<HeroProps> = ({ onImageClick }) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-16"
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
        <div
          className={clsx(
            "flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6",
            direction === "rtl"
              ? "sm:space-x-reverse sm:space-x-6"
              : "sm:space-x-6"
          )}
        >
          <img
            src="/images/IMG-20241010-WA0030.jpg"
            alt={getLocalizedName()}
            className={clsx(
              "w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center border-4 border-primary shadow-lg transform -translate-y-2 cursor-pointer hover:scale-105 transition-transform mb-4 sm:mb-0",
              direction === "rtl" ? "sm:translate-x-5" : "sm:-translate-x-5"
            )}
            style={{ objectPosition: "center 30%" }}
            onClick={onImageClick}
            title="Click to view full size"
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
            {getLocalizedName()}
          </h1>
        </div>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 text-center">
          {t("hero.title")}
        </p>

        {/* Employers Section */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          {/* Current Employer */}
          <div
            className={clsx(
              "flex items-center bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg",
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
              "flex items-center bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg opacity-75",
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
        </div>

        {/* Contact Info - Desktop */}
        <div
          className={clsx(
            "hidden md:flex justify-center text-sm text-gray-500 dark:text-gray-400",
            direction === "rtl" ? "space-x-reverse space-x-6" : "space-x-6"
          )}
        >
          <span>📍 {t("hero.available")}</span>
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
        <div className="md:hidden space-y-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-center">
            <span>📍 {t("hero.available")}</span>
          </div>
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
