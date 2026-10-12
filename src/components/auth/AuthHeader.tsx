import { Activity } from "lucide-react";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export default function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <div className="bg-app-accent flex size-16 items-center justify-center rounded-full">
        <Activity
          className="size-8 text-white"
          strokeWidth={3}
          aria-hidden="true"
        />
      </div>
      <h1 className="mt-14 text-3xl font-bold">{title}</h1>
      <p className="text-app-subtext mt-5 text-base">{description}</p>
    </header>
  );
}
