import {
  CheckCircle2,
  CircleAlert,
  Loader2,
} from "lucide-react";

export type SaveStatus =
  | "idle"
  | "loading"
  | "success"
  | "error";

type SaveStatusOverlayProps = {
  status: SaveStatus;
  error?: string;
  onClose: () => void;
};

export function SaveStatusOverlay({
  status,
  error,
  onClose,
}: SaveStatusOverlayProps) {
  if (status === "idle") {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="w-[280px] rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-xl">
        {status === "loading" && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#002766]/10">
              <Loader2 className="h-7 w-7 animate-spin text-[#002766]" />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              Saving Vehicle
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Please wait while we save the vehicle information.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              Vehicle Saved
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              The vehicle and service information was saved successfully.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-xl bg-[#002766] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#001d4d]"
            >
              Done
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <CircleAlert className="h-8 w-8 text-red-600" />
            </div>

            <h3 className="mt-4 text-base font-bold text-slate-900">
              Unable to Save
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {error ||
                "Something went wrong while saving the vehicle. Please try again."}
            </p>

            <div className="mt-5 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Try Again
              </button>

              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl bg-[#002766] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#001d4d]"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}