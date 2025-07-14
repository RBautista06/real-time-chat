import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import ProtectRoute from "./component/routeGuard/AuthRoute";
import AuthRoute from "./component/routeGuard/ProtectRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <AuthRoute>
              <HomePage />
            </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectRoute>
              <SignUpPage />
            </ProtectRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectRoute>
              <LoginPage />
            </ProtectRoute>
          }
        />
        <Route path="/settings" element={<SettingPage />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <ProfilePage />
            </AuthRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
