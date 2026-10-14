import { useState } from "react";
import { AtSign, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function NicknameField() {
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
    <div>
      <label
        htmlFor="nickname"
        className="text-app-subtext mb-2 flex items-center gap-2 text-sm"
      >
        닉네임
        <span className="bg-app-border rounded px-1.5 py-1 text-xs">선택</span>
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
  );
}
