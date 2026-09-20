// src/features/dashboard/hooks/use-dashboard-stats.ts

import { useQuery } from "@tanstack/react-query";

import { getDashboardAnalytics } from "../api/endpoints/dashboard.api";

export function useDashboardStats(
  year: number,
  month: number,
) {
  return useQuery({
    // Changing the year/month automatically triggers a new request.
    queryKey: ["dashboard", "analytics", year, month],

    // Pass the selected year and month to the API.
    queryFn: () =>
      getDashboardAnalytics(year, month),
  });
}