import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth/AuthLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import MainLayout from "./layouts/main/MainLayout";
import CrewPage from "./pages/crew/CrewPage";
import CrewDetailPage from "./pages/crew/CrewDetailPage";
import CrewRunsPage from "./pages/crew/CrewRunsPage";
import CrewNoticesPage from "./pages/crew/CrewNoticesPage";
import CrewActivitiesPage from "./pages/crew/CrewActivitiesPage";
import CrewMembersPage from "./pages/crew/CrewMembersPage";

import RunningPage from "./pages/running/RunningPage";
import FeedPage from "./pages/feed/FeedPage";

import ProfilePage from "./pages/profile/ProfilePage";
import ProfileEditPage from "./pages/profile/ProfileEditPage";

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
          <Route path="/running" element={<RunningPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/crews" element={<CrewPage />} />
          <Route path="/crews/:crewId" element={<CrewDetailPage />} />
          <Route path="/crews/:crewId/runs" element={<CrewRunsPage />} />
          <Route path="/crews/:crewId/notices" element={<CrewNoticesPage />} />
          <Route
            path="/crews/:crewId/activities"
            element={<CrewActivitiesPage />}
          />
          <Route path="/crews/:crewId/members" element={<CrewMembersPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
