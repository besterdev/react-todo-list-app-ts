import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedLayout = () => {
  const { token }: any = useAuth();
  const outlet = useOutlet();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <div>{outlet}</div>;
};
