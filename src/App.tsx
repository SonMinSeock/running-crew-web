import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth/AuthLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ThemeModeButton from "./components/common/ThemeModeButton";

function App() {
  return (
    <>
      <ThemeModeButton />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
