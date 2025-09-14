import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { HtmlRenderer } from "@/utils/htmlRenderer";
import { FaBriefcase } from "react-icons/fa";
import clsx from "clsx";

const ExperienceComponent: React.FC = () => {
  const { t, direction } = useI18n();

  return (
    <section id="experience" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cv-section"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaBriefcase
            className={clsx(
              "w-6 h-6 text-primary",
              direction === "rtl" ? "ml-3" : "mr-3"
            )}
          />
          {t("sections.experience.title")}
        </h2>
        <div className="space-y-6">
          {/* Strauss Group Experience */}
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("sections.experience.strauss.title")}
            </h3>
            <p className="text-primary font-medium">
              {t("sections.experience.strauss.company")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              2025 - {t("sections.experience.present")}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <HtmlRenderer content={t("sections.experience.strauss.description")} />
            </p>
          </div>

          {/* BestTuqay Experience */}
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("sections.experience.besttuqay.title")}
            </h3>
            <p className="text-primary font-medium">
              {t("sections.experience.besttuqay.company")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              2024 - {t("sections.experience.present")}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <HtmlRenderer content={t("sections.experience.besttuqay.description")} />
            </p>
          </div>

          {/* Innovisec Experience */}
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("sections.experience.innovisec.title")}
            </h3>
            <p className="text-primary font-medium">
              {t("sections.experience.innovisec.company")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              2019 - 2024
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <HtmlRenderer content={t("sections.experience.innovisec.description")} />
            </p>
          </div>

          {/* Strauss Technical Support Experience */}
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("sections.experience.strauss_tech.title")}
            </h3>
            <p className="text-primary font-medium">
              {t("sections.experience.strauss_tech.company")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              2015 - 2018
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <HtmlRenderer content={t("sections.experience.strauss_tech.description")} />
            </p>
          </div>

          {/* Qualitest Experience */}
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("sections.experience.qualitest.title")}
            </h3>
            <p className="text-primary font-medium">
              {t("sections.experience.qualitest.company")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              2010 - 2015
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <HtmlRenderer content={t("sections.experience.qualitest.description")} />
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceComponent;
