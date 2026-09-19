// src/api/endpoints/dashboard.api.ts

import { apiClient } from "../client";

export type DashboardStats = {
  total_vehicles: number;
  service_records: number;
  scheduled: number;
  appointments: number;
};

export type DashboardStatsResponse = {
  status: boolean;
  message: string;
  data: DashboardStats;
};

export async function getDashboardStats(): Promise<DashboardStatsResponse> {
  const response = await apiClient.get<DashboardStatsResponse>(
    "/dashboard/stats",
  );

  return response.data;
}