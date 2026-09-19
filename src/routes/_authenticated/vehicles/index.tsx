import { createFileRoute } from "@tanstack/react-router";
import { Car, Search, Wrench } from "lucide-react";

export const Route = createFileRoute("/_authenticated/vehicles/")({
  component: VehiclesPage,
});

function VehiclesPage() {
  return (
    <div className="md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="relative">
          <span className="absolute -top-3 left-0 flex items-center gap-1.5 rounded-md bg-amber-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            <Wrench className="h-3 w-3" />
            In Development
          </span>

          <div className="pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#002766]/10 text-[#002766]">
                <Car className="h-5 w-5" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Search Vehicles
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Search and manage registered vehicles.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Development Card */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-12 text-center">
            {/* Icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#002766]/5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#002766]/10 text-[#002766]">
                <Search className="h-7 w-7" />
              </div>
            </div>

            <h2 className="mt-6 text-lg font-semibold text-slate-900">
              Vehicle Search is being developed
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              This feature will allow you to quickly search registered
              vehicles, view vehicle information, and manage their records.
            </p>

            {/* Planned features */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                Vehicle Search
              </span>

              <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                Vehicle Records
              </span>

              <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                Customer History
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}