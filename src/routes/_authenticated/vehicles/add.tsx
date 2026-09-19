import { createFileRoute } from "@tanstack/react-router";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Plus,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { AddVehicleDrawer } from "../../../components/vehicles/AddVehicleDrawer";
import { useTodayVehicles } from "../../../hooks/useVehicles";

export const Route = createFileRoute("/_authenticated/vehicles/add")({
  component: AddVehiclePage,
});

function AddVehiclePage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);

  const pageSize = 10;

  const { data, isLoading, isFetching, isError } = useTodayVehicles(
    page,
    pageSize,
  );

  const vehicles = data?.data ?? [];

  return (
    <>
      <section className="mx-auto mt-2 max-w-7xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002766]/10">
                  <Car className="h-5 w-5 text-[#002766]" />
                </div>

                <div>
                  <h1 className="hidden text-lg font-bold text-slate-900 md:flex">
                    Recently Added Vehicles
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Vehicles recently registered in the workshop.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#002766] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#001d4d]"
              >
                <Plus className="h-4 w-4" />
                Add Vehicle
              </button>
            </div>
          </div>

          {/* Table Toolbar */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                Today's Registrations
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {data?.total ?? 0} vehicles registered today.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Clock3 className="h-4 w-4" />

              {isFetching ? "Updating..." : "Updated today"}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Vehicle
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Plate Number
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Owner
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Contact
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date Time
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      Loading vehicles...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-red-500"
                    >
                      Failed to load today's vehicles.
                    </td>
                  </tr>
                ) : vehicles.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No vehicles registered today.
                    </td>
                  </tr>
                ) : (
                  vehicles.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002766]/10">
                            <Car className="h-5 w-5 text-[#002766]" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {vehicle.data.make} {vehicle.data.model}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-500">
                              {vehicle.data.year || "Year not provided"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold tracking-wide text-slate-800">
                          {vehicle.data.plateNumber}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                            <UserRound className="h-4 w-4 text-slate-500" />
                          </div>

                          <span className="text-sm font-medium text-slate-700">
                            {vehicle.data.ownerName}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {vehicle.data.contactNumber}
                      </td>

                      <td className="px-6 py-4">
                        {vehicle.created_at ? (
                          <>
                            <span className="text-sm font-medium text-slate-700">
                              {new Date(vehicle.created_at).toLocaleTimeString(
                                [],
                                {
                                  hour: "numeric",
                                  minute: "2-digit",
                                },
                              )}
                            </span>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {new Date(vehicle.created_at).toLocaleDateString(
                                [],
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </>
                        ) : (
                          <span className="text-sm text-slate-400">--</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
            <p className="text-sm text-slate-500">
              Page {data?.page ?? page} of {data?.total_pages ?? 0}
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((current) => current - 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                disabled={!data || page >= data.total_pages || isFetching}
                onClick={() => setPage((current) => current + 1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <AddVehicleDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
