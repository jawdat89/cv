import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { Badge } from "@/components/ui";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaLanguage } from "react-icons/fa";

const LanguagesComponent: React.FC = () => {
  const { t, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);

  return (
    <section id="languages" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="cv-section"
      >
        <SectionHeading
          icon={FaLanguage}
          title={t("sections.languages.title")}
          direction={direction}
        />

        <div className="flex flex-wrap gap-3">
          {cvData.languages.map((lang) => (
            <Badge
              key={lang.id}
              text={`${t(`languageNames.${lang.name}`) || lang.name} — ${t(`proficiencyLevels.${lang.proficiency}`) || lang.proficiency}`}
              variant="gray"
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LanguagesComponent;
