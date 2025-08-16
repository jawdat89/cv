import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { addSkill, updateSkill, removeSkill } from "@/store/cvSlice";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaCode } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface SkillForm {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
}

const Skills = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.cv.skills);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<SkillForm>({
    name: "",
    level: "intermediate",
    category: "",
  });

  const handleInputChange = (
    field: keyof SkillForm,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name) {
      toast.error("Please enter a skill name");
      return;
    }

    const skillData = {
      id: editingId || uuidv4(),
      name: formData.name,
      proficiency: getProficiencyFromLevel(formData.level),
      category: formData.category,
    };

    if (editingId) {
      dispatch(updateSkill({ id: editingId, data: skillData }));
      toast.success("Skill updated successfully!");
    } else {
      dispatch(addSkill(skillData));
      toast.success("Skill added successfully!");
    }

    resetForm();
  };

  const getProficiencyFromLevel = (level: string): number => {
    switch (level) {
      case "beginner":
        return 25;
      case "intermediate":
        return 50;
      case "advanced":
        return 75;
      case "expert":
        return 100;
      default:
        return 50;
    }
  };

  const getLevelFromProficiency = (
    proficiency: number
  ): "beginner" | "intermediate" | "advanced" | "expert" => {
    if (proficiency <= 25) return "beginner";
    if (proficiency <= 50) return "intermediate";
    if (proficiency <= 75) return "advanced";
    return "expert";
  };

  const handleEdit = (skill: {
    id: string;
    name: string;
    proficiency: number;
    category: string;
  }) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      level: getLevelFromProficiency(skill.proficiency),
      category: skill.category,
    });
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    dispatch(removeSkill(id));
    toast.success("Skill removed successfully!");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      level: "intermediate",
      category: "",
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "advanced":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "expert":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Skills
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add your technical and soft skills to showcase your competencies.
        </p>
      </div>

      {/* Add Skill Button */}
      {!isAdding && (
        <div className="mb-6">
          <button
            onClick={() => setIsAdding(true)}
            className="cv-button flex items-center"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            Add Skill
          </button>
        </div>
      )}

      {/* Skill Form */}
      {isAdding && (
        <div className="cv-section mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </h2>
            <button onClick={resetForm} className="cv-button-secondary">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skill Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <FaCode className="inline w-4 h-4 mr-2" />
                Skill Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="cv-input"
                placeholder="e.g., JavaScript, Project Management"
              />
            </div>

            {/* Skill Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Proficiency Level
              </label>
              <select
                value={formData.level}
                onChange={(e) => handleInputChange("level", e.target.value)}
                className="cv-input"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="cv-input"
                placeholder="e.g., Programming, Soft Skills"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-end">
            <button onClick={handleSubmit} className="cv-button">
              {editingId ? "Update Skill" : "Add Skill"}
            </button>
          </div>
        </div>
      )}

      {/* Skills Display */}
      {Object.keys(groupedSkills).length > 0 && (
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category} className="cv-section">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {skill.name}
                      </h4>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${getLevelColor(
                          getLevelFromProficiency(skill.proficiency)
                        )}`}
                      >
                        {getLevelFromProficiency(skill.proficiency)}
                      </span>
                    </div>
                    <div className="flex gap-2 ml-3">
                      <button
                        onClick={() => handleEdit(skill)}
                        className="cv-button-secondary p-1"
                      >
                        <FaEdit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        className="cv-button-secondary p-1 text-red-600 hover:text-red-700"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {skills.length === 0 && !isAdding && (
        <div className="cv-section text-center py-12">
          <FaCode className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No skills added yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Start by adding your technical and soft skills to showcase your
            competencies.
          </p>
          <button onClick={() => setIsAdding(true)} className="cv-button">
            Add Your First Skill
          </button>
        </div>
      )}
    </div>
  );
};

export default Skills;
