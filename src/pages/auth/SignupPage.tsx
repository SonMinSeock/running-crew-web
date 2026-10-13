import AuthHeader from "@/components/auth/AuthHeader";
import SignupForm from "@/components/auth/SignupForm";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import AuthFooter from "@/components/auth/AuthFooter";

export default function SignupPage() {
  const showErrors = false;
  return (
    <main className="min-h-dvh px-6 py-10">
      <div className="mx-auto w-full max-w-sm">
        <AuthHeader
          title="회원가입"
          description="크루와 함께 러닝을 시작해보세요"
        />

        <SignupForm showErrors={showErrors} />

        <div className="mt-12">
          <p className="text-app-subtext text-center text-sm">
            빠르게 시작하기
          </p>
          <div className="mt-5">
            <GoogleLoginButton />
          </div>
        </div>

        <div className="mt-9">
          <AuthFooter
            message="이미 계정이 있나요?"
            linkText="로그인"
            to="/login"
          />
        </div>
      </div>
    </main>
  );
}
