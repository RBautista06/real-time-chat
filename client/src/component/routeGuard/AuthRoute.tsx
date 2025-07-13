import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

interface Props {
  children: ReactNode;
}

const AuthRoute = ({ children }: Props) => {
  const { authUser } = useAuthStore();

  if (authUser) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthRoute;
