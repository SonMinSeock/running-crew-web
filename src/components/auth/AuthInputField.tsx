import type { ComponentProps } from "react";
import type { LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AuthInputFieldProps extends ComponentProps<typeof Input> {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
}

export default function AuthInputField({
  id,
  label,
  icon: Icon,
  error = "",
  className,
  ...props
}: AuthInputFieldProps) {
  const hasError = Boolean(error);
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        className={cn(
          "bg-app-card flex h-14 items-center gap-3 rounded-2xl border px-5 focus-within:ring-2",
          hasError
            ? "border-app-error focus-within:ring-app-error"
            : "focus-within:ring-app-accent border-transparent",
        )}
      >
        <Icon
          className={cn(
            "size-5 shrink-0",
            hasError ? "text-app-error" : "text-app-subtext",
          )}
          aria-hidden="true"
        />
        <Input
          {...props}
          id={id}
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : ""}
          className={cn(
            "placeholder:text-app-subtext h-full w-full min-w-0 rounded-none border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 aria-invalid:ring-0 md:text-base dark:bg-transparent",
            className,
          )}
        />
      </div>
      {hasError && (
        <p id={errorId} className="text-app-error mt-2 px-1 text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
