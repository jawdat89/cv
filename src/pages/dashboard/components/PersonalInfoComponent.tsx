import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import SectionHeading from "@/components/ui/SectionHeading";
import { FaUser } from "react-icons/fa";

const PersonalInfoComponent: React.FC = () => {
  const { t, direction } = useI18n();

  const paragraphs = t("sections.personalInfo.paragraphs", {
    returnObjects: true,
  }) as string[];

  const valueTags = t("sections.personalInfo.valueTags", {
    returnObjects: true,
  }) as string[];

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

        <p className="mb-5 text-[1.2rem] font-medium leading-[1.8] text-brand-text max-sm:text-[1.05rem]">
          {t("sections.personalInfo.lead")}
        </p>

        <div className="space-y-[1.2rem]">
          {Array.isArray(paragraphs) &&
            paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 48)}
                className="text-base font-normal leading-[1.9] text-brand-muted"
              >
                {paragraph}
              </p>
            ))}
        </div>

        {Array.isArray(valueTags) && valueTags.length > 0 && (
          <ul
            className="mt-8 flex flex-wrap gap-2"
            aria-label={t("sections.personalInfo.valueTagsLabel")}
          >
            {valueTags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-brand-accent/30 bg-brand-accent/10 px-3 py-1 text-[0.85rem] font-semibold uppercase tracking-wider text-brand-accent"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </section>
  );
};

export default PersonalInfoComponent;
