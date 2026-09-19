import { useRouterState } from "@tanstack/react-router";
import { Menu, UserCircle } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/vehicles": "Search Vehicles",
  "/vehicles/records": "Vehicle Records",
  "/vehicles/add": "Add Vehicle",
};

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const title = pageTitles[pathname] ?? "Allen Car";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile / Tablet menu */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-[#002766] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <h1 className="text-lg font-semibold text-slate-900 sm:text-xl">
          {title}
        </h1>
      </div>

      {/* User */}
      <button
        type="button"
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50 sm:px-3"
      >
        <UserCircle className="h-8 w-8 text-[#002766] sm:h-9 sm:w-9" />

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-slate-900">
            User Account
          </p>

          <p className="text-xs text-slate-500">
            Administrator
          </p>
        </div>
      </button>
    </header>
  );
}