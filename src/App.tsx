import "@/index.css";
import { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor, RootState } from "@/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "@/AppRouter";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useI18n } from "@/hooks";

function AppContent() {
  const theme = useSelector((state: RootState) => state.cv.theme);
  const { direction } = useI18n();

  useEffect(() => {
    // Set up global error handling
    const handleError = (error: ErrorEvent) => {
      console.error("Global error:", error);
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen w-full" dir={direction}>
      <AppRouter />
      <ToastContainer
        position={direction === "rtl" ? "top-left" : "top-right"}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={direction === "rtl"}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  );
}

export default App;
