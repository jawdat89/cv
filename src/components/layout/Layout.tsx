import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setTheme } from "@/store/cvSlice";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/hooks";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaProjectDiagram,
  FaLanguage,
  FaEye,
  FaPalette,
  FaSun,
  FaMoon,
  FaHome,
} from "react-icons/fa";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { t, direction } = useI18n();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.cv.theme);

  const navigation = [
    { path: "/", label: t("navigation.dashboard"), icon: FaHome },
    {
      path: "/personal-info",
      label: t("navigation.personalInfo"),
      icon: FaUser,
    },
    {
      path: "/experience",
      label: t("navigation.experience"),
      icon: FaBriefcase,
    },
    {
      path: "/education",
      label: t("navigation.education"),
      icon: FaGraduationCap,
    },
    { path: "/expertise", label: t("navigation.expertise"), icon: FaCode },
    {
      path: "/projects",
      label: t("navigation.projects"),
      icon: FaProjectDiagram,
    },
    { path: "/languages", label: t("navigation.languages"), icon: FaLanguage },
    { path: "/preview", label: t("navigation.preview"), icon: FaEye },
    { path: "/templates", label: t("navigation.templates"), icon: FaPalette },
  ];

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900" dir={direction}>
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary dark:text-primary-light">
            CV Builder
          </h1>
        </div>

        <nav className="mt-6">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Theme Toggle and Language Selector */}
        <div className="absolute bottom-6 left-6 right-6 space-y-3">
          <LanguageSelector />
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-full h-10 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {theme === "light" ? (
              <FaMoon className="w-5 h-5 text-gray-700" />
            ) : (
              <FaSun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
