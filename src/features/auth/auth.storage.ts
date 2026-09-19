import type { LoginResponse } from "../../api/endpoints/login.api";

const AUTH_STORAGE_KEY = "ntier_auth";

export interface AuthSession {
  access_token: string;
  token_type: string;
  user_id: number;
  email: string;
  project: {
    id: number;
    name: string;
    slug: string;
  };
  role: {
    id: number;
    name: string;
    slug: string;
  };
}

export function setAuthSession(response: LoginResponse): void {
  const session: AuthSession = {
    access_token: response.access_token,
    token_type: response.token_type,
    user_id: response.user_id,
    email: response.email,
    project: response.project,
    role: response.role,
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function getAuthSession(): AuthSession | null {
  const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    return JSON.parse(storedSession) as AuthSession;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);

    return null;
  }
}

export function getAccessToken(): string | null {
  return getAuthSession()?.access_token ?? null;
}

export function setAccessToken(accessToken: string): void {
  const session = getAuthSession();

  if (!session) {
    return;
  }

  const updatedSession: AuthSession = {
    ...session,
    access_token: accessToken,
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedSession));
}

export function clearAuthSession(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return getAuthSession() !== null;
}
