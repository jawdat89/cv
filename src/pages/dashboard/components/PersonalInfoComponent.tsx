import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { FaUser } from "react-icons/fa";
import clsx from "clsx";

const PersonalInfoComponent: React.FC = () => {
  const { t, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);

  return (
    <section id="personal" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cv-section"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaUser
            className={clsx(
              "w-6 h-6 text-primary",
              direction === "rtl" ? "ml-3" : "mr-3"
            )}
          />
          {t("sections.personalInfo.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("sections.personalInfo.aboutMe")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("sections.personalInfo.summary")}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t("sections.personalInfo.contactDetails")}
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>
                📧{" "}
                <a
                  href={`mailto:${cvData.personalInfo.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {cvData.personalInfo.email}
                </a>
              </p>
              <p>
                📱{" "}
                <a
                  href={`tel:${cvData.personalInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-primary transition-colors"
                  dir="ltr"
                >
                  {cvData.personalInfo.phone}
                </a>
              </p>
              <p>📍 {cvData.personalInfo.address}</p>
              <p>
                🔗{" "}
                <a
                  href={`https://www.${cvData.personalInfo.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {cvData.personalInfo.linkedin}
                </a>
              </p>
              <p>
                💻{" "}
                <a
                  href={`https://www.${cvData.personalInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {cvData.personalInfo.website}
                </a>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default PersonalInfoComponent;
