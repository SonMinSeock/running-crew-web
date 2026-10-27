import type { ComponentProps } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends ComponentProps<typeof Input> {
  id: string;
  label: string;
}

export default function SearchInput({
  id,
  label,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="bg-app-card border-app-border focus-within:ring-app-accent flex h-12 items-center gap-3 rounded-2xl border px-4 focus-within:ring-2">
        <Search
          className="text-app-subtext size-5 shrink-0"
          aria-hidden="true"
        />
        <Input
          {...props}
          id={id}
          type="search"
          className={cn(
            "placeholder:text-app-subtext h-full border-0 bg-transparent p-0 text-base shadow-none focus-visible:ring-0 md:text-base dark:bg-transparent",
            className,
          )}
        />
      </div>
    </div>
  );
}
