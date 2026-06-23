import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { Badge, Card } from "@/components/ui";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaGithub, FaProjectDiagram } from "react-icons/fa";

const ProjectsComponent: React.FC = () => {
  const { t, direction } = useI18n();
  const projects = useSelector((state: RootState) => state.cv.projects);
  const featuredProjects = projects.filter((p) => p.featured);

  const hasTranslation = (key: string) => t(key) !== key;

  return (
    <section id="projects" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="cv-section"
      >
        <SectionHeading
          icon={FaProjectDiagram}
          title={t("sections.projects.title")}
          subtitle={t("sections.projects.intro")}
          direction={direction}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredProjects.map((project) => {
            const baseKey = `sections.projects.${project.id}`;
            const problemKey = `${baseKey}.problem`;
            const solutionKey = `${baseKey}.solution`;
            const outcomeKey = `${baseKey}.outcome`;

            return (
              <Card key={project.id} className="flex h-full flex-col">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold text-brand-text">
                    {t(project.title)}
                  </h3>
                  {project.githubLink && (
                    <Badge
                      text={t("sections.projects.openSource")}
                      variant="teal"
                    />
                  )}
                </div>

                <div className="mb-4 flex-grow space-y-3 text-sm leading-relaxed text-brand-muted">
                  {hasTranslation(problemKey) && (
                    <p>
                      <span className="font-medium text-brand-text">
                        {t("sections.projects.problemLabel")}:{" "}
                      </span>
                      {t(problemKey)}
                    </p>
                  )}
                  {hasTranslation(solutionKey) && (
                    <p>
                      <span className="font-medium text-brand-text">
                        {t("sections.projects.solutionLabel")}:{" "}
                      </span>
                      {t(solutionKey)}
                    </p>
                  )}
                  {hasTranslation(outcomeKey) && (
                    <p>
                      <span className="font-medium text-brand-accent">
                        {t("sections.projects.outcomeLabel")}:{" "}
                      </span>
                      {t(outcomeKey)}
                    </p>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <Badge key={tech} text={tech} variant="gray" />
                  ))}
                </div>
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("sections.projects.viewCode")}: ${t(project.title)}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent transition-colors hover:text-brand-accent-hover"
                  >
                    <FaGithub className="h-4 w-4" aria-hidden />
                    {t("sections.projects.viewCode")}
                  </a>
                )}
              </Card>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsComponent;
