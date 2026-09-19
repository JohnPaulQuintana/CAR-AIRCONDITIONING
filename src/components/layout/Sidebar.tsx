import { Link, useRouterState } from "@tanstack/react-router";
import {
  ClipboardList,
  LayoutDashboard,
  LogOut,
  // Menu,
  Plus,
  Search,
  X,
} from "lucide-react";
import { logout } from "../../api/endpoints/logout.api";
import { clearAuthSession } from "../../features/auth/auth.storage";

type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isDashboard = pathname === "/dashboard";
  const isVehicles = pathname.startsWith("/vehicles");

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Even if the backend request fails,
      // clear the local authentication session.
    } finally {
      clearAuthSession();
      window.location.href = "/";
    }
  };

  return (
    <>
      {/* Mobile / Tablet backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex w-64 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">
          <div>
            <p className="text-xl font-bold text-[#002766]">Allen Car</p>

            <p className="text-xs font-medium text-slate-500">
              Air Conditioning
            </p>
          </div>

          {/* Close button - mobile/tablet */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-[#002766] lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          {/* Dashboard */}
          <Link
            to="/dashboard"
            onClick={onClose}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              isDashboard
                ? "bg-[#002766] text-white"
                : "text-slate-600 hover:bg-slate-50 hover:text-[#002766]"
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>

          {/* Vehicles */}
          <div className="mt-7">
            <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Vehicles
            </p>

            {/* Search */}
            <Link
              to="/vehicles"
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isVehicles && pathname === "/vehicles"
                  ? "bg-slate-100 text-[#002766]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#002766]"
              }`}
            >
              <Search className="h-5 w-5" />
              Search Vehicles
            </Link>

            {/* Records */}
            <Link
              to="/vehicles/records"
              onClick={onClose}
              className={`mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                pathname === "/vehicles/records"
                  ? "bg-slate-100 text-[#002766]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#002766]"
              }`}
            >
              <ClipboardList className="h-5 w-5" />
              Vehicle Records
            </Link>

            {/* Add */}
            <Link
              to="/vehicles/add"
              onClick={onClose}
              className={`mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                pathname === "/vehicles/add"
                  ? "bg-slate-100 text-[#002766]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-[#002766]"
              }`}
            >
              <Plus className="h-5 w-5" />
              Add Vehicle
            </Link>
          </div>
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
