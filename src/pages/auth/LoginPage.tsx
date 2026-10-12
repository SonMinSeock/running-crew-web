import LoginForm from "@/components/auth/LoginForm";
import AuthHeader from "@/components/auth/AuthHeader";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import AuthFooter from "@/components/auth/AuthFooter";

export default function LoginPage() {
  const showErrors = false;
  return (
    <main className="min-h-dvh px-6 py-10">
      <div className="mx-auto w-full max-w-sm">
        <AuthHeader
          title="러닝 크루"
          description="함께 달리면 더 멀리 갈 수 있어요"
        />
        <LoginForm showErrors={showErrors} />
        <div className="mt-16">
          <p className="text-app-subtext text-center text-sm">
            빠르게 시작하기
          </p>
          <div className="mt-5">
            <GoogleLoginButton />
          </div>
        </div>
        <div className="mt-9">
          <AuthFooter
            message="계정이 없으신가요?"
            linkText="회원가입"
            to="/signup"
          />
        </div>
      </div>
    </main>
  );
}
