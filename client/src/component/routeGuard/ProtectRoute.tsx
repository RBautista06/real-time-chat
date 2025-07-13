import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

interface Props {
  children: ReactNode;
}

const ProtectRoute = ({ children }: Props) => {
  const { authUser } = useAuthStore();

  if (!authUser) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectRoute;
