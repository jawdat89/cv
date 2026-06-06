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
            const outcomeKey = `sections.projects.${project.id}.outcome`;

            return (
              <Card key={project.id} className="flex h-full flex-col">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-semibold text-brand-text">
                    {t(project.title)}
                  </h3>
                  {project.githubLink && (
                    <Badge
                      text={t("sections.projects.openSource")}
                      variant="teal"
                    />
                  )}
                </div>
                <p className="mb-4 flex-grow text-sm leading-relaxed text-brand-muted">
                  {t(project.description)}
                </p>
                {t(outcomeKey) !== outcomeKey && (
                  <p className="mb-4 text-sm font-medium text-brand-accent">
                    {t(outcomeKey)}
                  </p>
                )}
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
