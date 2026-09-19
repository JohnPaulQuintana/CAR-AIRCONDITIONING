import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/vehicles/")({
  component: VehiclesPage,
});

function VehiclesPage() {
  return (
    <div className="p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-slate-900">
          Search Vehicles
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Search and manage registered vehicles.
        </p>
      </div>
    </div>
  );
}