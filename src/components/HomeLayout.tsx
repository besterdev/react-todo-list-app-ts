import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HomeLayout = () => {
  const { token }: any = useAuth();
  const outlet = useOutlet();

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <div className="container mx-auto h-screen w-screen">{outlet}</div>;
};

export default HomeLayout;
