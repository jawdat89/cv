import { FaPalette } from 'react-icons/fa';

const Templates = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CV Templates
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Choose from different CV templates and styles.
        </p>
      </div>

      <div className="cv-section text-center py-12">
        <FaPalette className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Templates section coming soon
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This section will allow you to choose from different CV templates and customize the styling.
        </p>
      </div>
    </div>
  );
};

export default Templates;
