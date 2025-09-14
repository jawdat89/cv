import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { FaGraduationCap } from "react-icons/fa";
import clsx from "clsx";

const EducationComponent: React.FC = () => {
  const { t, direction } = useI18n();

  return (
    <section id="education" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cv-section"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaGraduationCap
            className={clsx(
              "w-6 h-6 text-primary",
              direction === "rtl" ? "ml-3" : "mr-3"
            )}
          />
          {t("sections.education.title")}
        </h2>
        <div className="space-y-6">
          {/* Atid Maloot Education */}
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("sections.education.atid.degree")}
            </h3>
            <p className="text-primary font-medium">
              {t("sections.education.atid.institution")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              2025 - {t("sections.experience.present")}
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {t("sections.education.atid.description")}
            </p>
          </div>

          {/* Ort Braude Education */}
          <div className="border-l-4 border-primary pl-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("sections.education.ort.degree")}
            </h3>
            <p className="text-primary font-medium">
              {t("sections.education.ort.institution")}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              2015 - 2018
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              {t("sections.education.ort.description")}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default EducationComponent;
