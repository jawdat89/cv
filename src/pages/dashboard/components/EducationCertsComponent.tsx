import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { Card, Badge } from "@/components/ui";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaGraduationCap } from "react-icons/fa";

const EDUCATION_KEYS = ["atid", "ort"] as const;
const CERT_KEYS = ["sapEwm", "sapS4", "mcse", "ccna"] as const;

const EducationCertsComponent: React.FC = () => {
  const { t, direction } = useI18n();

  return (
    <section id="education" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="cv-section"
      >
        <SectionHeading
          icon={FaGraduationCap}
          title={t("sections.education.title")}
          direction={direction}
        />

        <div className="mb-10 space-y-4">
          {EDUCATION_KEYS.map((key) => (
            <Card key={key} hover={false} className="border-l-2 border-l-brand-accent/70">
              <h3 className="text-xl font-semibold text-brand-text">
                {t(`sections.education.${key}.degree`)}
              </h3>
              <p className="font-medium text-brand-accent">
                {t(`sections.education.${key}.institution`)}
              </p>
              <p className="mb-2 text-sm text-brand-muted">
                {t(`sections.education.${key}.dates`)}
              </p>
              <p className="text-brand-muted">
                {t(`sections.education.${key}.description`)}
              </p>
            </Card>
          ))}
        </div>

        <h3 className="mb-4 text-xl font-semibold text-brand-text">
          {t("sections.certifications.title")}
        </h3>
        <div className="flex flex-wrap gap-3">
          {CERT_KEYS.map((key) => (
            <Badge key={key} text={t(`sections.certifications.items.${key}`)} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default EducationCertsComponent;
