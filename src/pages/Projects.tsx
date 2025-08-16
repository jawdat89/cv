import { FaProjectDiagram } from 'react-icons/fa';

const Projects = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add your portfolio projects to showcase your work.
        </p>
      </div>

      <div className="cv-section text-center py-12">
        <FaProjectDiagram className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Projects section coming soon
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This section will allow you to add and manage your portfolio projects.
        </p>
      </div>
    </div>
  );
};

export default Projects;
