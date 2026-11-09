/**
 * 운영자 로그인 안내와 폼을 배치한다.
 */
import { Navigate, useNavigate } from "react-router-dom";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AuthHeader from "@/components/auth/common/AuthHeader";
import { hasAdminSession } from "@/lib/admin";

export default function AdminLoginPage() {
  const navigate = useNavigate();

  if (hasAdminSession()) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = () => {
    navigate("/admin", { replace: true });
  };

  return (
    <main className="min-h-dvh px-6 py-10">
      <div className="mx-auto w-full max-w-sm">
        <AuthHeader
          title="운영자 콘솔"
          description="운영자 계정으로 로그인해 주세요."
        />
        <AdminLoginForm onLogin={handleLogin} />
      </div>
    </main>
  );
}
