import { createFileRoute } from "@tanstack/react-router";
import { Car, ClipboardList, Wrench, CalendarCheck } from "lucide-react";
import { useDashboardStats } from "../../hooks/use-dashboard-stats";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const { data, isLoading } = useDashboardStats();
  const stats = data?.data;
  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>

          <p className="mt-1 text-sm text-slate-500">
            Here's an overview of your vehicle service management.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

          <DashboardCard
            title="Scheduled"
            value={isLoading ? "..." : String(stats?.scheduled ?? 0)}
            description="Currently in service"
            icon={Wrench}
            badge="In Development"
          />

          <DashboardCard
            title="Appointments"
            value={isLoading ? "..." : String(stats?.appointments ?? 0)}
            description="Upcoming appointments"
            icon={CalendarCheck}
            badge="In Development"
          />
        </div>

        {/* Recent Records */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h3 className="font-semibold text-slate-900">
                Recent Vehicle Records
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Latest vehicle service activity
              </p>
            </div>
          </div>

          <div className="px-6 py-12 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-slate-300" />

            <p className="mt-3 text-sm font-medium text-slate-600">
              No records yet
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Vehicle service records will appear here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type DashboardCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
  badge?: string;
};

function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  badge,
}: DashboardCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {badge && (
        <div className="border-b border-red-100 bg-red-50 px-6 py-2">
          <p className="text-xs font-semibold text-red-600">
            {badge}
          </p>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              {title}
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {value}
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#002766]/10">
            <Icon className="h-5 w-5 text-[#002766]" />
          </div>
        </div>

        <p className="mt-4 text-xs text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}
