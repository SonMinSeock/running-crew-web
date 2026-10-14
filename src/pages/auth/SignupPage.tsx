import AuthHeader from "@/components/auth/common/AuthHeader";
import SignupForm from "@/components/auth/signup/SignupForm";
import AuthFooter from "@/components/auth/common/AuthFooter";
import AuthSocialLogin from "@/components/auth/common/AuthSocialLogin";

export default function SignupPage() {
  const showErrors = true;
  return (
    <>
      <AuthHeader
        title="회원가입"
        description="크루와 함께 러닝을 시작해보세요"
      />
      <SignupForm showErrors={showErrors} />
      <div className="mt-12">
        <AuthSocialLogin />
      </div>
      <div className="mt-9">
        <AuthFooter
          message="이미 계정이 있나요?"
          linkText="로그인"
          to="/login"
        />
      </div>
    </>
  );
}
