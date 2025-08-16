import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CVData {
  personalInfo: {
    firstName: string;
    lastName: string;
    firstNameAr: string;
    lastNameAr: string;
    firstNameHe: string;
    lastNameHe: string;
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
  template: "modern" | "classic" | "creative" | "minimal";
  theme: "light" | "dark";
  currentLanguage: "en" | "ar" | "fr" | "he";
}

const initialState: CVData = {
  personalInfo: {
    firstName: "Jawdat",
    lastName: "Abdullah",
    firstNameAr: "جودات",
    lastNameAr: "عبدالله",
    firstNameHe: "גודאת",
    lastNameHe: "עבדאללה",
    email: "ajawdat.dev@gmail.com",
    phone: "+972 526 449858",
    address: "Kisra, Israel",
    linkedin: "linkedin.com/in/jawdat89",
    website: "github.com/jawdat89",
    summary:
      "Experienced Automation Manager and Logistics Manager with SAP EWM 100 certification, currently pursuing a Control & Automation Engineering degree. Former Full Stack Developer with strong background in React, Node.js, and cloud technologies. Passionate about designing and implementing automation solutions, optimizing logistics processes, and leveraging SAP systems to drive operational excellence. Proven track record of delivering high-quality automation and logistics solutions with technical expertise.",
  },
  experience: [
    {
      id: "1",
      title: "Automation Manager & Logistics Manager",
      company: "Strauss Group",
      position: "Automation Manager & Logistics Manager",
      location: "Israel",
      startDate: "2025",
      endDate: "Present",
      current: true,
      description:
        "As Automation Manager & Logistics Manager at Strauss-Group's Chilled Warehouse (Dairy & Shaked), I oversee both automation processes and logistics operations to ensure efficient, reliable, and high-quality warehouse performance. My role involves managing and continuously optimising SAP ECC and SAP EWM systems, coordinating logistics workflows, and integrating HMI PLCs to enhance warehouse automation.\n\nI serve as a strategic liaison between operations and IT, delivering expert SAP consulting for the new Shaked industry and supporting ongoing system enhancements. I collaborate with cross-functional teams to streamline deliveries, materials management, quality assurance, and logistics optimization, while actively participating in management meetings to drive strategic decisions and continuous improvement initiatives.\n\nMy focus is on achieving operational excellence, maintaining system reliability, optimizing logistics processes, and enabling the seamless integration of new technologies to meet the evolving needs of the warehouse environment.",
      achievements: [
        "Design and implement automation systems for industrial processes",
        "Manage and optimize logistics operations and warehouse workflows",
        "Develop monitoring solutions for electrical and mechanical systems",
        "Coordinate SAP EWM 100 implementation and optimization",
        "Ensure compliance with electrical safety standards and regulations",
        "Collaborate with cross-functional teams to optimize production and logistics processes",
        "Provide technical support and training for automation and SAP systems",
      ],
    },
    {
      id: "2",
      title: "Senior Full Stack Developer",
      company: "Innovisec@ICTS Europe",
      position: "Senior Full Stack Developer",
      location: "Hybrid",
      startDate: "2019",
      endDate: "2024",
      current: false,
      description:
        "Led development of multiple web applications using React, Node.js, AWS, and cloud technologies.",
      achievements: [
        "Maintained and developed multiple web applications using React, Node.js, AWS, and cloud technologies.",
        "Mentored junior developers",
        "Implemented CI/CD pipelines",
        "Migrated legacy systems to modern React architecture",
        "Developed and implemented new features and functionalities",
        "Optimized the performance of the applications",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "Atid Maloot",
      degree: "Control & Automation Engineering",
      field: "Automation & Control",
      startDate: "2024",
      endDate: "Present",
      current: true,
      gpa: "",
      description:
        "Currently pursuing a Control & Automation Engineering degree with electrical license.",
    },
    {
      id: "2",
      institution: "BSc in Computer Science (on hold)",
      degree: "BSc",
      field: "Computer Science",
      startDate: "2023",
      endDate: "2024",
      current: false,
      gpa: "3.8",
      description:
        "BSc in Computer Science with a focus on software engineering, currently on hold.",
    },
    {
      id: "3",
      institution: "Ort Braude College of Engineering",
      degree: "Software Practical Engineer with honors",
      field: "Software Engineering",
      startDate: "2015",
      endDate: "2018",
      current: false,
      gpa: "3.8",
      description:
        "Graduated with honors in Software Engineering with focus on software engineering and software development.",
    },
  ],
  skills: [
    { id: "1", name: "React", proficiency: 90, category: "Frontend" },
    { id: "2", name: "React Native", proficiency: 80, category: "Frontend" },
    { id: "3", name: "TypeScript", proficiency: 85, category: "Frontend" },
    { id: "4", name: "Node.js", proficiency: 80, category: "Backend" },
    { id: "5", name: ".Net Core Web", proficiency: 80, category: "Backend" },
    { id: "6", name: ".Net Core API", proficiency: 80, category: "Backend" },
    { id: "7", name: ".Net Core WPF", proficiency: 80, category: "Frontend" },
    { id: "8", name: "SQL", proficiency: 85, category: "Database" },
    { id: "9", name: "Azure", proficiency: 80, category: "Cloud" },
    { id: "10", name: "AWS", proficiency: 70, category: "Cloud" },
    { id: "11", name: "Git", proficiency: 80, category: "Version Control" },
    { id: "12", name: "CI/CD", proficiency: 80, category: "DevOps" },
    { id: "13", name: "Python", proficiency: 75, category: "Backend" },
    { id: "14", name: "Angular", proficiency: 70, category: "Frontend" },
    { id: "15", name: "Supabase", proficiency: 70, category: "Database" },
    { id: "16", name: "PostgreSQL", proficiency: 70, category: "Database" },
    { id: "17", name: "MySQL", proficiency: 70, category: "Database" },
    { id: "18", name: "MongoDB", proficiency: 70, category: "Database" },
    { id: "19", name: "Redis", proficiency: 70, category: "Database" },
    { id: "20", name: "SAP EWM", proficiency: 70, category: "Backend" },
    { id: "21", name: "SAP ABAP", proficiency: 70, category: "Backend" },
    { id: "22", name: "SAP HANA", proficiency: 70, category: "Backend" },
    { id: "23", name: "SAP Fiori", proficiency: 70, category: "Frontend" },
    { id: "24", name: "SAP UI5", proficiency: 70, category: "Frontend" },
    { id: "25", name: "WPF", proficiency: 85, category: "Frontend" },
    { id: "26", name: "C#", proficiency: 90, category: "Backend" },
    {
      id: "27",
      name: "Entity Framework",
      proficiency: 80,
      category: "Database",
    },
    { id: "28", name: "SQL Server", proficiency: 85, category: "Database" },
    { id: "29", name: ".NET Core", proficiency: 85, category: "Backend" },
    { id: "30", name: "Azure Functions", proficiency: 75, category: "Cloud" },
    { id: "31", name: "TypeScript", proficiency: 80, category: "Frontend" },
    { id: "32", name: "Authentication", proficiency: 85, category: "Backend" },
  ],
  projects: [
    {
      id: "1",
      title: "iPresent - Digital Signage System",
      name: "iPresent - Digital Signage System",
      description:
        "A comprehensive WPF-based digital signage presentation system for displaying content on multiple screens. Features include content scheduling, multi-station support, real-time updates, and support for various media types (PDF, PPT, videos, images). Includes background synchronization service and role-based user management.",
      technologies: [
        "WPF",
        "C#",
        "Entity Framework",
        "SQL Server",
        "WebView2",
        "MahApps.Metro",
        "NLog",
      ],
      link: "https://github.com/jawdat/ipresent",
      startDate: "2024",
      endDate: "2025",
    },
    {
      id: "2",
      title: "iManage - Small Business ERP System",
      name: "iManage - Small Business ERP System",
      description:
        "A comprehensive ERP (Enterprise Resource Planning) system designed specifically for small businesses. Features include inventory management, customer relationship management (CRM), financial accounting, sales and purchase order processing, employee management, and reporting dashboards. Built with modern .NET Core backend and React frontend for optimal user experience and scalability.",
      technologies: [
        ".NET Core",
        "C#",
        "Entity Framework Core",
        "SQL Server",
        "React",
        "TypeScript",
        "Business Logic",
        "Reporting",
      ],
      link: "https://github.com/jawdat/imanage",
      startDate: "2023",
      endDate: "2024",
    },
    {
      id: "3",
      title: "GoFresh - Drinks Shop Menu App",
      name: "GoFresh - Drinks Shop Menu App",
      description:
        "A digital menu application for a drinks shop built with serverless architecture. Features include dynamic menu management with Sanity.io integration, like functionality for menu items, real-time menu updates, and responsive design for customers to browse drinks and place orders.",
      technologies: [
        "Azure Functions",
        "TypeScript",
        "Node.js",
        "Sanity.io",
        "Serverless",
        "CORS",
        "Menu Management",
      ],
      link: "https://github.com/jawdat/gofresh",
      startDate: "2023",
      endDate: "2024",
    },
    {
      id: "4",
      title: "ASend - Automated Congratulations Cards",
      name: "ASend - Automated Congratulations Cards",
      description:
        "An automated congratulations card system built with Supabase for seamless card generation and customization. Features include automated card creation, customizable templates, real-time database management, and user-friendly interface for creating personalized congratulatory messages.",
      technologies: [
        "Supabase",
        "React",
        "TypeScript",
        "Database",
        "Automation",
        "Card Templates",
        "Real-time",
      ],
      link: "https://github.com/jawdat/asend",
      startDate: "2023",
      endDate: "2024",
    },
    {
      id: "5",
      title: "myShop - Ticket Management System",
      name: "myShop - Ticket Management System",
      description:
        "A comprehensive ticket management system designed to help manage user tickets across multiple platforms. Features include WPF desktop application for local machines, SyncService API for data synchronization, and React Native mobile app for on-the-go ticket management. Provides seamless ticket tracking, status updates, and cross-platform synchronization.",
      technologies: [
        "WPF",
        "React Native",
        "C#",
        "API Development",
        "SyncService",
        "Mobile Development",
        "Desktop Application",
        "Cross-platform",
      ],
      link: "https://github.com/jawdat/myshop",
      startDate: "2023",
      endDate: "Present",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "SAP EWM 100",
      issuer: "SAP",
      date: "2025",
      link: "https://www.youracclaim.com/badges/03c46487-e622-4374-a2b8-1a8b7140ad71/public_url",
      description: "Certified in SAP EWM 100.",
    },
    {
      id: "2",
      name: "MCITP MCSE 2008",
      issuer: "Microsoft",
      date: "2010",
      link: "https://www.youracclaim.com/badges/03c46487-e622-4374-a2b8-1a8b7140ad71/public_url",
      description: "Certified in Microsoft technologies.",
    },
    {
      id: "3",
      name: "Cicso CCNA",
      issuer: "Cisco",
      date: "2010",
      link: "https://www.youracclaim.com/badges/03c46487-e622-4374-a2b8-1a8b7140ad71/public_url",
      description: "Certified in Cisco technologies.",
    },
  ],
  languages: [
    {
      id: "1",
      name: "English",
      language: "English",
      proficiency: "Advanced",
    },
    {
      id: "2",
      name: "Arabic",
      language: "Arabic",
      proficiency: "Native",
    },
    { id: "3", name: "Hebrew", language: "Hebrew", proficiency: "Native" },
  ],
  template: "modern",
  theme: "light",
  currentLanguage: "en",
};

const cvSlice = createSlice({
  name: "cv",
  initialState,
  reducers: {
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<CVData["personalInfo"]>>
    ) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },
    addExperience: (state, action: PayloadAction<CVData["experience"][0]>) => {
      state.experience.push(action.payload);
    },
    updateExperience: (
      state,
      action: PayloadAction<{
        id: string;
        data: Partial<CVData["experience"][0]>;
      }>
    ) => {
      const index = state.experience.findIndex(
        (exp) => exp.id === action.payload.id
      );
      if (index !== -1) {
        state.experience[index] = {
          ...state.experience[index],
          ...action.payload.data,
        };
      }
    },
    removeExperience: (state, action: PayloadAction<string>) => {
      state.experience = state.experience.filter(
        (exp) => exp.id !== action.payload
      );
    },
    addEducation: (state, action: PayloadAction<CVData["education"][0]>) => {
      state.education.push(action.payload);
    },
    updateEducation: (
      state,
      action: PayloadAction<{
        id: string;
        data: Partial<CVData["education"][0]>;
      }>
    ) => {
      const index = state.education.findIndex(
        (edu) => edu.id === action.payload.id
      );
      if (index !== -1) {
        state.education[index] = {
          ...state.education[index],
          ...action.payload.data,
        };
      }
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(
        (edu) => edu.id !== action.payload
      );
    },
    addSkill: (state, action: PayloadAction<CVData["skills"][0]>) => {
      state.skills.push(action.payload);
    },
    updateSkill: (
      state,
      action: PayloadAction<{ id: string; data: Partial<CVData["skills"][0]> }>
    ) => {
      const index = state.skills.findIndex(
        (skill) => skill.id === action.payload.id
      );
      if (index !== -1) {
        state.skills[index] = {
          ...state.skills[index],
          ...action.payload.data,
        };
      }
    },
    removeSkill: (state, action: PayloadAction<string>) => {
      state.skills = state.skills.filter(
        (skill) => skill.id !== action.payload
      );
    },
    addProject: (state, action: PayloadAction<CVData["projects"][0]>) => {
      state.projects.push(action.payload);
    },
    updateProject: (
      state,
      action: PayloadAction<{
        id: string;
        data: Partial<CVData["projects"][0]>;
      }>
    ) => {
      const index = state.projects.findIndex(
        (project) => project.id === action.payload.id
      );
      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ...action.payload.data,
        };
      }
    },
    removeProject: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
    },
    addCertification: (
      state,
      action: PayloadAction<CVData["certifications"][0]>
    ) => {
      state.certifications.push(action.payload);
    },
    updateCertification: (
      state,
      action: PayloadAction<{
        id: string;
        data: Partial<CVData["certifications"][0]>;
      }>
    ) => {
      const index = state.certifications.findIndex(
        (cert) => cert.id === action.payload.id
      );
      if (index !== -1) {
        state.certifications[index] = {
          ...state.certifications[index],
          ...action.payload.data,
        };
      }
    },
    removeCertification: (state, action: PayloadAction<string>) => {
      state.certifications = state.certifications.filter(
        (cert) => cert.id !== action.payload
      );
    },
    addLanguage: (state, action: PayloadAction<CVData["languages"][0]>) => {
      state.languages.push(action.payload);
    },
    updateLanguage: (
      state,
      action: PayloadAction<{
        id: string;
        data: Partial<CVData["languages"][0]>;
      }>
    ) => {
      const index = state.languages.findIndex(
        (lang) => lang.id === action.payload.id
      );
      if (index !== -1) {
        state.languages[index] = {
          ...state.languages[index],
          ...action.payload.data,
        };
      }
    },
    removeLanguage: (state, action: PayloadAction<string>) => {
      state.languages = state.languages.filter(
        (lang) => lang.id !== action.payload
      );
    },
    setTemplate: (state, action: PayloadAction<CVData["template"]>) => {
      state.template = action.payload;
    },
    setTheme: (state, action: PayloadAction<CVData["theme"]>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<CVData["currentLanguage"]>) => {
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
