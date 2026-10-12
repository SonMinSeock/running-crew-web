import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Activity, LockKeyhole, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const showErrors = false;
  return (
    <main className="bg-app-bg text-app-text min-h-dvh px-6 py-10">
      <div className="mx-auto w-full max-w-sm">
        <header className="flex flex-col items-center text-center">
          <div className="bg-app-accent flex size-16 items-center justify-center rounded-full">
            <Activity
              className="size-8 text-white"
              strokeWidth={3}
              aria-hidden="true"
            />
          </div>
          <h1 className="mt-14 text-3xl font-bold">러닝 크루</h1>
          <p className="text-app-subtext mt-5 text-base">
            함께 달리면 더 멀리 갈 수 있어요
          </p>
        </header>
        <div className="mt-12 space-y-3">
          <div>
            <label htmlFor="email" className="sr-only">
              이메일
            </label>
            <div
              className={cn(
                "bg-app-card flex h-14 items-center gap-3 rounded-2xl border px-5 focus-within:ring-2",
                showErrors
                  ? "border-app-error focus-within:ring-app-error"
                  : "focus-within:ring-app-accent border-transparent",
              )}
            >
              <Mail
                className={cn(
                  "size-5 shrink-0",
                  showErrors ? "text-app-error" : "text-app-subtext",
                )}
                aria-hidden="true"
              />
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="이메일"
                aria-invalid={showErrors}
                aria-describedby={showErrors ? "email-error" : undefined}
                className="placeholder:text-app-subtext h-full w-full min-w-0 rounded-none border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 aria-invalid:ring-0 md:text-base dark:bg-transparent"
              />
            </div>
            {showErrors && (
              <p id="email-error" className="text-app-error mt-2 px-1 text-xs">
                이메일을 입력해 주세요
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <div
              className={cn(
                "bg-app-card flex h-14 items-center gap-3 rounded-2xl border px-5 focus-within:ring-2",
                showErrors
                  ? "border-app-error focus-within:ring-app-error"
                  : "focus-within:ring-app-accent border-transparent",
              )}
            >
              <LockKeyhole
                className={cn(
                  "size-5 shrink-0",
                  showErrors ? "text-app-error" : "text-app-subtext",
                )}
                aria-hidden="true"
              />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="비밀번호"
                aria-invalid={showErrors}
                aria-describedby={showErrors ? "password-error" : undefined}
                className="placeholder:text-app-subtext h-full w-full min-w-0 rounded-none border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 aria-invalid:ring-0 md:text-base dark:bg-transparent"
              />
            </div>
            {showErrors && (
              <p
                id="password-error"
                className="text-app-error mt-2 px-1 text-xs"
              >
                비밀번호를 입력해 주세요
              </p>
            )}
          </div>
        </div>
        <Button
          type="button"
          className="bg-app-accent hover:bg-app-accent/90 mt-8 h-14 w-full cursor-pointer rounded-full text-base font-bold text-white"
        >
          로그인
        </Button>
        <div className="mt-16">
          <p className="text-app-subtext text-center text-sm">
            빠르게 시작하기
          </p>
          <Button
            type="button"
            variant="outline"
            className="border-app-border bg-app-card text-app-text hover:bg-app-card hover:text-app-text dark:bg-app-card dark:hover:bg-app-card mt-5 h-14 w-full cursor-pointer gap-3 rounded-full text-base font-bold"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M21.6 12.23c0-.71-.06-1.39-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.98-4.32 2.98-7.36Z"
              />
              <path
                fill="#34A853"
                d="M12 22c2.7 0 4.96-.9 6.62-2.41l-3.24-2.51c-.9.6-2.05.96-3.38.96-2.6 0-4.8-1.76-5.59-4.12H3.07v2.59A10 10 0 0 0 12 22Z"
              />
              <path
                fill="#FBBC05"
                d="M6.41 13.92a6 6 0 0 1 0-3.84V7.49H3.07a10 10 0 0 0 0 9.02l3.34-2.59Z"
              />
              <path
                fill="#EA4335"
                d="M12 5.96c1.47 0 2.79.51 3.82 1.51l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.93 5.49l3.34 2.59C7.2 7.72 9.4 5.96 12 5.96Z"
              />
            </svg>
            Google로 시작하기
          </Button>
        </div>
        <p className="text-app-subtext mt-9 text-center text-sm">
          계정이 없으신가요?{" "}
          <Link
            to="/signup"
            className="text-app-accent focus-visible:outline-app-accent cursor-pointer rounded-sm text-base font-bold focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            회원가입
          </Link>
        </p>
      </div>
    </main>
  );
}
