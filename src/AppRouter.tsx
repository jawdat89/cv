import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Preview from "@/pages/Preview";
import Templates from "@/pages/Templates";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
