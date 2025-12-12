import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useI18n } from "@/hooks";
import { RootState } from "@/store";
import { setTheme } from "@/store/cvSlice";
import { motion } from "framer-motion";
import LanguageSelector from "@/components/LanguageSelector";
import CVDownloadSelect from "@/components/CVDownloadSelect";
import { HtmlRenderer } from "@/utils/htmlRenderer";
import { AnimatedProgressBar } from "@/components/AnimatedProgressBar";
import clsx from "clsx";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaProjectDiagram,
  FaCertificate,
  FaLanguage,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
} from "react-icons/fa";

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

  const projects = useSelector((state: RootState) => state.cv.projects);

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6 lg:p-8">
            <div
              className={clsx(
                "flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6",
                direction === "rtl"
                  ? "sm:space-x-reverse sm:space-x-6"
                  : "sm:space-x-6"
              )}
            >
              <img
                src="/images/IMG-20241010-WA0030.jpg"
                alt={getLocalizedName()}
                className={clsx(
                  "w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-center border-4 border-primary shadow-lg transform -translate-y-2 mb-4 sm:mb-0",
                  direction === "rtl" ? "sm:translate-x-5" : "sm:-translate-x-5"
                )}
                style={{ objectPosition: "center 30%" }}
              />
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
                {getLocalizedName()}
              </h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 text-center">
              {t("hero.title")}
            </p>

            {/* Employers Section */}
            <div className="flex flex-col items-center space-y-3 mb-6">
              {/* Current Employer */}
              <div
                className={clsx(
                  "flex items-center bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg",
                  direction === "rtl"
                    ? "space-x-reverse space-x-3"
                    : "space-x-3"
                )}
              >
                <img
                  src="/logos/Strauss_Group_Logo.png"
                  alt="Strauss Group Logo"
                  className="h-8 w-auto object-contain"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("hero.employer1")}
                </span>
              </div>

              {/* Previous Employer */}
              <div
                className={clsx(
                  "flex items-center bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-lg opacity-75",
                  direction === "rtl"
                    ? "space-x-reverse space-x-3"
                    : "space-x-3"
                )}
              >
                <img
                  src="/logos/BestTuqay.png"
                  alt="BestTuqay Logo"
                  className="h-8 w-auto object-contain"
                />
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {t("hero.employer2")}
                </span>
              </div>
            </div>

            {/* Contact Info - Desktop */}
            <div
              className={clsx(
                "hidden md:flex justify-center text-sm text-gray-500 dark:text-gray-400",
                direction === "rtl" ? "space-x-reverse space-x-6" : "space-x-6"
              )}
            >
              {/* <span>📍 {t("hero.available")}</span> */}
              <span>
                📧{" "}
                <a
                  href={`mailto:${cvData.personalInfo.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {cvData.personalInfo.email}
                </a>
              </span>
              <span>
                📱{" "}
                <a
                  href={`tel:${cvData.personalInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-primary transition-colors"
                  dir="ltr"
                >
                  {cvData.personalInfo.phone}
                </a>
              </span>
            </div>

            {/* Contact Info - Mobile */}
            <div className="md:hidden space-y-2 text-sm text-gray-500 dark:text-gray-400">
              {/* <div className="flex items-center justify-center">
                <span>📍 {t("hero.available")}</span>
              </div> */}
              <div className="flex flex-col items-center space-y-1">
                <a
                  href={`mailto:${cvData.personalInfo.email}`}
                  className="hover:text-primary transition-colors flex items-center"
                >
                  📧 {cvData.personalInfo.email}
                </a>
                <a
                  href={`tel:${cvData.personalInfo.phone.replace(/\s/g, "")}`}
                  className="hover:text-primary transition-colors flex items-center"
                  dir="ltr"
                >
                  📱 {cvData.personalInfo.phone}
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Personal Information Section */}
        <section id="personal" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cv-section"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaUser
                className={clsx(
                  "w-6 h-6 text-primary",
                  direction === "rtl" ? "ml-3" : "mr-3"
                )}
              />
              {t("sections.personalInfo.title")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("sections.personalInfo.aboutMe")}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  <HtmlRenderer content={t("sections.personalInfo.summary")} />
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t("sections.personalInfo.contactDetails")}
                </h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>
                    📧{" "}
                    <a
                      href={`mailto:${cvData.personalInfo.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {cvData.personalInfo.email}
                    </a>
                  </p>
                  <p>
                    📱{" "}
                    <a
                      href={`tel:${cvData.personalInfo.phone.replace(
                        /\s/g,
                        ""
                      )}`}
                      className="hover:text-primary transition-colors"
                      dir="ltr"
                    >
                      {cvData.personalInfo.phone}
                    </a>
                  </p>
                  <p>📍 {cvData.personalInfo.address}</p>
                  <p>
                    🔗{" "}
                    <a
                      href={`https://www.${cvData.personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {cvData.personalInfo.linkedin}
                    </a>
                  </p>
                  <p>
                    💻{" "}
                    <a
                      href={`https://www.${cvData.personalInfo.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {cvData.personalInfo.website}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-16">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cv-section"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaBriefcase
                className={clsx(
                  "w-6 h-6 text-primary",
                  direction === "rtl" ? "ml-3" : "mr-3"
                )}
              />
              {t("sections.experience.title")}
            </h2>
            <div className="space-y-6">
              {/* Strauss Group Experience */}
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("sections.experience.strauss.title")}
                </h3>
                <p className="text-primary font-medium">
                  {t("sections.experience.strauss.company")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  2025 - {t("sections.experience.present")}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <HtmlRenderer content={t("sections.experience.strauss.description")} />
                </p>
              </div>

              {/* BestTuqay Experience */}
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("sections.experience.besttuqay.title")}
                </h3>
                <p className="text-primary font-medium">
                  {t("sections.experience.besttuqay.company")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  2024 - {t("sections.experience.present")}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <HtmlRenderer content={t("sections.experience.besttuqay.description")} />
                </p>
              </div>

              {/* Innovisec Experience */}
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("sections.experience.innovisec.title")}
                </h3>
                <p className="text-primary font-medium">
                  {t("sections.experience.innovisec.company")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  2019 - 2024
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <HtmlRenderer content={t("sections.experience.innovisec.description")} />
                </p>
              </div>

              {/* Strauss Technical Support Experience */}
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("sections.experience.strauss_tech.title")}
                </h3>
                <p className="text-primary font-medium">
                  {t("sections.experience.strauss_tech.company")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  2015 - 2018
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <HtmlRenderer content={t("sections.experience.strauss_tech.description")} />
                </p>
              </div>

              {/* Qualitest Experience */}
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("sections.experience.qualitest.title")}
                </h3>
                <p className="text-primary font-medium">
                  {t("sections.experience.qualitest.company")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  2010 - 2015
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <HtmlRenderer content={t("sections.experience.qualitest.description")} />
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cv-section"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaGraduationCap
                className={clsx(
                  "w-6 h-6 text-primary",
                  direction === "rtl" ? "ml-3" : "mr-3"
                )}
              />
              {t("sections.education.title")}
            </h2>
            <div className="space-y-6">
              {/* Atid Maloot Education */}
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("sections.education.atid.degree")}
                </h3>
                <p className="text-primary font-medium">
                  {t("sections.education.atid.institution")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  2025 - {t("sections.experience.present")}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("sections.education.atid.description")}
                </p>
              </div>


              {/* Ort Braude Education */}
              <div className="border-l-4 border-primary pl-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("sections.education.ort.degree")}
                </h3>
                <p className="text-primary font-medium">
                  {t("sections.education.ort.institution")}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  2015 - 2018
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t("sections.education.ort.description")}
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="cv-section"
            >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaCode
                className={clsx(
                  "w-6 h-6 text-primary",
                  direction === "rtl" ? "ml-3" : "mr-3"
                )}
              />
              {t("sections.skills.title")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {Object.entries(
                cvData.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof cvData.skills>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t(
                      `skillCategories.${
                        category === "Version Control"
                          ? "versionControl"
                          : category === "DevOps"
                          ? "devOps"
                          : category.toLowerCase()
                      }`
                    ) || category}
                  </h3>
                  <div className="space-y-4">
                    {skills.map((skill, index) => (
                      <AnimatedProgressBar
                        key={index}
                        value={skill.proficiency}
                        label={skill.name}
                        showPercentage={true}
                        className="mb-2"
                        barClassName="bg-gradient-to-r from-primary to-primary-dark"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cv-section"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaProjectDiagram
                className={clsx(
                  'w-6 h-6 text-primary',
                  direction === 'rtl' ? 'ml-3' : 'mr-3'
                )}
              />
              {t('sections.projects.title')}
            </h2>
        
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t(`sections.projects.${project.id}.title`)}
                  </h3>
        
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                    <HtmlRenderer content={t(`sections.projects.${project.id}.description`)} />
                  </p>
        
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cv-section"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaCertificate
                className={clsx(
                  "w-6 h-6 text-primary",
                  direction === "rtl" ? "ml-3" : "mr-3"
                )}
              />
              {t("sections.certifications.title")}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {cvData.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {cert.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Languages Section */}
        <section id="languages" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="cv-section"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaLanguage
                className={clsx(
                  "w-6 h-6 text-primary",
                  direction === "rtl" ? "ml-3" : "mr-3"
                )}
              />
              {t("sections.languages.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {cvData.languages.map((lang, index) => (
                <div
                  key={index}
                  className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {t(`languageNames.${lang.name}`) || lang.name}
                  </h3>
                  <p className="text-sm text-primary font-medium leading-tight">
                    {t(`proficiencyLevels.${lang.proficiency}`) || lang.proficiency}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
