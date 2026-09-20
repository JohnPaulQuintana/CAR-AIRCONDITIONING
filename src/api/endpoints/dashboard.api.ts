// src/api/endpoints/dashboard.api.ts

import { apiClient } from "../client";

/* ============================================================
   INCOME PART
============================================================ */

export type DashboardIncomePart = {
  id?: string | null;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

/* ============================================================
   DAILY INCOME RECORD
============================================================ */

export type DashboardIncomeRecord = {
  vehicle: string;
  plate_number: string;
  owner_name: string;
  service_id?: string | null;
  service_performed: string;
  service_income: number;
  parts: DashboardIncomePart[];
};

/* ============================================================
   DAILY ANALYTICS
============================================================ */

export type DashboardDailyAnalytics = {
  date: string;
  income: number;
  expenses: number;
  balance: number;

  // Details used by the daily overview drawer
  income_records: DashboardIncomeRecord[];
};

/* ============================================================
   FINANCIAL ANALYTICS
============================================================ */

export type DashboardFinancialAnalytics = {
  month: string;
  income: number;
  expenses: number;
  balance: number;
  daily: DashboardDailyAnalytics[];
};

/* ============================================================
   DASHBOARD ANALYTICS
============================================================ */

export type DashboardAnalytics = {
  total_vehicles: number;
  service_records: number;
  financial: DashboardFinancialAnalytics;
};

/* ============================================================
   API RESPONSE
============================================================ */

export type DashboardAnalyticsResponse = {
  status: boolean;
  message: string;
  data: DashboardAnalytics;
};

/* ============================================================
   GET DASHBOARD ANALYTICS
============================================================ */

export async function getDashboardAnalytics(
  year: number,
  month: number,
): Promise<DashboardAnalyticsResponse> {
  const response = await apiClient.get<DashboardAnalyticsResponse>(
    "/dashboard/analytics",
    {
      params: {
        year,
        month,
      },
    },
  );

  return response.data;
}