import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    current: boolean;
    gpa: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    proficiency: number;
    category: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    name: string;
    description: string;
    technologies: string[];
    link: string;
    startDate: string;
    endDate: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    link: string;
    description: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    language: string;
    proficiency: string;
  }>;
  template: 'modern' | 'classic' | 'creative' | 'minimal';
  theme: 'light' | 'dark';
  currentLanguage: 'en' | 'ar' | 'fr' | 'he';
}

const initialState: CVData = {
  personalInfo: {
    firstName: 'Jawdat',
    lastName: 'Abdullah',
    email: 'jawdat@example.com',
    phone: '+123 456 7890',
    address: 'City, Country',
    linkedin: 'linkedin.com/in/jawdat',
    website: 'github.com/jawdat',
    summary: 'Experienced Full Stack Developer with a passion for creating innovative web applications. Skilled in modern technologies and frameworks with a focus on user experience and performance.',
  },
  experience: [
    {
      id: '1',
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      position: 'Senior Full Stack Developer',
      location: 'Remote',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      description: 'Led development of multiple web applications using React, Node.js, and cloud technologies.',
      achievements: ['Improved performance by 40%', 'Mentored junior developers', 'Implemented CI/CD pipelines']
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University Name',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2018',
      endDate: '2022',
      current: false,
      gpa: '3.8',
      description: 'Graduated with honors in Computer Science with focus on software engineering.'
    }
  ],
  skills: [
    { id: '1', name: 'React', proficiency: 90, category: 'Frontend' },
    { id: '2', name: 'TypeScript', proficiency: 85, category: 'Frontend' },
    { id: '3', name: 'Node.js', proficiency: 80, category: 'Backend' },
    { id: '4', name: 'Python', proficiency: 75, category: 'Backend' },
    { id: '5', name: 'SQL', proficiency: 85, category: 'Database' },
    { id: '6', name: 'AWS', proficiency: 70, category: 'Cloud' }
  ],
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce platform built with React, Node.js, and MongoDB.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      link: 'https://github.com/jawdat/ecommerce',
      startDate: '2023',
      endDate: '2023'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023',
      link: 'https://aws.amazon.com/certification/',
      description: 'Certified in AWS cloud development and deployment.'
    }
  ],
  languages: [
    { id: '1', name: 'English', language: 'English', proficiency: 'Native' },
    { id: '2', name: 'Arabic', language: 'Arabic', proficiency: 'Fluent' }
  ],
  template: 'modern',
  theme: 'light',
  currentLanguage: 'en',
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    updatePersonalInfo: (state, action: PayloadAction<Partial<CVData['personalInfo']>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    addExperience: (state, action: PayloadAction<CVData['experience'][0]>) => {
      state.experience.push(action.payload);
    },
    updateExperience: (state, action: PayloadAction<{ id: string; data: Partial<CVData['experience'][0]> }>) => {
      const index = state.experience.findIndex(exp => exp.id === action.payload.id);
      if (index !== -1) {
        state.experience[index] = { ...state.experience[index], ...action.payload.data };
      }
    },
    removeExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter(exp => exp.id !== action.payload);
    },
    addEducation: (state, action: PayloadAction<CVData['education'][0]>) => {
      state.education.push(action.payload);
    },
    updateEducation: (state, action: PayloadAction<{ id: string; data: Partial<CVData['education'][0]> }>) => {
      const index = state.education.findIndex(edu => edu.id === action.payload.id);
      if (index !== -1) {
        state.education[index] = { ...state.education[index], ...action.payload.data };
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(edu => edu.id !== action.payload);
    },
    addSkill: (state, action: PayloadAction<CVData['skills'][0]>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<{ id: string; data: Partial<CVData['skills'][0]> }>) => {
      const index = state.skills.findIndex(skill => skill.id === action.payload.id);
      if (index !== -1) {
        state.skills[index] = { ...state.skills[index], ...action.payload.data };
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(skill => skill.id !== action.payload);
    },
    addProject: (state, action: PayloadAction<CVData['projects'][0]>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<{ id: string; data: Partial<CVData['projects'][0]> }>) => {
      const index = state.projects.findIndex(project => project.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = { ...state.projects[index], ...action.payload.data };
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(project => project.id !== action.payload);
    },
    addCertification: (state, action: PayloadAction<CVData['certifications'][0]>) => {
      state.certifications.push(action.payload);
    },
    updateCertification: (state, action: PayloadAction<{ id: string; data: Partial<CVData['certifications'][0]> }>) => {
      const index = state.certifications.findIndex(cert => cert.id === action.payload.id);
      if (index !== -1) {
        state.certifications[index] = { ...state.certifications[index], ...action.payload.data };
      }
    },
    removeCertification: (state, action: PayloadAction<string>) => {
      state.certifications = state.certifications.filter(cert => cert.id !== action.payload);
    },
    addLanguage: (state, action: PayloadAction<CVData['languages'][0]>) => {
      state.languages.push(action.payload);
    },
    updateLanguage: (state, action: PayloadAction<{ id: string; data: Partial<CVData['languages'][0]> }>) => {
      const index = state.languages.findIndex(lang => lang.id === action.payload.id);
      if (index !== -1) {
        state.languages[index] = { ...state.languages[index], ...action.payload.data };
      }
    },
    removeLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter(lang => lang.id !== action.payload);
    },
    setTemplate: (state, action: PayloadAction<CVData['template']>) => {
      state.template = action.payload;
    },
    setTheme: (state, action: PayloadAction<CVData['theme']>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<CVData['currentLanguage']>) => {
      state.currentLanguage = action.payload;
    },
    resetCV: () => {
      return initialState;
    },
  },
});

export const {
  updatePersonalInfo,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  addLanguage,
  updateLanguage,
  removeLanguage,
  setTemplate,
  setTheme,
  setLanguage,
  resetCV,
} = cvSlice.actions;

export default cvSlice.reducer;
