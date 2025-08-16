import { FaEye } from 'react-icons/fa';

const Preview = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CV Preview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Preview how your CV will look with the selected template.
        </p>
      </div>

      <div className="cv-section text-center py-12">
        <FaEye className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Preview section coming soon
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          This section will show a live preview of your CV with the selected template.
        </p>
      </div>
    </div>
  );
};

export default Preview;
