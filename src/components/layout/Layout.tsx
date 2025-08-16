import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setTheme } from '../../store/cvSlice';
import LanguageSelector from '../LanguageSelector';
import { 
  FaUser, 
  FaBriefcase, 
  FaGraduationCap, 
  FaCode, 
  FaProjectDiagram, 
  FaCertificate, 
  FaLanguage, 
  FaEye, 
  FaPalette,
  FaSun,
  FaMoon,
  FaHome
} from 'react-icons/fa';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.cv.theme);

  const navigation = [
    { path: '/', label: 'Dashboard', icon: FaHome },
    { path: '/personal-info', label: 'Personal Info', icon: FaUser },
    { path: '/experience', label: 'Experience', icon: FaBriefcase },
    { path: '/education', label: 'Education', icon: FaGraduationCap },
    { path: '/skills', label: 'Skills', icon: FaCode },
    { path: '/projects', label: 'Projects', icon: FaProjectDiagram },
    { path: '/certifications', label: 'Certifications', icon: FaCertificate },
    { path: '/languages', label: 'Languages', icon: FaLanguage },
    { path: '/preview', label: 'Preview', icon: FaEye },
    { path: '/templates', label: 'Templates', icon: FaPalette },
  ];

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
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
                      ? 'bg-primary text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
            {theme === 'light' ? (
              <FaMoon className="w-5 h-5 text-gray-700" />
            ) : (
              <FaSun className="w-5 h-5 text-yellow-400" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
