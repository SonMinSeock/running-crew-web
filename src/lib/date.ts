/**
 * 화면 표시용 날짜·시간 포맷터와 일정 폼의 한국 시간 초기값 변환 함수를 제공한다.
 */

const seoulDateFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

// 기기 시간대와 관계없이 두 시각이 한국 기준 같은 날짜인지 판별한다.
export function isSameSeoulDate(first: Date, second: Date) {
  return seoulDateFormatter.format(first) === seoulDateFormatter.format(second);
}

// 기기 시간대와 관계없이 한국 시간을 사용하고, 활동·공지 목록에 월·일을 표시한다.
export const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
});

// 러닝 목록·다음 일정·프로필 통계에 월·일·요일을 표시한다.
export const runDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  weekday: "short",
});

// 러닝 목록·상세·다음 일정에 오전·오후를 포함한 시·분을 표시한다.
export const timeFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

// 댓글·프로필 활동·가입 크루의 다음 일정에 월·일·요일과 시간을 함께 표시한다.
export const runDateTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
  weekday: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

// 상세 화면에서 연도를 포함한 한국 날짜를 표시한다.
export const runDetailDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "short",
});

// 공지 상세의 작성 시각을 연도와 함께 한국 시간으로 표시한다.
export const noticeDateTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

// 일정 폼의 Select 값에 맞춰 시·분을 두 자리로 변환하고 자정은 00시로 처리한다.
const runFormTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Seoul",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

// 일정 시각에서 기기 시간대에 영향을 받지 않는 한국 시간의 시·분을 추출한다.
export function getRunFormTime(startsAt?: string) {
  // 생성 화면처럼 초기 시각이 없으면 시·분을 미선택 상태로 처리한다.
  if (!startsAt) return { hour: "", minute: "" };

  const date = new Date(startsAt);

  // 해석할 수 없는 날짜는 포맷터에 전달하지 않고 빈 초기값으로 처리한다.
  if (Number.isNaN(date.getTime())) {
    return { hour: "", minute: "" };
  }

  // 한국 시간으로 변환한 결과를 시·구분자·분 등의 조각으로 분리한다.
  const parts = runFormTimeFormatter.formatToParts(date);

  // 시·분 조각의 값을 추출하고 해당 조각이 없으면 빈 문자열을 반환한다.
  return {
    hour: parts.find((part) => part.type === "hour")?.value ?? "",
    minute: parts.find((part) => part.type === "minute")?.value ?? "",
  };
}
