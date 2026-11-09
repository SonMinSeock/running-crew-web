/**
 * 인증 화면과 주요 화면의 라우트를 구성한다.
 */
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth/AuthLayout";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import MainLayout from "./layouts/main/MainLayout";
import AdminLayout from "./layouts/admin/AdminLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminMembersPage from "./pages/admin/AdminMembersPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import AdminReportDetailPage from "./pages/admin/AdminReportDetailPage";
import CrewPage from "./pages/crew/CrewPage";
import CrewEditPage from "./pages/crew/CrewEditPage";
import CrewCreatePage from "./pages/crew/CrewCreatePage";
import CrewDetailPage from "./pages/crew/CrewDetailPage";
import CrewRunDetailPage from "./pages/crew/CrewRunDetailPage";
import CrewRunCreatePage from "./pages/crew/CrewRunCreatePage";
import CrewRunEditPage from "./pages/crew/CrewRunEditPage";
import CrewRunsPage from "./pages/crew/CrewRunsPage";
import CrewNoticeDetailPage from "./pages/crew/CrewNoticeDetailPage";
import CrewNoticeCreatePage from "./pages/crew/CrewNoticeCreatePage";
import CrewNoticeEditPage from "./pages/crew/CrewNoticeEditPage";
import CrewNoticesPage from "./pages/crew/CrewNoticesPage";
import CrewActivitiesPage from "./pages/crew/CrewActivitiesPage";
import CrewMembersPage from "./pages/crew/CrewMembersPage";

import RunningPage from "./pages/running/RunningPage";
import FeedPage from "./pages/feed/FeedPage";
import FeedCreatePage from "./pages/feed/FeedCreatePage";
import FeedDetailPage from "./pages/feed/FeedDetailPage";
import FeedEditPage from "./pages/feed/FeedEditPage";

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
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminMembersPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
          <Route path="reports/:reportId" element={<AdminReportDetailPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/running" element={<RunningPage />} />
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/feed/new" element={<FeedCreatePage />} />
          <Route path="/feed/:activityId/edit" element={<FeedEditPage />} />
          <Route path="/feed/:activityId" element={<FeedDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/crews" element={<CrewPage />} />
          <Route path="/crews/new" element={<CrewCreatePage />} />
          <Route path="/crews/:crewId" element={<CrewDetailPage />} />
          <Route path="/crews/:crewId/edit" element={<CrewEditPage />} />
          <Route path="/crews/:crewId/runs" element={<CrewRunsPage />} />
          <Route
            path="/crews/:crewId/runs/new"
            element={<CrewRunCreatePage />}
          />
          <Route
            path="/crews/:crewId/runs/:runId/edit"
            element={<CrewRunEditPage />}
          />
          <Route
            path="/crews/:crewId/runs/:runId"
            element={<CrewRunDetailPage />}
          />
          <Route path="/crews/:crewId/notices" element={<CrewNoticesPage />} />
          <Route
            path="/crews/:crewId/notices/new"
            element={<CrewNoticeCreatePage />}
          />
          <Route
            path="/crews/:crewId/notices/:noticeId/edit"
            element={<CrewNoticeEditPage />}
          />
          <Route
            path="/crews/:crewId/notices/:noticeId"
            element={<CrewNoticeDetailPage />}
          />
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
