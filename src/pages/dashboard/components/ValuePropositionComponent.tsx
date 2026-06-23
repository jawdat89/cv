import React from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { FaBuilding, FaCogs, FaIndustry } from "react-icons/fa";
import { Card, Section } from "@/components/ui";
import clsx from "clsx";

const cards = [
  {
    key: "businessSystems",
    icon: FaBuilding,
  },
  {
    key: "sapLogistics",
    icon: FaCogs,
  },
  {
    key: "automationMindset",
    icon: FaIndustry,
  },
];

const ValuePropositionComponent: React.FC = () => {
  const { t, direction } = useI18n();

  return (
    <Section
      id="value-proposition"
      title={t("valueProposition.title")}
      subtitle={t("valueProposition.intro")}
    >
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        dir={direction}
      >
        {cards.map(({ key, icon: Icon }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Card className="h-full">
              <Icon
                className={clsx(
                  "mb-4 h-6 w-6 text-brand-accent",
                  direction === "rtl" ? "ms-auto" : ""
                )}
                aria-hidden
              />
              <h3 className="mb-3 text-start text-lg font-semibold text-brand-text">
                {t(`valueProposition.cards.${key}.title`)}
              </h3>
              <p className="text-start leading-relaxed text-brand-muted">
                {t(`valueProposition.cards.${key}.description`)}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default ValuePropositionComponent;
