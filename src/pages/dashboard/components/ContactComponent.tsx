import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { normalizeExternalUrl } from "@/utils/url";
import { LOCATION_PAGE_PATH } from "@/utils/googleMaps";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { Link, Section } from "@/components/ui";
import CVDownloadSelect from "@/components/CVDownloadSelect";
import clsx from "clsx";

const ContactComponent: React.FC = () => {
  const { t, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);

  const contactLinks = [
    {
      icon: FaEnvelope,
      label: cvData.personalInfo.email,
      href: `mailto:${cvData.personalInfo.email}`,
      ariaLabel: `Email ${cvData.personalInfo.email}`,
    },
    {
      icon: FaPhone,
      label: cvData.personalInfo.phone,
      href: `tel:${cvData.personalInfo.phone.replace(/\s/g, "")}`,
      ariaLabel: `Phone ${cvData.personalInfo.phone}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: cvData.personalInfo.address,
      href: LOCATION_PAGE_PATH,
      ariaLabel: `Location ${cvData.personalInfo.address}`,
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: normalizeExternalUrl(cvData.personalInfo.linkedin),
      ariaLabel: "LinkedIn profile",
      external: true,
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: normalizeExternalUrl(cvData.personalInfo.website),
      ariaLabel: "GitHub profile",
      external: true,
    },
  ];

  return (
    <Section id="contact" spacing="large">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="mb-4 text-3xl font-bold text-brand-text">
          {t("contact.title")}
        </h2>
        <p className="mb-10 text-base leading-relaxed text-brand-muted">
          {t("contact.subtitle")}
        </p>

        <div
          className={clsx(
            "mb-8 flex flex-wrap items-center justify-center gap-6",
            direction === "rtl" && "flex-row-reverse"
          )}
        >
          {contactLinks.map(({ icon: Icon, label, href, ariaLabel, external }) =>
            href ? (
              <Link
                key={label}
                to={href}
                external={external}
                ariaLabel={ariaLabel}
                className="inline-flex min-h-[44px] items-center gap-2 text-brand-muted transition-colors duration-150 hover:text-brand-accent"
                dir={Icon === FaPhone ? "ltr" : undefined}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                <span>{label}</span>
              </Link>
            ) : (
              <span
                key={label}
                className="inline-flex min-h-[44px] items-center gap-2 text-brand-muted"
                aria-label={ariaLabel}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                <span>{label}</span>
              </span>
            )
          )}
        </div>

        <div className="flex justify-center">
          <CVDownloadSelect />
        </div>
      </motion.div>
    </Section>
  );
};

export default ContactComponent;
