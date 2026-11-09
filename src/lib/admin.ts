/**
 * UI 검증용 운영자 계정과 같은 탭의 로그인 상태를 관리한다.
 */
const ADMIN_SESSION_KEY = "running-crew:admin-demo-session";

export function hasAdminSession() {
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true";
}

export function loginAdmin(username: string, password: string) {
  if (username !== "admin" || password !== "admin123") {
    return false;
  }

  window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  return true;
}

export function logoutAdmin() {
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
