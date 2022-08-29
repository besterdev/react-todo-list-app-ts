import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { appAxios } from "../libs/axios";

const AuthContext = createContext({});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();

  const login = async (token: string) => {
    await setToken(token);
    if (token) {
      appAxios().defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete appAxios().defaults.headers.common["Authorization"];
    }
    navigate(0);
    navigate("/", { replace: false });
  };

  const logout = () => {
    setToken(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      login,
      logout,
    }),
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
