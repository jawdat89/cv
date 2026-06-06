import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { Card } from "@/components/ui";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaBriefcase } from "react-icons/fa";

const EXPERIENCE_KEYS = [
  "strauss",
  "besttuqay",
  "innovisec",
  "strauss_tech",
  "qualitest",
] as const;

const ExperienceComponent: React.FC = () => {
  const { t, direction } = useI18n();

  return (
    <section id="experience" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="cv-section"
      >
        <SectionHeading
          icon={FaBriefcase}
          title={t("sections.experience.title")}
          subtitle={t("sections.experience.intro")}
          direction={direction}
        />

        <div className="space-y-6">
          {EXPERIENCE_KEYS.map((key) => {
            const bullets = t(`sections.experience.${key}.bullets`, {
              returnObjects: true,
            }) as string[];

            return (
              <Card
                key={key}
                hover={false}
                className="border-l-2 border-l-brand-accent/70"
              >
                <h3 className="text-xl font-semibold text-brand-text">
                  {t(`sections.experience.${key}.title`)}
                </h3>
                <p className="font-medium text-brand-accent">
                  {t(`sections.experience.${key}.company`)}
                </p>
                <p className="mb-3 text-sm text-brand-muted">
                  {t(`sections.experience.${key}.dates`)}
                </p>
                <ul className="list-disc space-y-2 pl-5 text-brand-muted">
                  {Array.isArray(bullets) &&
                    bullets.map((bullet) => (
                      <li key={bullet} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceComponent;
