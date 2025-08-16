import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setTheme } from "@/store/cvSlice";
import LanguageSelector from "@/components/LanguageSelector";
import { useI18n } from "@/hooks";
import { FaSun, FaMoon, FaPrint, FaDownload } from "react-icons/fa";

interface HeaderProps {
  title?: string;
  showPrint?: boolean;
  showDownload?: boolean;
  onPrint?: () => void;
  onDownload?: () => void;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
  title,
  showPrint = false,
  showDownload = false,
  onPrint,
  onDownload,
  children,
}) => {
  const { t } = useI18n();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.cv.theme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    } else {
      console.log("Download functionality not implemented");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {title && (
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h1>
            )}
            {children}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSelector />

            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              title={
                theme === "light"
                  ? t("actions.switchToDark")
                  : t("actions.switchToLight")
              }
            >
              {theme === "light" ? (
                <FaMoon className="w-4 h-4" />
              ) : (
                <FaSun className="w-4 h-4" />
              )}
            </button>

            {showPrint && (
              <button
                onClick={handlePrint}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                <FaPrint className="w-4 h-4" />
                <span className="hidden sm:inline">{t("actions.print")}</span>
              </button>
            )}

            {showDownload && (
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                <FaDownload className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {t("actions.downloadPDF")}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
