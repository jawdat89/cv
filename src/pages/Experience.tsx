import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  addExperience,
  updateExperience,
  removeExperience,
} from "@/store/cvSlice";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendar,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface ExperienceForm {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

const Experience = () => {
  const dispatch = useDispatch();
  const experiences = useSelector((state: RootState) => state.cv.experience);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<ExperienceForm>({
    company: "",
    position: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
    achievements: [""],
  });

  const handleInputChange = (field: keyof ExperienceForm, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAchievementChange = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData((prev) => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ""],
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!formData.company || !formData.position || !formData.startDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const experienceData = {
      ...formData,
      title: formData.position, // Use position as title
      id: editingId || uuidv4(),
      achievements: formData.achievements.filter(
        (achievement) => achievement.trim() !== ""
      ),
    };

    if (editingId) {
      dispatch(updateExperience({ id: editingId, data: experienceData }));
      toast.success("Experience updated successfully!");
    } else {
      dispatch(addExperience(experienceData));
      toast.success("Experience added successfully!");
    }

    resetForm();
  };

  const handleEdit = (experience: any) => {
    setEditingId(experience.id);
    setFormData({
      company: experience.company,
      position: experience.position,
      location: experience.location,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description,
      achievements:
        experience.achievements.length > 0 ? experience.achievements : [""],
    });
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    dispatch(removeExperience(id));
    toast.success("Experience removed successfully!");
  };

  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    });
    setIsAdding(false);
    setEditingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Work Experience
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add your work experience to showcase your professional background.
        </p>
      </div>

      {/* Add Experience Button */}
      {!isAdding && (
        <div className="mb-6">
          <button
            onClick={() => setIsAdding(true)}
            className="cv-button flex items-center"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            Add Experience
          </button>
        </div>
      )}

      {/* Experience Form */}
      {isAdding && (
        <div className="cv-section mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editingId ? "Edit Experience" : "Add New Experience"}
            </h2>
            <button onClick={resetForm} className="cv-button-secondary">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaBriefcase className="inline w-4 h-4 mr-2" />
                Company *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="cv-input"
                placeholder="Enter company name"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Position *
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                className="cv-input"
                placeholder="Enter job title"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaMapMarkerAlt className="inline w-4 h-4 mr-2" />
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="cv-input"
                placeholder="Enter location"
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
                onChange={(e) => handleInputChange("startDate", e.target.value)}
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
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="cv-input"
                disabled={formData.current}
              />
            </div>

            {/* Current Position */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="current"
                checked={formData.current}
                onChange={(e) => handleInputChange("current", e.target.checked)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <label
                htmlFor="current"
                className="ml-2 text-sm text-gray-700 dark:text-gray-300"
              >
                I currently work here
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="cv-input resize-none"
              placeholder="Describe your role and responsibilities..."
            />
          </div>

          {/* Achievements */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Key Achievements
            </label>
            {formData.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) =>
                    handleAchievementChange(index, e.target.value)
                  }
                  className="cv-input flex-1"
                  placeholder={`Achievement ${index + 1}`}
                />
                {formData.achievements.length > 1 && (
                  <button
                    onClick={() => removeAchievement(index)}
                    className="cv-button-secondary px-3"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addAchievement}
              className="cv-button-secondary text-sm"
            >
              <FaPlus className="inline w-3 h-3 mr-1" />
              Add Achievement
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button onClick={handleSubmit} className="cv-button">
              {editingId ? "Update Experience" : "Add Experience"}
            </button>
          </div>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((experience) => (
          <div key={experience.id} className="cv-section">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {experience.position}
                </h3>
                <p className="text-primary font-medium">{experience.company}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {experience.location} • {experience.startDate} -{" "}
                  {experience.current ? "Present" : experience.endDate}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(experience)}
                  className="cv-button-secondary p-2"
                >
                  <FaEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(experience.id)}
                  className="cv-button-secondary p-2 text-red-600 hover:text-red-700"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            </div>

            {experience.description && (
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {experience.description}
              </p>
            )}

            {experience.achievements.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Key Achievements:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {experience.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {experiences.length === 0 && !isAdding && (
        <div className="cv-section text-center py-12">
          <FaBriefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No experience added yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start by adding your work experience to showcase your professional
            background.
          </p>
          <button onClick={() => setIsAdding(true)} className="cv-button">
            Add Your First Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default Experience;
