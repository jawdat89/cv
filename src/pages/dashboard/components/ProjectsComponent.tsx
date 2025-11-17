import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useI18n } from "@/hooks";
import { HtmlRenderer } from "@/utils/htmlRenderer";
import { RootState } from "@/store";
import { FaProjectDiagram } from "react-icons/fa";
import clsx from "clsx";

const ProjectsComponent: React.FC = () => {
  const { t, direction } = useI18n();
  const projects = useSelector((state: RootState) => state.cv.projects);
  
  return (
    <section id="projects" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="cv-section"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <FaProjectDiagram
            className={clsx(
              "w-6 h-6 text-primary",
              direction === "rtl" ? "ml-3" : "mr-3"
            )}
          />
          {t("sections.projects.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t(project.title)}
              </h3>
    
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                <HtmlRenderer content={t(project.description)} />
              </p>
    
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsComponent;
