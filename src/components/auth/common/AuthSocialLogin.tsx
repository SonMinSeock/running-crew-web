import GoogleLoginButton from "@/components/auth/common/GoogleLoginButton";

export default function AuthSocialLogin() {
  return (
    <div>
      <p className="text-app-subtext text-center text-sm">빠르게 시작하기</p>
      <div className="mt-5">
        <GoogleLoginButton />
      </div>
    </div>
  );
}
