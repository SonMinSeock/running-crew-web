/**
 * 로그인과 회원가입 화면 사이의 이동 안내를 표시한다.
 */
import { Link } from "react-router-dom";

interface AuthFooterProps {
  message: string;
  linkText: string;
  to: string;
}

export default function AuthFooter({ message, linkText, to }: AuthFooterProps) {
  return (
    <p className="text-app-subtext text-center text-sm">
      {message}{" "}
      <Link
        to={to}
        className="text-app-accent focus-visible:outline-app-accent cursor-pointer rounded-sm text-base font-bold focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        {linkText}
      </Link>
    </p>
  );
}
