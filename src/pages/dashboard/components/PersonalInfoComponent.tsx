import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaUser } from "react-icons/fa";

const PersonalInfoComponent: React.FC = () => {
  const { t, direction } = useI18n();

  return (
    <section id="personal" className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="cv-section mx-auto max-w-3xl"
      >
        <SectionHeading
          icon={FaUser}
          title={t("sections.personalInfo.title")}
          direction={direction}
        />
        <p className="text-lg leading-relaxed text-brand-text">
          {t("sections.personalInfo.summary")}
        </p>
      </motion.div>
    </section>
  );
};

export default PersonalInfoComponent;
