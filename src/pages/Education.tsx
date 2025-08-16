import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { addEducation, updateEducation, removeEducation } from '../store/cvSlice';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaGraduationCap, FaCalendar } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

interface EducationForm {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  description: string;
}

const Education = () => {
  const dispatch = useDispatch();
  const education = useSelector((state: RootState) => state.cv.education);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<EducationForm>({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    current: false,
    gpa: '',
    description: ''
  });

  const handleInputChange = (field: keyof EducationForm, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.institution || !formData.degree || !formData.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const educationData = {
      ...formData,
      id: editingId || uuidv4()
    };

    if (editingId) {
      dispatch(updateEducation({ id: editingId, data: educationData }));
      toast.success('Education updated successfully!');
    } else {
      dispatch(addEducation(educationData));
      toast.success('Education added successfully!');
    }

    resetForm();
  };

  const handleEdit = (edu: any) => {
    setEditingId(edu.id);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      endDate: edu.endDate,
      current: edu.current,
      gpa: edu.gpa,
      description: edu.description
    });
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    dispatch(removeEducation(id));
    toast.success('Education removed successfully!');
  };

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Education
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add your educational background and qualifications.
        </p>
      </div>

      {/* Add Education Button */}
      {!isAdding && (
        <div className="mb-6">
          <button
            onClick={() => setIsAdding(true)}
            className="cv-button flex items-center"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            Add Education
          </button>
        </div>
      )}

      {/* Education Form */}
      {isAdding && (
        <div className="cv-section mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editingId ? 'Edit Education' : 'Add New Education'}
            </h2>
            <button
              onClick={resetForm}
              className="cv-button-secondary"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Institution */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaGraduationCap className="inline w-4 h-4 mr-2" />
                Institution *
              </label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => handleInputChange('institution', e.target.value)}
                className="cv-input"
                placeholder="Enter institution name"
              />
            </div>

            {/* Degree */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Degree *
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => handleInputChange('degree', e.target.value)}
                className="cv-input"
                placeholder="e.g., Bachelor's, Master's, PhD"
              />
            </div>

            {/* Field of Study */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Field of Study
              </label>
              <input
                type="text"
                value={formData.field}
                onChange={(e) => handleInputChange('field', e.target.value)}
                className="cv-input"
                placeholder="e.g., Computer Science, Business Administration"
              />
            </div>

            {/* GPA */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GPA
              </label>
              <input
                type="text"
                value={formData.gpa}
                onChange={(e) => handleInputChange('gpa', e.target.value)}
                className="cv-input"
                placeholder="e.g., 3.8/4.0"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaCalendar className="inline w-4 h-4 mr-2" />
                Start Date *
              </label>
              <input
                type="month"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="cv-input"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="month"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="cv-input"
                disabled={formData.current}
              />
            </div>

            {/* Currently Studying */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={(e) => handleInputChange('current', e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label htmlFor="current" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                I am currently studying here
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="cv-input resize-none"
              placeholder="Describe your studies, relevant coursework, projects, or achievements..."
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              className="cv-button"
            >
              {editingId ? 'Update Education' : 'Add Education'}
            </button>
          </div>
        </div>
      )}

      {/* Education List */}
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="cv-section">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-primary font-medium">{edu.institution}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(edu)}
                  className="cv-button-secondary p-2"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(edu.id)}
                  className="cv-button-secondary p-2 text-red-600 hover:text-red-700"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {edu.description && (
              <p className="text-gray-700 dark:text-gray-300">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {education.length === 0 && !isAdding && (
        <div className="cv-section text-center py-12">
          <FaGraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No education added yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start by adding your educational background and qualifications.
          </p>
          <button
            onClick={() => setIsAdding(true)}
            className="cv-button"
          >
            Add Your First Education
          </button>
        </div>
      )}
    </div>
  );
};

export default Education;
