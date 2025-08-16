import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { updatePersonalInfo } from '../store/cvSlice';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGlobe } from 'react-icons/fa';

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
  const personalInfo = useSelector((state: RootState) => state.cv.personalInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset
  } = useForm<PersonalInfoForm>({
    defaultValues: personalInfo
  });

  const onSubmit = (data: PersonalInfoForm) => {
    dispatch(updatePersonalInfo(data));
    toast.success('Personal information saved successfully!');
    reset(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Personal Information
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in your basic personal information. This will appear at the top of your CV.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="cv-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaUser className="inline w-4 h-4 mr-2" />
              First Name *
            </label>
            <input
              type="text"
              {...register('firstName', { required: 'First name is required' })}
              className="cv-input"
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              {...register('lastName', { required: 'Last name is required' })}
              className="cv-input"
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaEnvelope className="inline w-4 h-4 mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="cv-input"
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaPhone className="inline w-4 h-4 mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="cv-input"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaMapMarkerAlt className="inline w-4 h-4 mr-2" />
              Address
            </label>
            <input
              type="text"
              {...register('address')}
              className="cv-input"
              placeholder="Enter your address"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaLinkedin className="inline w-4 h-4 mr-2" />
              LinkedIn Profile
            </label>
            <input
              type="url"
              {...register('linkedin')}
              className="cv-input"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FaGlobe className="inline w-4 h-4 mr-2" />
              Personal Website
            </label>
            <input
              type="url"
              {...register('website')}
              className="cv-input"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Professional Summary */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Professional Summary
            </label>
            <textarea
              {...register('summary')}
              rows={4}
              className="cv-input resize-none"
              placeholder="Write a brief professional summary about yourself, your career goals, and what you bring to the table..."
            />
            <p className="mt-1 text-sm text-gray-500">
              This is a brief overview that appears at the top of your CV. Keep it concise and impactful.
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
            Save Personal Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
