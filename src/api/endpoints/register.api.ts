import { apiClient } from "../client";

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  project_slug: string;
}

export interface RegisterResponse {
  message: string;
  user_id: number;
  email: string;
}

export async function register(
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(
    "/auth/register",
    payload,
  );

  return response.data;
}