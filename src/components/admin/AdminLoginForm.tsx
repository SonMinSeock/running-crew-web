/**
 * 운영자 아이디와 비밀번호를 입력받아 데모 로그인을 처리한다.
 */
import { useState, type FormEvent } from "react";
import { LockKeyhole, UserRound } from "lucide-react";
import AuthInputField from "@/components/auth/common/AuthInputField";
import { Button } from "@/components/ui/button";
import { loginAdmin } from "@/lib/admin";

interface AdminLoginFormProps {
  onLogin: () => void;
}

export default function AdminLoginForm({ onLogin }: AdminLoginFormProps) {
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    form: "",
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = String(formData.get("username") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!username || !password) {
      setErrors({
        username: username ? "" : "아이디를 입력해 주세요.",
        password: password ? "" : "비밀번호를 입력해 주세요.",
        form: "",
      });
      return;
    }

    if (!loginAdmin(username, password)) {
      setErrors({
        username: "",
        password: "",
        form: "아이디 또는 비밀번호를 확인해 주세요.",
      });
      return;
    }

    onLogin();
  };

  return (
    <form className="mt-12" noValidate onSubmit={handleSubmit}>
      <div className="space-y-3">
        <AuthInputField
          id="admin-username"
          label="아이디"
          icon={UserRound}
          name="username"
          autoComplete="username"
          placeholder="아이디"
          showLabel
          required
          error={errors.username}
        />
        <AuthInputField
          id="admin-password"
          label="비밀번호"
          icon={LockKeyhole}
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="비밀번호"
          showLabel
          required
          error={errors.password}
        />
      </div>

      {errors.form && (
        <p role="alert" className="text-app-error mt-3 text-sm">
          {errors.form}
        </p>
      )}

      <Button
        type="submit"
        className="bg-app-accent hover:bg-app-accent/90 mt-8 h-14 w-full cursor-pointer rounded-full text-base font-bold text-white"
      >
        로그인
      </Button>
    </form>
  );
}
