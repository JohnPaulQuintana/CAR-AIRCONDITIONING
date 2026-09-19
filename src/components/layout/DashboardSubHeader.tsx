import { useNavigate, useRouterState } from "@tanstack/react-router";
import { ClipboardList, Search } from "lucide-react";
import mascot from "../../assets/images/mascot-trans.png";

export function DashboardSubHeader() {
  const navigate = useNavigate();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const getHeaderContent = () => {
    switch (pathname) {
      case "/vehicles":
        return {
          title: "Vehicle Management",
          description:
            "Search, register and manage vehicle information for your workshop.",
        };

      case "/vehicles/records":
        return {
          title: "Vehicle Records",
          description:
            "View and manage all registered vehicle service records and history.",
        };

      default:
        return {
          title: "Workshop Management System",
          description:
            "Manage vehicle records, technicians, customer information and complete service history from one professional dashboard.",
        };
    }
  };

  const { title, description } = getHeaderContent();

  return (
    <section className="relative isolate overflow-hidden rounded-2xl bg-primary text-white">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      {/* Desktop */}
      <div className="hidden min-h-[250px] items-end sm:flex">
        {/* Mascot */}
        <div className="flex h-full shrink-0 items-end">
          <img
            src={mascot}
            alt="Allen Car mascot"
            className="w-60 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Content */}
        <div className="max-w-2xl pb-8 pt-5">
          <h2 className="text-3xl font-bold leading-tight">
            {title}
          </h2>

          <p className="mt-2 text-lg leading-8 text-white/70">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => navigate({ to: "/vehicles" })}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
            >
              <Search className="h-4 w-4" />
              <span>Quick Search</span>
            </button>

            <button
              type="button"
              onClick={() => navigate({ to: "/vehicles/records" })}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur transition hover:bg-white/20"
            >
              <ClipboardList className="h-4 w-4" />
              <span>Service Records</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex flex-col p-5 sm:hidden">
        {/* Mascot + Title */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex shrink-0 flex-col items-center text-center">
            <img
              src={mascot}
              alt="Allen Car mascot"
              className="w-60 object-contain drop-shadow-2xl"
            />

            <h2 className="-mt-4 z-10 w-56 bg-transparent text-xl font-bold leading-none">
              {title}
            </h2>
          </div>
        </div>

        <p className="mt-3 text-center text-sm leading-6 text-white/70">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => navigate({ to: "/vehicles" })}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm backdrop-blur transition hover:bg-white/20"
          >
            <Search className="h-4 w-4 shrink-0" />
            Search
          </button>

          <button
            type="button"
            onClick={() => navigate({ to: "/vehicles/records" })}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-sm backdrop-blur transition hover:bg-white/20"
          >
            <ClipboardList className="h-4 w-4" />
            Records
          </button>
        </div>
      </div>
    </section>
  );
}