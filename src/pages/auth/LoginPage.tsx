import LoginForm from "@/components/auth/login/LoginForm";
import AuthHeader from "@/components/auth/common/AuthHeader";
import AuthFooter from "@/components/auth/common/AuthFooter";
import AuthSocialLogin from "@/components/auth/common/AuthSocialLogin";

export default function LoginPage() {
  const showErrors = false;
  return (
    <>
      <AuthHeader
        title="러닝 크루"
        description="함께 달리면 더 멀리 갈 수 있어요"
      />
      <LoginForm showErrors={showErrors} />
      <div className="mt-16">
        <AuthSocialLogin />
      </div>
      <div className="mt-9">
        <AuthFooter
          message="계정이 없으신가요?"
          linkText="회원가입"
          to="/signup"
        />
      </div>
    </>
  );
}
