import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { AnimatedProgressBar } from "@/components/AnimatedProgressBar";
import { FaCode } from "react-icons/fa";
import clsx from "clsx";

const SkillsComponent: React.FC = () => {
  const { t, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);

  return (
    <section id="skills" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cv-section"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaCode
            className={clsx(
              "w-6 h-6 text-primary",
              direction === "rtl" ? "ml-3" : "mr-3"
            )}
          />
          {t("sections.skills.title")}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {Object.entries(
            cvData.skills.reduce((acc, skill) => {
              if (!acc[skill.category]) acc[skill.category] = [];
              acc[skill.category].push(skill);
              return acc;
            }, {} as Record<string, typeof cvData.skills>)
          ).map(([category, skills]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t(
                  `skillCategories.${
                    category === "Version Control"
                      ? "versionControl"
                      : category === "DevOps"
                      ? "devOps"
                      : category.toLowerCase()
                  }`
                ) || category}
              </h3>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <AnimatedProgressBar
                    key={index}
                    value={skill.proficiency}
                    label={skill.name}
                    showPercentage={true}
                    className="mb-2"
                    barClassName="bg-gradient-to-r from-primary to-primary-dark"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsComponent;
