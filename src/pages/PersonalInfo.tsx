import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updatePersonalInfo } from "@/store/cvSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  website: string;
  summary: string;
}

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const personalInfo = useSelector((state: RootState) => state.cv.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PersonalInfoForm>({
    defaultValues: personalInfo,
  });

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(updatePersonalInfo(data));
    toast.success(t("personalInfo.saveSuccess"));
    reset(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {t("personalInfo.title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t("personalInfo.description")}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="cv-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaUser className="inline w-4 h-4 mr-2" />
              {t("personalInfo.firstName")} *
            </label>
            <input
              type="text"
              {...register("firstName", {
                required: t("personalInfo.firstNameRequired"),
              })}
              className="cv-input"
              placeholder={t("personalInfo.firstNamePlaceholder")}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("personalInfo.lastName")} *
            </label>
            <input
              type="text"
              {...register("lastName", {
                required: t("personalInfo.lastNameRequired"),
              })}
              className="cv-input"
              placeholder={t("personalInfo.lastNamePlaceholder")}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaEnvelope className="inline w-4 h-4 mr-2" />
              {t("personalInfo.email")} *
            </label>
            <input
              type="email"
              {...register("email", {
                required: t("personalInfo.emailRequired"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("personalInfo.emailInvalid"),
                },
              })}
              className="cv-input"
              placeholder={t("personalInfo.emailPlaceholder")}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaPhone className="inline w-4 h-4 mr-2" />
              {t("personalInfo.phone")}
            </label>
            <input
              type="tel"
              {...register("phone")}
              className="cv-input"
              placeholder={t("personalInfo.phonePlaceholder")}
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaMapMarkerAlt className="inline w-4 h-4 mr-2" />
              {t("personalInfo.address")}
            </label>
            <input
              type="text"
              {...register("address")}
              className="cv-input"
              placeholder={t("personalInfo.addressPlaceholder")}
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaLinkedin className="inline w-4 h-4 mr-2" />
              {t("personalInfo.linkedin")}
            </label>
            <input
              type="url"
              {...register("linkedin")}
              className="cv-input"
              placeholder={t("personalInfo.linkedinPlaceholder")}
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaGlobe className="inline w-4 h-4 mr-2" />
              {t("personalInfo.website")}
            </label>
            <input
              type="url"
              {...register("website")}
              className="cv-input"
              placeholder={t("personalInfo.websitePlaceholder")}
            />
          </div>

          {/* Professional Summary */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("personalInfo.summary")}
            </label>
            <textarea
              {...register("summary")}
              rows={4}
              className="cv-input resize-none"
              placeholder={t("personalInfo.summaryPlaceholder")}
            />
            <p className="mt-1 text-sm text-gray-500">
              {t("personalInfo.summaryHelp")}
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={!isDirty}
            className="cv-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("personalInfo.saveButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
