import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setTheme } from '@/store/cvSlice';
import { motion } from 'framer-motion';
import LanguageSelector from '@/components/LanguageSelector';
import { 
  FaUser, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode, 
  FaProjectDiagram, 
  FaCertificate, 
  FaLanguage,
  FaDownload,
  FaPrint,
  FaSun,
  FaMoon
} from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const cvData = useSelector((state: RootState) => state.cv);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('personal');

  const sections = [
    { id: 'personal', title: 'Personal Info', icon: FaUser },
    { id: 'experience', title: 'Experience', icon: FaBriefcase },
    { id: 'education', title: 'Education', icon: FaGraduationCap },
    { id: 'skills', title: 'Skills', icon: FaCode },
    { id: 'projects', title: 'Projects', icon: FaProjectDiagram },
    { id: 'certifications', title: 'Certifications', icon: FaCertificate },
    { id: 'languages', title: 'Languages', icon: FaLanguage },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // TODO: Implement PDF download functionality
    console.log('Download CV as PDF');
  };

  const toggleTheme = () => {
    const newTheme = cvData.theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    // Also update the document class for immediate effect
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Jawdat Abdullah
              </h1>
              <div className="hidden md:flex space-x-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                title={cvData.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {cvData.theme === 'light' ? (
                  <FaMoon className="w-4 h-4" />
                ) : (
                  <FaSun className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <FaPrint className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                <FaDownload className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            </div>
          </div>
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Jawdat Abdullah
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
              Full Stack Developer & Software Engineer
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
              <span>📍 Available for opportunities</span>
              <span>📧 jawdat@example.com</span>
              <span>📱 +123 456 7890</span>
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
              <FaUser className="w-6 h-6 mr-3 text-primary" />
              Personal Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Me</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Experienced Full Stack Developer with a passion for creating innovative web applications. 
                  Skilled in modern technologies and frameworks with a focus on user experience and performance.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Details</h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>📧 jawdat@example.com</p>
                  <p>📱 +123 456 7890</p>
                  <p>📍 City, Country</p>
                  <p>🔗 linkedin.com/in/jawdat</p>
                  <p>💻 github.com/jawdat</p>
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
              <FaBriefcase className="w-6 h-6 mr-3 text-primary" />
              Work Experience
            </h2>
            <div className="space-y-6">
              {cvData.experience.map((exp, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {exp.title}
                  </h3>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                </div>
              ))}
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
              <FaGraduationCap className="w-6 h-6 mr-3 text-primary" />
              Education
            </h2>
            <div className="space-y-6">
              {cvData.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-primary pl-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-primary font-medium">{edu.institution}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{edu.description}</p>
                </div>
              ))}
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
              <FaCode className="w-6 h-6 mr-3 text-primary" />
              Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {Object.entries(
                cvData.skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill);
                  return acc;
                }, {} as Record<string, typeof cvData.skills>)
              ).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {category}
                  </h3>
                  <div className="space-y-3">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
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
              <FaProjectDiagram className="w-6 h-6 mr-3 text-primary" />
              Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cvData.projects.map((project, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
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
              <FaCertificate className="w-6 h-6 mr-3 text-primary" />
              Certifications
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cvData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-primary font-medium mb-2">{cert.issuer}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {cert.date}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">{cert.description}</p>
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
              <FaLanguage className="w-6 h-6 mr-3 text-primary" />
              Languages
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cvData.languages.map((lang, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {lang.name}
                  </h3>
                  <p className="text-primary font-medium">{lang.proficiency}</p>
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
