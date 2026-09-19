// src/api/endpoints/logout.api.ts

import { apiClient } from "../client";

export async function logout(): Promise<void> {
  await apiClient.post("/auth/logout");
}