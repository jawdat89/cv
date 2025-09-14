import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { HtmlRenderer } from "@/utils/htmlRenderer";
import { FaProjectDiagram } from "react-icons/fa";
import clsx from "clsx";

const ProjectsComponent: React.FC = () => {
  const { t, direction } = useI18n();

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
          {/* iPresent Project */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("sections.projects.ipresent.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
              <HtmlRenderer content={t("sections.projects.ipresent.description")} />
            </p>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {[
                "WPF",
                "C#",
                "Entity Framework",
                "SQL Server",
                "WebView2",
                "MahApps.Metro",
                "NLog",
              ].map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* iManage Project */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("sections.projects.imanage.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <HtmlRenderer content={t("sections.projects.imanage.description")} />
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                ".NET Core",
                "C#",
                "Entity Framework Core",
                "SQL Server",
                "React",
                "TypeScript",
                "Business Logic",
                "Reporting",
              ].map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* GoFresh Project */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("sections.projects.gofresh.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <HtmlRenderer content={t("sections.projects.gofresh.description")} />
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Azure Functions",
                "TypeScript",
                "Node.js",
                "Sanity.io",
                "Serverless",
                "CORS",
                "Menu Management",
              ].map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ASend Project */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("sections.projects.asend.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <HtmlRenderer content={t("sections.projects.asend.description")} />
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Supabase",
                "React",
                "TypeScript",
                "Database",
                "Automation",
                "Card Templates",
                "Real-time",
              ].map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* myShop Project */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {t("sections.projects.myshop.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              <HtmlRenderer content={t("sections.projects.myshop.description")} />
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Node.js",
                "React",
                "PWA",
                "API Development",
                "Modern Architecture",
                "Web Development",
                "Desktop Application",
                "Cross-platform",
              ].map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsComponent;
