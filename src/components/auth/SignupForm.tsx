import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AtSign, LockKeyhole, Mail, Shuffle, UserRound } from "lucide-react";
import AuthInputField from "@/components/auth/AuthInputField";

interface SignupFormProps {
  showErrors?: boolean;
}

const DEFAULT_NICKNAMES = [
  "달리는곰",
  "새벽러너",
  "한강질주",
  "빠른발자국",
  "청량크루",
  "밤의러너",
  "속도광",
  "조깅마스터",
  "크루에이스",
  "러닝킹",
];

export default function SignupForm({ showErrors = false }: SignupFormProps) {
  const [defaultNickname, setDefaultNickname] = useState(() => {
    const randomIndex = Math.floor(Math.random() * DEFAULT_NICKNAMES.length);

    return DEFAULT_NICKNAMES[randomIndex];
  });

  const shuffleNickname = () => {
    const candidates = DEFAULT_NICKNAMES.filter(
      (nickname) => nickname !== defaultNickname,
    );
    const randomIndex = Math.floor(Math.random() * candidates.length);

    setDefaultNickname(candidates[randomIndex]);
  };

  return (
    <form
      className="mt-10"
      noValidate
      onSubmit={(event) => event.preventDefault()}
    >
      <div>
        <label
          htmlFor="nickname"
          className="text-app-subtext mb-2 flex items-center gap-2 text-sm"
        >
          닉네임
          <span className="bg-app-border rounded px-1.5 py-1 text-xs">
            선택
          </span>
        </label>

        <div className="bg-app-card focus-within:ring-app-accent flex h-14 items-center gap-3 rounded-2xl px-5 focus-within:ring-2">
          <AtSign
            className="text-app-subtext size-5 shrink-0"
            aria-hidden="true"
          />

          <Input
            id="nickname"
            name="nickname"
            autoComplete="nickname"
            placeholder={defaultNickname}
            className="placeholder:text-app-subtext h-full min-w-0 flex-1 rounded-none border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 md:text-base dark:bg-transparent"
          />

          <Button
            type="button"
            size="icon"
            variant="ghost"
            aria-label="기본 닉네임 변경"
            onClick={shuffleNickname}
            className="bg-app-border text-app-subtext hover:bg-app-border hover:text-app-text size-7 shrink-0 cursor-pointer rounded-full"
          >
            <Shuffle className="size-3.5" aria-hidden="true" />
          </Button>
        </div>

        <p className="text-app-subtext mt-2 px-1 text-xs">
          입력 안 하면 &quot;{defaultNickname}&quot;으로 시작해요
        </p>
      </div>
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="name" className="text-app-subtext mb-2 block text-sm">
            이름{" "}
            <span className="text-app-error" aria-hidden="true">
              *
            </span>
          </label>
          <AuthInputField
            id="name"
            label="이름"
            icon={UserRound}
            name="name"
            autoComplete="name"
            placeholder="이름"
            required
            error={showErrors ? "이름을 입력해 주세요" : ""}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-app-subtext mb-2 block text-sm"
          >
            이메일{" "}
            <span className="text-app-error" aria-hidden="true">
              *
            </span>
          </label>
          <AuthInputField
            id="email"
            label="이메일"
            icon={Mail}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="이메일"
            required
            error={showErrors ? "이메일을 입력해 주세요" : ""}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="text-app-subtext mb-2 block text-sm"
          >
            비밀번호{" "}
            <span className="text-app-error" aria-hidden="true">
              *
            </span>
          </label>
          <AuthInputField
            id="password"
            label="비밀번호"
            icon={LockKeyhole}
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호"
            required
            error={showErrors ? "비밀번호를 입력해 주세요" : ""}
          />
        </div>

        <div>
          <label
            htmlFor="passwordConfirm"
            className="text-app-subtext mb-2 block text-sm"
          >
            비밀번호 확인{" "}
            <span className="text-app-error" aria-hidden="true">
              *
            </span>
          </label>
          <AuthInputField
            id="passwordConfirm"
            label="비밀번호 확인"
            icon={LockKeyhole}
            name="passwordConfirm"
            type="password"
            autoComplete="new-password"
            placeholder="비밀번호 확인"
            required
            error={showErrors ? "비밀번호를 다시 입력해 주세요" : ""}
          />
        </div>
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
