import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import PersonalInfo from "@/pages/PersonalInfo";
import Experience from "@/pages/Experience";
import Education from "@/pages/Education";
import Expertise from "@/pages/Expertise";
import Projects from "@/pages/Projects";
import Languages from "@/pages/Languages";
import Preview from "@/pages/Preview";
import Templates from "@/pages/Templates";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/expertise" element={<Expertise />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
