import { useStore } from "@tanstack/react-form";
import { AxiosError } from "axios";
import { Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useVehicleForm } from "../../features/vehicle/vehicle.form";
import type { VehicleFormZod } from "../../features/vehicle/create.schema";
import { useCreateVehicle } from "../../hooks/useCreateVehicle";

import logo from "../../assets/images/logo-white.png";

import {
  SaveStatusOverlay,
  type SaveStatus,
} from "./add-vehicle/SaveStatusOverlay";

import { VehicleInformation } from "./add-vehicle/VehicleInformation";
import { CustomerInformation } from "./add-vehicle/CustomerInformation";
import { ServiceInformation } from "./add-vehicle/ServiceInformation";
import { PartsSection } from "./add-vehicle/PartsSection";
import { CostSummary } from "./add-vehicle/CostSummary";

type AddVehicleDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function AddVehicleDrawer({ open, onClose }: AddVehicleDrawerProps) {
  const [mounted, setMounted] = useState(open);
  const [closing, setClosing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string>();

  const createVehicleMutation = useCreateVehicle();

  /*
   * Save vehicle
   */
  const handleSave = async (data: VehicleFormZod) => {
    console.log("VALID FORM:", data);

    setSaveStatus("loading");
    setSaveError(undefined);

    try {
      const response = await createVehicleMutation.mutateAsync(data);

      console.log("Vehicle created:", response);

      setSaveStatus("success");

      form.reset();
      createVehicleMutation.reset();
    } catch (error) {
      console.error("Failed to save vehicle:", error);

      const axiosError = error as AxiosError<{
        message?: string;
        detail?: string;
      }>;

      const message =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.detail ||
        axiosError.message ||
        "Something went wrong while saving the vehicle.";

      setSaveError(message);
      setSaveStatus("error");
    }
  };

  /*
   * TanStack Form
   */
  const form = useVehicleForm(handleSave);

  /*
   * Current services
   */
  const services = useStore(form.store, (state) => state.values.services);

  /*
   * Add a new service record
   */
  const addService = () => {
    const currentServices = form.getFieldValue("services");

    form.setFieldValue("services", [
      {
        id: crypto.randomUUID(),

        serviceDate: new Date().toISOString().split("T")[0],

        technician: undefined,

        servicePerformed: "",

        parts: [
          {
            id: crypto.randomUUID(),
            name: "",
            quantity: 1,
            price: 0,
          },
        ],
      },

      ...currentServices,
    ]);
  };

  /*
   * Remove a service record
   */
  const removeService = (serviceIndex: number) => {
    const currentServices = form.getFieldValue("services");

    if (currentServices.length === 1) {
      return;
    }

    form.setFieldValue(
      "services",
      currentServices.filter((_, index) => index !== serviceIndex),
    );
  };

  /*
   * Add a part to a specific service
   */
  const addPart = (serviceIndex: number) => {
    const currentServices = form.getFieldValue("services");

    const service = currentServices[serviceIndex];

    if (!service) {
      return;
    }

    form.setFieldValue(`services[${serviceIndex}].parts`, [
      {
        id: crypto.randomUUID(),
        name: "",
        quantity: 1,
        price: 0,
      },
      ...service.parts,
    ]);
  };

  /*
   * Remove a part from a specific service
   */
  const removePart = (serviceIndex: number, partIndex: number) => {
    const currentServices = form.getFieldValue("services");

    const service = currentServices[serviceIndex];

    if (!service) {
      return;
    }

    if (service.parts.length === 1) {
      return;
    }

    form.setFieldValue(
      `services[${serviceIndex}].parts`,
      service.parts.filter((_, index) => index !== partIndex),
    );
  };

  /*
   * Calculate total cost across all services
   */
  const partsTotal = services.reduce((serviceTotal, service) => {
    const servicePartsTotal = service.parts.reduce(
      (partTotal, part) => partTotal + part.quantity * (part.price ?? 0),
      0,
    );

    return serviceTotal + servicePartsTotal;
  }, 0);

  /*
   * Handle drawer open / close animation
   */
  useEffect(() => {
    if (open) {
      setMounted(true);
      setClosing(false);
      setSaveStatus("idle");
      setSaveError(undefined);

      return;
    }

    if (!mounted) {
      return;
    }

    setClosing(true);

    const timer = setTimeout(() => {
      setMounted(false);
      setClosing(false);
      setSaveStatus("idle");
      setSaveError(undefined);
    }, 300);

    return () => clearTimeout(timer);
  }, [open, mounted]);

  /*
   * Prevent background page scrolling
   */
  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  /*
   * Don't render when completely closed
   */
  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-slate-900/40 ${
          closing
            ? "animate-[fadeOut_300ms_ease-in_forwards]"
            : "animate-[fadeIn_300ms_ease-out_forwards]"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col border-l-4 border-primary bg-white shadow-2xl ${
          closing
            ? "animate-[slideOut_300ms_ease-in_forwards]"
            : "animate-[slideIn_300ms_ease-out_forwards]"
        }`}
      >
        {/* Save Status */}
        <SaveStatusOverlay
          status={saveStatus}
          error={saveError}
          onClose={() => {
            setSaveStatus("idle");
            setSaveError(undefined);
          }}
        />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#002766]/10">
              <img src={logo} alt="" className="h-6 w-6 object-contain" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">New Vehicle</h2>

              <p className="text-xs text-slate-500">
                Register vehicle and service history
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={saveStatus === "loading"}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form
            id="vehicle-form"
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();

              void form.handleSubmit();
            }}
            noValidate
            className="px-6 py-5"
          >
            {/* Vehicle Information */}
            <VehicleInformation form={form} />

            {/* Customer Information */}
            <CustomerInformation form={form} />

            {/* Service History */}
            <section className="mt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-primary">
                    Service History
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Add previous and current service records.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addService}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#002766]/20 px-3 py-1.5 text-xs font-semibold text-[#002766] transition hover:bg-[#002766]/5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Service
                </button>
              </div>

              <div className="mt-4 space-y-4">
                {services.map((service, serviceIndex) => (
                  <div
                    key={service.id}
                    className="rounded-xl border border-slate-200 bg-white"
                  >
                    {/* Service Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          Service {services.length - serviceIndex}
                        </p>

                        <p className="text-xs text-slate-500">Service record</p>
                      </div>

                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(serviceIndex)}
                          className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      )}
                    </div>

                    {/* Service Information */}
                    <div className="px-4 pt-4">
                      <ServiceInformation
                        form={form}
                        serviceIndex={serviceIndex}
                      />
                    </div>

                    {/* Parts */}
                    <div className="px-4">
                      <PartsSection
                        form={form}
                        serviceIndex={serviceIndex}
                        onAdd={() => addPart(serviceIndex)}
                        onRemove={(partIndex) =>
                          removePart(serviceIndex, partIndex)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Cost Summary */}
            <CostSummary partsTotal={partsTotal} />
          </form>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-slate-200 bg-white px-6 py-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saveStatus === "loading"}
              className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="vehicle-form"
              disabled={saveStatus === "loading"}
              className="flex-1 rounded-xl bg-[#002766] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#001d4d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saveStatus === "loading" ? "Saving..." : "Save Vehicle"}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Animations */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes slideOut {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(100%);
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes fadeOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}
