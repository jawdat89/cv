import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { Badge, Card } from "@/components/ui";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaCode } from "react-icons/fa";

const SKILL_GROUP_KEYS = [
  "frontend",
  "backend",
  "database",
  "cloud",
  "dataAnalysis",
  "design",
  "sapErp",
  "automation",
] as const;

const SkillsComponent: React.FC = () => {
  const { t, direction } = useI18n();

  return (
    <section id="skills" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="cv-section"
      >
        <SectionHeading
          icon={FaCode}
          title={t("sections.skills.title")}
          subtitle={t("sections.skills.intro")}
          direction={direction}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {SKILL_GROUP_KEYS.map((groupKey) => {
            const skills = t(`skillGroups.${groupKey}`, {
              returnObjects: true,
            }) as string[];

            return (
              <Card key={groupKey} hover={false}>
                <h3 className="mb-4 text-lg font-semibold text-brand-text">
                  {t(`skillCategories.${groupKey}`)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(skills) &&
                    skills.map((skill) => (
                      <Badge key={skill} text={skill} />
                    ))}
                </div>
              </Card>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsComponent;
