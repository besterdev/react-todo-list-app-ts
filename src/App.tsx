import React from "react";
import { Routes, Route } from "react-router-dom";

import HomeLayout from "./components/HomeLayout";
import { ProtectedLayout } from "./components/ProtectedLayout";

import Main from "./pages/main";
import SignIn from "./pages/sign-in";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/login" element={<SignIn />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Main />} />
      </Route>
    </Routes>
  );
};

export default App;
