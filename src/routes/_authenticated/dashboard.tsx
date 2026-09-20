import { useMemo, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Car,
  ClipboardList,
  Eye,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";

import { useDashboardStats } from "../../hooks/use-dashboard-stats";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

/* ============================================================
   DASHBOARD TYPES
============================================================ */

type DashboardIncomePart = {
  id?: string | null;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

type DashboardIncomeRecord = {
  vehicle: string;
  plate_number: string;
  owner_name: string;
  service_id?: string | null;
  service_performed: string;
  service_income: number;
  parts: DashboardIncomePart[];
};

type DailyAnalytics = {
  date: string;
  income: number;
  expenses: number;
  balance: number;
  income_records: DashboardIncomeRecord[];
};

/* ============================================================
   DASHBOARD PAGE
============================================================ */

function DashboardPage() {
  /* ============================================================
     SELECTED MONTH
  ============================================================ */

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();

    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}`;
  });

  /* ============================================================
     SELECTED DAY
  ============================================================ */

  const [selectedDay, setSelectedDay] = useState<DailyAnalytics | null>(null);

  const [year, month] = selectedMonth.split("-").map(Number);

  /* ============================================================
     DASHBOARD ANALYTICS
  ============================================================ */

  const { data, isLoading } = useDashboardStats(year, month);

  const stats = data?.data;

  const financial = stats?.financial;

  /* ============================================================
     MONTH DISPLAY
  ============================================================ */

  const formattedMonth = useMemo(() => {
    const date = new Date(year, month - 1, 1);

    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [year, month]);

  /* ============================================================
     CURRENCY FORMAT
  ============================================================ */

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      minimumFractionDigits: 2,
    }).format(value);
  };

  /* ============================================================
     DATE FORMAT
  ============================================================ */

  const formatDate = (value: string) => {
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        {/* ========================================================
            WELCOME
        ======================================================== */}

        <div className="mt-4">
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>

          <p className="mt-1 text-sm text-slate-500">
            Here's an overview of your vehicle service management.
          </p>
        </div>

        {/* ========================================================
            OVERVIEW STATISTICS
        ======================================================== */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          <DashboardCard
            title="Total Vehicles"
            value={isLoading ? "..." : String(stats?.total_vehicles ?? 0)}
            description="Registered vehicles"
            icon={Car}
          />

          <DashboardCard
            title="Service Records"
            value={isLoading ? "..." : String(stats?.service_records ?? 0)}
            description="Total service records"
            icon={ClipboardList}
          />
        </div>

        {/* ========================================================
            MONTHLY FINANCIAL ANALYTICS
        ======================================================== */}

        <div className="mt-8">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Monthly Financial Analytics
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Track money coming in and expenses throughout the month.
            </p>
          </div>

          {/* ======================================================
              FINANCIAL CARDS
          ====================================================== */}

          <div className="grid gap-5 sm:grid-cols-2">
            <FinancialCard
              title="Revenue"
              value={isLoading ? "..." : formatCurrency(financial?.income ?? 0)}
              description={`Total income for ${formattedMonth}`}
              icon={TrendingUp}
              iconClassName="bg-emerald-50 text-emerald-600"
              valueClassName="text-emerald-600"
            />

            <FinancialCard
              title="Expenses"
              value={
                isLoading ? "..." : formatCurrency(financial?.expenses ?? 0)
              }
              description={`Total expenses for ${formattedMonth}`}
              icon={TrendingDown}
              iconClassName="bg-red-50 text-red-600"
              valueClassName="text-red-600"
            />
          </div>

          {/* ======================================================
              DAILY BREAKDOWN
          ====================================================== */}

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <h3 className="font-semibold text-slate-900">
                  Daily Breakdown
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Daily income and expenses for {formattedMonth}.
                </p>
              </div>

              {/* ==================================================
                  MONTH SELECTOR
              ================================================== */}

              <label className="flex w-full cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:w-auto">
                <CalendarDays className="h-4 w-4 shrink-0 text-slate-500" />

                <input
                  type="month"
                  value={selectedMonth}
                  onChange={(event) => setSelectedMonth(event.target.value)}
                  className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none sm:w-auto"
                />
              </label>
            </div>

            {/* ==================================================
                DESKTOP TABLE
            ================================================== */}

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/70">
                    <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Date
                    </th>

                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Money Coming In
                    </th>

                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Expenses
                    </th>

                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Daily Balance
                    </th>

                    <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="text-sm text-slate-400">
                          Loading analytics...
                        </div>
                      </td>
                    </tr>
                  ) : financial?.daily?.length ? (
                    financial.daily.map((day) => (
                      <DailyTableRow
                        key={day.date}
                        day={day}
                        formatCurrency={formatCurrency}
                        formatDate={formatDate}
                        onView={() => setSelectedDay(day)}
                      />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <EmptyDailyState />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* ==================================================
                MOBILE LIST
            ================================================== */}

            <div className="md:hidden">
              {isLoading ? (
                <div className="px-4 py-12 text-center">
                  <div className="text-sm text-slate-400">
                    Loading analytics...
                  </div>
                </div>
              ) : financial?.daily?.length ? (
                <div className="divide-y divide-slate-100">
                  {financial.daily.map((day) => (
                    <DailyMobileCard
                      key={day.date}
                      day={day}
                      formatCurrency={formatCurrency}
                      formatDate={formatDate}
                      onView={() => setSelectedDay(day)}
                    />
                  ))}
                </div>
              ) : (
                <div className="px-4 py-12 text-center">
                  <EmptyDailyState />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================
          DAILY OVERVIEW DRAWER
      ========================================================== */}

      {selectedDay && (
        <DailyOverviewDrawer
          day={selectedDay}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          onClose={() => setSelectedDay(null)}
        />
      )}
    </div>
  );
}

/* ============================================================
   DESKTOP DAILY ROW
============================================================ */

type DailyRowProps = {
  day: DailyAnalytics;
  formatCurrency: (value: number) => string;
  formatDate: (value: string) => string;
  onView: () => void;
};

function DailyTableRow({
  day,
  formatCurrency,
  formatDate,
  onView,
}: DailyRowProps) {
  return (
    <tr className="border-b border-slate-100 last:border-0">
      <td className="px-6 py-4 text-sm font-medium text-slate-700">
        {formatDate(day.date)}
      </td>

      <td className="px-6 py-4 text-right text-sm font-semibold text-emerald-600">
        {formatCurrency(day.income)}
      </td>

      <td className="px-6 py-4 text-right text-sm font-semibold text-red-600">
        {formatCurrency(day.expenses)}
      </td>

      <td
        className={`px-6 py-4 text-right text-sm font-bold ${
          day.balance >= 0 ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {formatCurrency(day.balance)}
      </td>

      <td className="px-6 py-4 text-right">
        <button
          type="button"
          onClick={onView}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
      </td>
    </tr>
  );
}

/* ============================================================
   MOBILE DAILY CARD
============================================================ */

function DailyMobileCard({
  day,
  formatCurrency,
  formatDate,
  onView,
}: DailyRowProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {formatDate(day.date)}
          </p>

          <p className="mt-1 text-xs text-slate-400">Daily financial summary</p>
        </div>

        <button
          type="button"
          onClick={onView}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-emerald-50 p-3">
          <p className="text-[11px] font-medium text-emerald-700">
            Money Coming In
          </p>

          <p className="mt-1 text-sm font-bold text-emerald-600">
            {formatCurrency(day.income)}
          </p>
        </div>

        <div className="rounded-xl bg-red-50 p-3">
          <p className="text-[11px] font-medium text-red-700">Expenses</p>

          <p className="mt-1 text-sm font-bold text-red-600">
            {formatCurrency(day.expenses)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 px-3 py-3">
        <span className="text-xs font-medium text-slate-500">
          Daily Balance
        </span>

        <span
          className={`text-sm font-bold ${
            day.balance >= 0 ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {formatCurrency(day.balance)}
        </span>
      </div>
    </div>
  );
}

/* ============================================================
   DAILY OVERVIEW DRAWER
============================================================ */

/* ============================================================
   DAILY OVERVIEW DRAWER
============================================================ */

type DailyOverviewDrawerProps = {
  day: DailyAnalytics;
  formatCurrency: (value: number) => string;
  formatDate: (value: string) => string;
  onClose: () => void;
};

function DailyOverviewDrawer({
  day,
  formatCurrency,
  formatDate,
  onClose,
}: DailyOverviewDrawerProps) {
  const [isClosing, setIsClosing] = useState(false);

  /* ============================================================
     LOCK BACKGROUND SCROLL
  ============================================================ */

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  /* ============================================================
     CLOSE WITH ANIMATION
  ============================================================ */

  const handleClose = () => {
    if (isClosing) {
      return;
    }

    setIsClosing(true);

    window.setTimeout(() => {
      onClose();
    }, 250);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* ======================================================
          BACKDROP
      ====================================================== */}

      <button
        type="button"
        aria-label="Close daily overview"
        onClick={handleClose}
        className={`absolute inset-0 h-full w-full cursor-default bg-slate-900/20 backdrop-blur-[2px] ${
          isClosing ? "animate-fade-out" : "animate-fade-in"
        }`}
      />

      {/* ======================================================
          DRAWER
      ====================================================== */}

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l-4 border-primary bg-white shadow-2xl ${
          isClosing ? "animate-slide-out" : "animate-slide-in"
        }`}
      >
        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="text-xs font-medium text-slate-400">Daily Overview</p>

            <h3 className="mt-1 text-lg font-semibold text-slate-900">
              {formatDate(day.date)}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ====================================================
            DRAWER CONTENT
        ==================================================== */}

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="p-5">
            {/* ==================================================
                DAILY SUMMARY
            ================================================== */}

            <div>
              <div className="mb-3">
                <h4 className="text-sm font-semibold text-slate-900">
                  Daily Summary
                </h4>

                <p className="mt-1 text-xs text-slate-400">
                  Financial activity recorded for this date.
                </p>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                {/* Income */}

                <div className="flex items-center justify-between px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>

                    <span className="text-sm text-slate-600">Income</span>
                  </div>

                  <span className="text-sm font-semibold text-emerald-600">
                    {formatCurrency(day.income)}
                  </span>
                </div>

                {/* Expenses */}

                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <ArrowDownRight className="h-4 w-4" />
                    </div>

                    <span className="text-sm text-slate-600">Expenses</span>
                  </div>

                  <span className="text-sm font-semibold text-red-600">
                    {formatCurrency(day.expenses)}
                  </span>
                </div>

                {/* Balance */}

                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3.5">
                  <span className="text-sm font-semibold text-slate-700">
                    Daily Balance
                  </span>

                  <span
                    className={`text-sm font-bold ${
                      day.balance >= 0 ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {formatCurrency(day.balance)}
                  </span>
                </div>
              </div>
            </div>

            {/* ==================================================
                INCOME DETAILS
            ================================================== */}

            <div className="mt-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900">
                    Income Details
                  </h4>

                  <p className="mt-1 text-xs text-slate-400">
                    Vehicles and parts that generated income.
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {day.income_records.length}{" "}
                  {day.income_records.length === 1 ? "service" : "services"}
                </span>
              </div>

              {day.income_records.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
                  <Car className="mx-auto h-8 w-8 text-slate-300" />

                  <p className="mt-2 text-sm font-medium text-slate-600">
                    No income records
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    No vehicle services generated income on this date.
                  </p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {day.income_records.map((record, index) => (
                    <IncomeRecordCard
                      key={
                        record.service_id ?? `${record.plate_number}-${index}`
                      }
                      record={record}
                      formatCurrency={formatCurrency}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================================
          DRAWER ANIMATIONS
      ======================================================== */}

      <style>
        {`
          @keyframes drawer-slide-in {
            from {
              transform: translateX(100%);
            }

            to {
              transform: translateX(0);
            }
          }

          @keyframes drawer-slide-out {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(100%);
            }
          }

          @keyframes drawer-fade-in {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes drawer-fade-out {
            from {
              opacity: 1;
            }

            to {
              opacity: 0;
            }
          }

          .animate-slide-in {
            animation: drawer-slide-in 250ms ease-out forwards;
          }

          .animate-slide-out {
            animation: drawer-slide-out 250ms ease-in forwards;
          }

          .animate-fade-in {
            animation: drawer-fade-in 250ms ease-out forwards;
          }

          .animate-fade-out {
            animation: drawer-fade-out 250ms ease-in forwards;
          }
        `}
      </style>
    </div>
  );
}
/* ============================================================
   INCOME RECORD CARD
============================================================ */

type IncomeRecordCardProps = {
  record: DashboardIncomeRecord;
  formatCurrency: (value: number) => string;
};

function IncomeRecordCard({ record, formatCurrency }: IncomeRecordCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {/* ======================================================
          VEHICLE INFORMATION
      ====================================================== */}

      <div className="border-b border-slate-100 bg-slate-50 px-4 py-4">
        <div className="flex items-start gap-3">
          {/* Vehicle Icon */}

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002766]/10">
            <Car className="h-5 w-5 text-[#002766]" />
          </div>

          {/* Vehicle Details */}

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-slate-900">
              {record.vehicle || "Unknown Vehicle"}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-xs font-semibold text-[#002766]">
                {record.plate_number || "No plate number"}
              </span>

              {record.owner_name && (
                <>
                  <span className="text-slate-300">•</span>

                  <span className="truncate text-xs text-slate-500">
                    {record.owner_name}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Service Income */}

          <div className="shrink-0 text-right">
            <p className="text-xs text-slate-400">Service Total</p>

            <p className="mt-1 text-sm font-bold text-emerald-600">
              {formatCurrency(record.service_income)}
            </p>
          </div>
        </div>
      </div>

      {/* ======================================================
          SERVICE INFORMATION
      ====================================================== */}

      <div className="px-4 py-4">
        <div className="flex items-start gap-2">
          <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Service
            </p>

            <p className="mt-1 text-sm text-slate-700">
              {record.service_performed || "Service details not provided"}
            </p>
          </div>
        </div>

        {/* ====================================================
            PARTS
        ==================================================== */}

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Parts & Charges
          </p>

          {record.parts.length > 0 ? (
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-200">
              {record.parts.map((part, index) => (
                <div
                  key={part.id ?? `${part.name}-${index}`}
                  className={`px-3 py-3 ${
                    index !== record.parts.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700">
                        {part.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {part.quantity} × {formatCurrency(part.price)}
                      </p>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-slate-900">
                      {formatCurrency(part.total)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-2 rounded-xl border border-dashed border-slate-200 px-3 py-4 text-center">
              <p className="text-xs text-slate-400">
                No parts recorded for this service.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyDailyState() {
  return (
    <>
      <Wallet className="mx-auto h-9 w-9 text-slate-300" />

      <p className="mt-3 text-sm font-medium text-slate-600">
        No financial records yet
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Daily income and expenses will appear here.
      </p>
    </>
  );
}

/* ============================================================
   GENERAL DASHBOARD CARD
============================================================ */

type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-3 text-3xl font-bold text-slate-900">{value}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#002766]/10">
          <Icon className="h-5 w-5 text-[#002766]" />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">{description}</p>
    </div>
  );
}

/* ============================================================
   FINANCIAL CARD
============================================================ */

type FinancialCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  iconClassName: string;
  valueClassName: string;
};

function FinancialCard({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  valueClassName,
}: FinancialCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className={`mt-3 text-3xl font-bold ${valueClassName}`}>{value}</p>

          <p className="mt-2 text-xs text-slate-400">{description}</p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClassName}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
