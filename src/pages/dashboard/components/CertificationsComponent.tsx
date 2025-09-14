import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { FaCertificate } from "react-icons/fa";
import clsx from "clsx";

const CertificationsComponent: React.FC = () => {
  const { t, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);

  return (
    <section id="certifications" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cv-section"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaCertificate
            className={clsx(
              "w-6 h-6 text-primary",
              direction === "rtl" ? "ml-3" : "mr-3"
            )}
          />
          {t("sections.certifications.title")}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {cvData.certifications.map((cert, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {cert.name}
              </h3>
              <p className="text-primary font-medium mb-2">{cert.issuer}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                {cert.date}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CertificationsComponent;
