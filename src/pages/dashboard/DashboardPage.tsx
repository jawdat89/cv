import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { setTheme } from "@/store/cvSlice";
import LanguageSelector from "@/components/LanguageSelector";
import CVDownloadSelect from "@/components/CVDownloadSelect";
import clsx from "clsx";
import { FaUser, FaBriefcase, FaGraduationCap, FaCode, FaProjectDiagram, FaLanguage, FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import HeroComponent from "./components/HeroComponent";
import PersonalInfoComponent from "./components/PersonalInfoComponent";
import ExperienceComponent from "./components/ExperienceComponent";
import EducationComponent from "./components/EducationComponent";
import SkillsComponent from "./components/SkillsComponent";
import ProjectsComponent from "./components/ProjectsComponent";
import CertificationsComponent from "./components/CertificationsComponent";
import LanguagesComponent from "./components/LanguagesComponent";

const Dashboard: React.FC = () => {
  const { t, currentLanguage, direction } = useI18n();
  const cvData = useSelector((state: RootState) => state.cv);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("personal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to get the appropriate name based on current language
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
    { id: "personal", title: t("navigation.personalInfo"), icon: FaUser },
    { id: "experience", title: t("navigation.experience"), icon: FaBriefcase },
    {
      id: "education",
      title: t("navigation.education"),
      icon: FaGraduationCap,
    },
    { id: "skills", title: t("navigation.expertise"), icon: FaCode },
    { id: "projects", title: t("navigation.projects"), icon: FaProjectDiagram },
    { id: "languages", title: t("navigation.languages"), icon: FaLanguage },
  ];

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
    // Also update the document class for immediate effect
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/40 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                {getLocalizedName()}
              </h1>
              {/* Desktop Navigation */}
              <div
                className={clsx(
                  "hidden lg:flex ml-8",
                  direction === "rtl"
                    ? "space-x-reverse space-x-1 mr-4"
                    : "space-x-1"
                )}
              >
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Actions */}
            <div
              className={clsx(
                "hidden md:flex items-center",
                direction === "rtl" ? "space-x-reverse space-x-3" : "space-x-3"
              )}
            >
              <LanguageSelector />
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title={
                  cvData.theme === "light"
                    ? t("actions.switchToDark")
                    : t("actions.switchToLight")
                }
              >
                {cvData.theme === "light" ? (
                  <FaMoon className="w-4 h-4" />
                ) : (
                  <FaSun className="w-4 h-4" />
                )}
              </button>
              <CVDownloadSelect />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <LanguageSelector />
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {cvData.theme === "light" ? (
                  <FaMoon className="w-4 h-4" />
                ) : (
                  <FaSun className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-white"
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
                <div className="pt-4 pb-2">
                  <CVDownloadSelect />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroComponent />
        <PersonalInfoComponent />
        <ExperienceComponent />
        <EducationComponent />
        <SkillsComponent />
        <ProjectsComponent />
        <CertificationsComponent />
        <LanguagesComponent />
      </div>
    </div>
  );
};

export default Dashboard;
