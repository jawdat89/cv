import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load routes that are not the main page
const Preview = lazy(() => import("@/pages/Preview"));
const Templates = lazy(() => import("@/pages/Templates"));
const LocationPage = lazy(() => import("@/pages/LocationPage"));
const ArticlesIndexPage = lazy(() => import("@/pages/articles/ArticlesIndexPage"));
const MinimalDirectExpensePage = lazy(
  () => import("@/pages/articles/MinimalDirectExpensePage")
);

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          <Route path="/preview" element={<Preview />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/articles" element={<ArticlesIndexPage />} />
          <Route
            path="/articles/minimal-direct-expense-more-managed"
            element={<MinimalDirectExpensePage />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
