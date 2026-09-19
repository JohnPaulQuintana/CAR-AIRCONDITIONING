// src/features/dashboard/hooks/use-dashboard-stats.ts

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/endpoints/dashboard.api";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats,
  });
}