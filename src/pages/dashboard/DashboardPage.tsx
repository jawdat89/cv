import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { setTheme } from "@/store/cvSlice";
import LanguageSelector from "@/components/LanguageSelector";
import CVDownloadSelect from "@/components/CVDownloadSelect";
import clsx from "clsx";
import { Link } from "@/components/ui";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import HeroComponent from "./components/HeroComponent";
import ValuePropositionComponent from "./components/ValuePropositionComponent";
import PersonalInfoComponent from "./components/PersonalInfoComponent";
import ExperienceComponent from "./components/ExperienceComponent";
import EducationCertsComponent from "./components/EducationCertsComponent";
import SkillsComponent from "./components/SkillsComponent";
import ProjectsComponent from "./components/ProjectsComponent";
import LanguagesComponent from "./components/LanguagesComponent";
import ContactComponent from "./components/ContactComponent";
import RelaxingDropsBackground from "@/components/RelaxingDropsBackground";

const SECTION_IDS = [
  "value-proposition",
  "personal",
  "projects",
  "experience",
  "skills",
  "education",
  "languages",
  "contact",
] as const;

const Dashboard: React.FC = () => {
  const { t, currentLanguage, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("value-proposition");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLocalizedName = () => {
    switch (currentLanguage) {
      case "ar":
        return `${cvData.personalInfo.firstNameAr} ${cvData.personalInfo.lastNameAr}`;
      case "he":
        return `${cvData.personalInfo.firstNameHe} ${cvData.personalInfo.lastNameHe}`;
      default:
        return `${cvData.personalInfo.firstName} ${cvData.personalInfo.lastName}`;
    }
  };

  const sections = [
    { id: "value-proposition", title: t("navigation.valueProposition") },
    { id: "personal", title: t("navigation.personalInfo") },
    { id: "projects", title: t("navigation.projects") },
    { id: "experience", title: t("navigation.experience") },
    { id: "skills", title: t("navigation.expertise") },
    { id: "education", title: t("navigation.education") },
    { id: "languages", title: t("navigation.languages") },
    { id: "contact", title: t("navigation.contact") },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentLanguage]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const toggleTheme = () => {
    const newTheme = cvData.theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="relative min-h-screen">
      <RelaxingDropsBackground theme={cvData.theme} />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-layer-overlay focus:rounded-lg focus:bg-brand-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>

      <nav
        className="layer-nav border-b border-brand-border/50 bg-brand-bg/75 backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-lg font-bold text-brand-text sm:text-xl"
              >
                {getLocalizedName()}
              </button>
              <div
                className={clsx(
                  "ml-8 hidden lg:flex",
                  direction === "rtl"
                    ? "mr-4 space-x-reverse space-x-1"
                    : "space-x-1"
                )}
              >
                {sections.map((section) => (
                  <React.Fragment key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className={clsx(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150",
                        activeSection === section.id
                          ? "bg-brand-accent/15 text-brand-accent"
                          : "text-brand-muted hover:bg-brand-elevated/50 hover:text-brand-text"
                      )}
                    >
                      {section.title}
                    </button>
                    {section.id === "projects" && (
                      <Link
                        to="/articles"
                        className="rounded-md px-3 py-2 text-sm font-medium text-brand-muted transition-colors duration-150 hover:bg-brand-elevated/50 hover:text-brand-text"
                      >
                        {t("navigation.articles")}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div
              className={clsx(
                "hidden items-center md:flex",
                direction === "rtl" ? "space-x-reverse space-x-3" : "space-x-3"
              )}
            >
              <LanguageSelector />
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border/50 bg-brand-surface text-brand-muted transition-colors hover:text-brand-accent"
                aria-label={
                  cvData.theme === "light"
                    ? t("actions.switchToDark")
                    : t("actions.switchToLight")
                }
              >
                {cvData.theme === "light" ? (
                  <FaMoon className="h-4 w-4" />
                ) : (
                  <FaSun className="h-4 w-4" />
                )}
              </button>
              <CVDownloadSelect />
            </div>

            <div className="flex items-center space-x-2 md:hidden">
              <LanguageSelector />
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-bg text-brand-muted"
                aria-label={
                  cvData.theme === "light"
                    ? t("actions.switchToDark")
                    : t("actions.switchToLight")
                }
              >
                {cvData.theme === "light" ? (
                  <FaMoon className="h-4 w-4" />
                ) : (
                  <FaSun className="h-4 w-4" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-bg text-brand-muted"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-5 w-5" />
                ) : (
                  <FaBars className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="border-t border-brand-border/50 md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {sections.map((section) => (
                  <React.Fragment key={section.id}>
                    <button
                      onClick={() => {
                        scrollToSection(section.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={clsx(
                        "w-full rounded-md px-3 py-2 text-left text-base font-medium transition-colors",
                        activeSection === section.id
                          ? "bg-brand-accent/15 text-brand-accent"
                          : "text-brand-muted hover:bg-brand-elevated/50 hover:text-brand-text"
                      )}
                    >
                      {section.title}
                    </button>
                    {section.id === "projects" && (
                      <Link
                        to="/articles"
                        className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-brand-muted transition-colors hover:bg-brand-elevated/50 hover:text-brand-text"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {t("navigation.articles")}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
                <div className="pb-2 pt-4">
                  <CVDownloadSelect />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main id="main-content" className="layer-content">
        <HeroComponent />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ValuePropositionComponent />
          <PersonalInfoComponent />
          <ProjectsComponent />
          <ExperienceComponent />
          <SkillsComponent />
          <EducationCertsComponent />
          <LanguagesComponent />
          <ContactComponent />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
