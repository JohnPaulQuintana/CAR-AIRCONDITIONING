import { createFileRoute } from "@tanstack/react-router";
import {
  Car,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Search,
  UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";

import type { VehicleRecord } from "../../../api/endpoints/vehicles.api";
import { VehicleDetailsDrawer } from "../../../components/vehicles/VehicleDetailsDrawer";
import { useVehicles } from "../../../hooks/useVehicles";

export const Route = createFileRoute("/_authenticated/vehicles/records")({
  component: VehicleRecordsPage,
});

function VehicleRecordsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleRecord | null>(
    null,
  );

  const pageSize = 10;

  const { data, isLoading, isFetching, isError } = useVehicles(
    page,
    pageSize,
    search,
  );

  const vehicles = data?.data ?? [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 800);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <>
      <section className="mx-auto mt-2 max-w-7xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Table Header */}
          <div className="border-b border-slate-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#002766]/10">
                <Car className="h-5 w-5 text-[#002766]" />
              </div>

              <div>
                <h1 className="text-lg font-bold text-slate-900">
                  Vehicle Records
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  View all registered vehicle service records.
                </p>
              </div>
            </div>
          </div>

          {/* Table Toolbar */}
          <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">
                All Vehicles
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {data?.total ?? 0}{" "}
                {(data?.total ?? 0) === 1 ? "vehicle" : "vehicles"} registered.
              </p>
            </div>

            <div className="flex w-full items-center gap-3 sm:w-auto">
              <div className="relative w-full sm:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                  placeholder="Search by plate number..."
                  className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#002766] focus:ring-2 focus:ring-[#002766]/10"
                />
              </div>

              <div className="hidden shrink-0 items-center gap-2 text-xs font-medium text-slate-500 sm:flex">
                <Clock3 className="h-4 w-4" />
                {isFetching ? "Updating..." : "All records"}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
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
                    Service Date
                  </th>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Added
                  </th>

                  <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      Loading vehicle records...
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-red-500"
                    >
                      Failed to load vehicle records.
                    </td>
                  </tr>
                ) : vehicles.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No vehicle records found.
                    </td>
                  </tr>
                ) : (
                  vehicles.map((vehicle) => (
                    <tr
                      key={vehicle.id}
                      className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/70"
                    >
                      {/* Vehicle */}
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

                      {/* Plate */}
                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-semibold tracking-wide text-slate-800">
                          {vehicle.data.plateNumber}
                        </span>
                      </td>

                      {/* Owner */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                            <UserRound className="h-4 w-4 text-slate-500" />
                          </div>

                          <div>
                            <p className="text-sm font-medium text-slate-700">
                              {vehicle.data.ownerName}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {vehicle.data.contactNumber}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Service Date */}
                      <td className="px-6 py-4">
                        {vehicle.data.services?.length ? (
                          <span className="text-sm text-slate-600">
                            {new Date(
                              vehicle.data.services[0].serviceDate,
                            ).toLocaleDateString([], {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">--</span>
                        )}
                      </td>

                      {/* Added */}
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

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedVehicle(vehicle)}
                          title="View vehicle"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#002766]/20 hover:bg-[#002766]/10 hover:text-[#002766]"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
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

      <VehicleDetailsDrawer
        open={selectedVehicle !== null}
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
      />
    </>
  );
}
