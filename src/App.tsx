import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth/AuthLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import MainLayout from "./layouts/main/MainLayout";
import CrewPage from "./pages/crew/CrewPage";
import CrewDetailPage from "./pages/crew/CrewDetailPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/crews" element={<CrewPage />} />
          <Route path="/crews/:crewId" element={<CrewDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
