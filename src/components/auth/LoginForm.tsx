import { LockKeyhole, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthInputField from "@/components/auth/AuthInputField";

interface LoginFormProps {
  showErrors?: boolean;
}

export default function LoginForm({ showErrors = false }: LoginFormProps) {
  return (
    <form
      className="mt-12"
      noValidate
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-3">
        <AuthInputField
          id="email"
          label="이메일"
          icon={Mail}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="이메일"
          error={showErrors ? "이메일을 입력해 주세요" : ""}
        />

        <AuthInputField
          id="password"
          label="비밀번호"
          icon={LockKeyhole}
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호"
          error={showErrors ? "비밀번호를 입력해 주세요" : ""}
        />
      </div>

      <Button
        type="button"
        className="bg-app-accent hover:bg-app-accent/90 mt-8 h-14 w-full cursor-pointer rounded-full text-base font-bold text-white"
      >
        로그인
      </Button>
    </form>
  );
}
