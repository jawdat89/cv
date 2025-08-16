import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import {
  addSkill,
  updateSkill,
  removeSkill,
  addCertification,
  updateCertification,
  removeCertification,
} from "@/store/cvSlice";
import { toast } from "react-toastify";
import { useI18n } from "@/hooks";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCode,
  FaCertificate,
  FaCalendar,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

interface SkillForm {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  category: string;
}

interface CertificationForm {
  name: string;
  issuer: string;
  date: string;
  link: string;
  description: string;
}

const Expertise = () => {
  const { t } = useI18n();
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.cv.skills);
  const certifications = useSelector(
    (state: RootState) => state.cv.certifications
  );

  // Skills state
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [skillFormData, setSkillFormData] = useState<SkillForm>({
    name: "",
    level: "intermediate",
    category: "",
  });

  // Certifications state
  const [isAddingCertification, setIsAddingCertification] = useState(false);
  const [editingCertificationId, setEditingCertificationId] = useState<
    string | null
  >(null);
  const [certificationFormData, setCertificationFormData] =
    useState<CertificationForm>({
      name: "",
      issuer: "",
      date: "",
      link: "",
      description: "",
    });

  // Skills handlers
  const handleSkillInputChange = (
    field: keyof SkillForm,
    value: string | boolean
  ) => {
    setSkillFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSkillSubmit = () => {
    if (!skillFormData.name) {
      toast.error(t("expertise.toast.skillNameRequired"));
      return;
    }

    const skillData = {
      id: editingSkillId || uuidv4(),
      name: skillFormData.name,
      proficiency: getProficiencyFromLevel(skillFormData.level),
      category: skillFormData.category,
    };

    if (editingSkillId) {
      dispatch(updateSkill({ id: editingSkillId, data: skillData }));
      toast.success(t("expertise.toast.skillUpdated"));
    } else {
      dispatch(addSkill(skillData));
      toast.success(t("expertise.toast.skillAdded"));
    }

    resetSkillForm();
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

  const handleSkillEdit = (skill: {
    id: string;
    name: string;
    proficiency: number;
    category: string;
  }) => {
    setEditingSkillId(skill.id);
    setSkillFormData({
      name: skill.name,
      level: getLevelFromProficiency(skill.proficiency),
      category: skill.category,
    });
    setIsAddingSkill(true);
  };

  const handleSkillDelete = (id: string) => {
    dispatch(removeSkill(id));
    toast.success(t("expertise.toast.skillRemoved"));
  };

  const resetSkillForm = () => {
    setSkillFormData({
      name: "",
      level: "intermediate",
      category: "",
    });
    setIsAddingSkill(false);
    setEditingSkillId(null);
  };

  // Certifications handlers
  const handleCertificationInputChange = (
    field: keyof CertificationForm,
    value: string
  ) => {
    setCertificationFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCertificationSubmit = () => {
    if (!certificationFormData.name || !certificationFormData.issuer) {
      toast.error(t("expertise.toast.certificationFieldsRequired"));
      return;
    }

    const certificationData = {
      ...certificationFormData,
      id: editingCertificationId || uuidv4(),
    };

    if (editingCertificationId) {
      dispatch(
        updateCertification({
          id: editingCertificationId,
          data: certificationData,
        })
      );
      toast.success(t("expertise.toast.certificationUpdated"));
    } else {
      dispatch(addCertification(certificationData));
      toast.success(t("expertise.toast.certificationAdded"));
    }

    resetCertificationForm();
  };

  const handleCertificationEdit = (certification: CertificationForm) => {
    setEditingCertificationId(certification.name);
    setCertificationFormData({
      name: certification.name,
      issuer: certification.issuer,
      date: certification.date,
      link: certification.link,
      description: certification.description,
    });
    setIsAddingCertification(true);
  };

  const handleCertificationDelete = (id: string) => {
    dispatch(removeCertification(id));
    toast.success(t("expertise.toast.certificationRemoved"));
  };

  const resetCertificationForm = () => {
    setCertificationFormData({
      name: "",
      issuer: "",
      date: "",
      link: "",
      description: "",
    });
    setIsAddingCertification(false);
    setEditingCertificationId(null);
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
          {t("expertise.title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t("expertise.subtitle")}
        </p>
      </div>

      {/* Skills Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
            <FaCode className="w-6 h-6 mr-3" />
            {t("expertise.skills.title")}
          </h2>
          {!isAddingSkill && (
            <button
              onClick={() => setIsAddingSkill(true)}
              className="cv-button flex items-center"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              {t("expertise.skills.addSkill")}
            </button>
          )}
        </div>

        {/* Skill Form */}
        {isAddingSkill && (
          <div className="cv-section mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingSkillId
                  ? t("expertise.skills.editSkill")
                  : t("expertise.skills.addNewSkill")}
              </h3>
              <button onClick={resetSkillForm} className="cv-button-secondary">
                {t("expertise.common.cancel")}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("expertise.skills.skillName")} *
                </label>
                <input
                  type="text"
                  value={skillFormData.name}
                  onChange={(e) =>
                    handleSkillInputChange("name", e.target.value)
                  }
                  className="cv-input"
                  placeholder={t("expertise.skills.skillNamePlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("expertise.skills.proficiencyLevel")}
                </label>
                <select
                  value={skillFormData.level}
                  onChange={(e) =>
                    handleSkillInputChange("level", e.target.value)
                  }
                  className="cv-input"
                >
                  <option value="beginner">
                    {t("expertise.skills.beginner")}
                  </option>
                  <option value="intermediate">
                    {t("expertise.skills.intermediate")}
                  </option>
                  <option value="advanced">
                    {t("expertise.skills.advanced")}
                  </option>
                  <option value="expert">{t("expertise.skills.expert")}</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("expertise.skills.category")}
                </label>
                <input
                  type="text"
                  value={skillFormData.category}
                  onChange={(e) =>
                    handleSkillInputChange("category", e.target.value)
                  }
                  className="cv-input"
                  placeholder={t("expertise.skills.categoryPlaceholder")}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={handleSkillSubmit} className="cv-button">
                {editingSkillId
                  ? t("expertise.skills.updateSkill")
                  : t("expertise.skills.addSkill")}
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
                          onClick={() => handleSkillEdit(skill)}
                          className="cv-button-secondary p-1"
                        >
                          <FaEdit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleSkillDelete(skill.id)}
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

        {skills.length === 0 && !isAddingSkill && (
          <div className="cv-section text-center py-8">
            <FaCode className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t("expertise.skills.noSkills")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t("expertise.skills.noSkillsDescription")}
            </p>
            <button
              onClick={() => setIsAddingSkill(true)}
              className="cv-button"
            >
              {t("expertise.skills.addFirstSkill")}
            </button>
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
            <FaCertificate className="w-6 h-6 mr-3" />
            {t("expertise.certifications.title")}
          </h2>
          {!isAddingCertification && (
            <button
              onClick={() => setIsAddingCertification(true)}
              className="cv-button flex items-center"
            >
              <FaPlus className="w-4 h-4 mr-2" />
              {t("expertise.certifications.addCertification")}
            </button>
          )}
        </div>

        {/* Certification Form */}
        {isAddingCertification && (
          <div className="cv-section mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingCertificationId
                  ? t("expertise.certifications.editCertification")
                  : t("expertise.certifications.addNewCertification")}
              </h3>
              <button
                onClick={resetCertificationForm}
                className="cv-button-secondary"
              >
                {t("expertise.common.cancel")}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("expertise.certifications.certificationName")} *
                </label>
                <input
                  type="text"
                  value={certificationFormData.name}
                  onChange={(e) =>
                    handleCertificationInputChange("name", e.target.value)
                  }
                  className="cv-input"
                  placeholder={t(
                    "expertise.certifications.certificationNamePlaceholder"
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("expertise.certifications.issuingOrganization")} *
                </label>
                <input
                  type="text"
                  value={certificationFormData.issuer}
                  onChange={(e) =>
                    handleCertificationInputChange("issuer", e.target.value)
                  }
                  className="cv-input"
                  placeholder={t("expertise.certifications.issuerPlaceholder")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaCalendar className="inline w-4 h-4 mr-2" />
                  {t("expertise.certifications.date")}
                </label>
                <input
                  type="month"
                  value={certificationFormData.date}
                  onChange={(e) =>
                    handleCertificationInputChange("date", e.target.value)
                  }
                  className="cv-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <FaExternalLinkAlt className="inline w-4 h-4 mr-2" />
                  {t("expertise.certifications.link")}
                </label>
                <input
                  type="url"
                  value={certificationFormData.link}
                  onChange={(e) =>
                    handleCertificationInputChange("link", e.target.value)
                  }
                  className="cv-input"
                  placeholder={t("expertise.certifications.linkPlaceholder")}
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("expertise.certifications.description")}
              </label>
              <textarea
                value={certificationFormData.description}
                onChange={(e) =>
                  handleCertificationInputChange("description", e.target.value)
                }
                rows={3}
                className="cv-input resize-none"
                placeholder={t(
                  "expertise.certifications.descriptionPlaceholder"
                )}
              />
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={handleCertificationSubmit} className="cv-button">
                {editingCertificationId
                  ? t("expertise.certifications.updateCertification")
                  : t("expertise.certifications.addCertification")}
              </button>
            </div>
          </div>
        )}

        {/* Certifications Display */}
        <div className="space-y-4">
          {certifications.map((certification) => (
            <div key={certification.id} className="cv-section">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {certification.name}
                  </h3>
                  <p className="text-primary font-medium">
                    {certification.issuer}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {certification.date &&
                      `${t("expertise.certifications.issued")}: ${
                        certification.date
                      }`}
                    {certification.link && ` • ID: ${certification.link}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCertificationEdit(certification)}
                    className="cv-button-secondary p-2"
                  >
                    <FaEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCertificationDelete(certification.id)}
                    className="cv-button-secondary p-2 text-red-600 hover:text-red-700"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {certification.description && (
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {certification.description}
                </p>
              )}

              {certification.link && (
                <a
                  href={certification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  <FaExternalLinkAlt className="w-3 h-3 mr-1" />
                  {t("expertise.certifications.verifyCertification")}
                </a>
              )}
            </div>
          ))}
        </div>

        {certifications.length === 0 && !isAddingCertification && (
          <div className="cv-section text-center py-8">
            <FaCertificate className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t("expertise.certifications.noCertifications")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t("expertise.certifications.noCertificationsDescription")}
            </p>
            <button
              onClick={() => setIsAddingCertification(true)}
              className="cv-button"
            >
              {t("expertise.certifications.addFirstCertification")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expertise;
