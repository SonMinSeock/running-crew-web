/**
 * 한국어 달력 팝업과 시·분 선택으로 한국 시간 기준 일정 입력 UI를 제공한다.
 */
import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { ko } from "react-day-picker/locale";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function RunDateTimeFields() {
  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const triggerClassName =
    "bg-app-card border-app-border text-app-text focus-visible:border-app-accent focus-visible:ring-app-accent/40 w-full min-w-0 rounded-xl px-3 text-sm data-[size=default]:h-12";

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-3">
          <label htmlFor="run-create-date" className="text-sm font-semibold">
            날짜{" "}
            <span aria-hidden="true" className="text-app-error">
              *
            </span>
            <span className="sr-only"> (필수)</span>
          </label>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                id="run-create-date"
                type="button"
                variant="outline"
                aria-describedby="run-create-timezone"
                className={cn(
                  "bg-app-card border-app-border h-12 w-full min-w-0 justify-between rounded-xl px-3",
                  !date && "text-app-subtext",
                )}
              >
                <span className="min-w-0 truncate">
                  {date ? dateFormatter.format(date) : "날짜를 선택해주세요"}
                </span>
                <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="bg-app-card border-app-border text-app-text w-auto max-w-[calc(100vw-2rem)] rounded-2xl border p-2"
            >
              <Calendar
                mode="single"
                locale={ko}
                timeZone="Asia/Seoul"
                weekStartsOn={1}
                selected={date}
                defaultMonth={date}
                autoFocus
                onSelect={(value) => {
                  setDate(value);
                  if (value) setIsCalendarOpen(false);
                }}
                className="bg-app-card text-app-text [&_button[data-selected-single=true]]:bg-app-accent [&_button[data-selected-single=true]]:text-app-bg [--cell-size:2.25rem]"
                classNames={{
                  today: "rounded-md bg-app-accent/10 text-app-accent",
                  weekday: "text-app-subtext flex-1 text-xs font-normal",
                  outside: "text-app-subtext opacity-50",
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <fieldset className="min-w-0">
          <legend className="mb-3 text-sm font-semibold">
            시간{" "}
            <span aria-hidden="true" className="text-app-error">
              *
            </span>
            <span className="sr-only"> (필수)</span>
          </legend>
          <div className="grid grid-cols-2 gap-2">
            <Select value={hour} onValueChange={setHour}>
              <SelectTrigger
                aria-label="시 선택"
                aria-describedby="run-create-timezone"
                className={triggerClassName}
              >
                <SelectValue placeholder="시 선택" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-app-card border-app-border text-app-text max-h-64"
              >
                {Array.from({ length: 24 }, (_, index) =>
                  String(index).padStart(2, "0"),
                ).map((value) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className="focus:bg-app-accent/10 focus:text-app-accent"
                  >
                    {value}시
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={minute} onValueChange={setMinute}>
              <SelectTrigger
                aria-label="분 선택"
                aria-describedby="run-create-timezone"
                className={triggerClassName}
              >
                <SelectValue placeholder="분 선택" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="bg-app-card border-app-border text-app-text max-h-64"
              >
                {Array.from({ length: 60 }, (_, index) =>
                  String(index).padStart(2, "0"),
                ).map((value) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className="focus:bg-app-accent/10 focus:text-app-accent"
                  >
                    {value}분
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </fieldset>
      </div>
      <p id="run-create-timezone" className="text-app-subtext text-xs">
        날짜와 시간은 한국 시간 기준입니다. 시간은 24시간제로 선택해주세요.
      </p>
    </div>
  );
}
