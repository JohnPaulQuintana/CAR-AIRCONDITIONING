import { useEffect, useState } from "react";
// import { useRouterState } from "@tanstack/react-router";
import { CalendarDays, Menu, UserCircle } from "lucide-react";

type HeaderProps = {
  onMenuClick: () => void;
};

export function Header({ onMenuClick }: HeaderProps) {
  // const pathname = useRouterState({
  //   select: (state) => state.location.pathname,
  // });

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentDate.toLocaleDateString("en-US", {
    // weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });

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

        {/* Date & Time */}
        <div className="flex items-center gap-3">
          <CalendarDays className="h-9 w-9  text-[#002766] sm:h-10 sm:w-10" />

          <div>
            <p className="text-sm font-semibold text-slate-900 sm:text-base">
              {formattedDate}
            </p>

            <p className="-mt-0.5 text-xs font-medium text-slate-500 sm:text-sm">
              {formattedTime}
            </p>
          </div>
        </div>
      </div>

      {/* User */}
      <button
        type="button"
        className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50 sm:px-3"
      >
        <UserCircle className="h-8 w-8 text-[#002766] sm:h-9 sm:w-9" />

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-slate-900">User Account</p>

          <p className="text-xs text-slate-500">Administrator</p>
        </div>
      </button>
    </header>
  );
}
