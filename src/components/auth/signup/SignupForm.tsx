import { Button } from "@/components/ui/button";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import AuthInputField from "@/components/auth/common/AuthInputField";
import NicknameField from "./NicknameField";

interface SignupFormProps {
  showErrors?: boolean;
}

export default function SignupForm({ showErrors = false }: SignupFormProps) {
  return (
    <form
      className="mt-10"
      noValidate
      onSubmit={(event) => event.preventDefault()}
    >
      <NicknameField />
      <div className="mt-4 space-y-4">
        <AuthInputField
          id="name"
          label="이름"
          icon={UserRound}
          name="name"
          autoComplete="name"
          placeholder="이름"
          showLabel
          required
          error={showErrors ? "이름을 입력해 주세요" : ""}
        />
        <AuthInputField
          id="email"
          label="이메일"
          icon={Mail}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="이메일"
          showLabel
          required
          error={showErrors ? "이메일을 입력해 주세요" : ""}
        />
        <AuthInputField
          id="password"
          label="비밀번호"
          icon={LockKeyhole}
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호"
          showLabel
          required
          error={showErrors ? "비밀번호를 입력해 주세요" : ""}
        />
        <AuthInputField
          id="passwordConfirm"
          label="비밀번호 확인"
          icon={LockKeyhole}
          name="passwordConfirm"
          type="password"
          autoComplete="new-password"
          placeholder="비밀번호 확인"
          showLabel
          required
          error={showErrors ? "비밀번호를 다시 입력해 주세요" : ""}
        />
      </div>
      <Button
        type="submit"
        className="bg-app-accent hover:bg-app-accent/90 mt-7 h-14 w-full cursor-pointer rounded-full text-base font-bold text-white"
      >
        회원가입
      </Button>
    </form>
  );
}
