import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { FaLanguage } from "react-icons/fa";
import clsx from "clsx";

const LanguagesComponent: React.FC = () => {
  const { t, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);

  return (
    <section id="languages" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cv-section"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaLanguage
            className={clsx(
              "w-6 h-6 text-primary",
              direction === "rtl" ? "ml-3" : "mr-3"
            )}
          />
          {t("sections.languages.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cvData.languages.map((lang, index) => (
            <div
              key={index}
              className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t(`languageNames.${lang.name}`) || lang.name}
              </h3>
              <p className="text-sm text-primary font-medium leading-tight">
                {t(`proficiencyLevels.${lang.proficiency}`) || lang.proficiency}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LanguagesComponent;
