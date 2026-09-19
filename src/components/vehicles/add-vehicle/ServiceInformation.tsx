import { Wrench } from "lucide-react";

import type { VehicleFormApi } from "../../../features/vehicle/vehicle.form";

import { Field, SectionDivider, SectionHeader } from "./FormComponents";

type ServiceInformationProps = {
  form: VehicleFormApi;
  serviceIndex: number;
};

export function ServiceInformation({
  form,
  serviceIndex,
}: ServiceInformationProps) {
  return (
    <>
      <section>
        <SectionHeader
          icon={<Wrench className="h-4 w-4" />}
          title="Service Information"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Service Date */}
          <form.Field name={`services[${serviceIndex}].serviceDate`}>
            {(field) => (
              <Field
                label="Service Date"
                type="date"
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined
                }
              />
            )}
          </form.Field>

          {/* Technician */}
          <form.Field name={`services[${serviceIndex}].technician`}>
            {(field) => (
              <Field
                label={
                  <>
                    Technician{" "}
                    <span className="font-normal text-slate-400">
                      (optional)
                    </span>
                  </>
                }
                placeholder="e.g. Juan Dela Cruz"
                value={field.state.value ?? ""}
                onChange={(value) =>
                  field.handleChange(value === "" ? undefined : value)
                }
                onBlur={field.handleBlur}
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined
                }
              />
            )}
          </form.Field>

          {/* Service Performed */}
          <form.Field name={`services[${serviceIndex}].servicePerformed`}>
            {(field) => (
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Service Performed
                </label>

                <textarea
                  rows={3}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Describe the service performed..."
                  aria-invalid={
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                  }
                  className={`w-full resize-none rounded-xl border px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 ${
                    field.state.meta.isTouched &&
                    field.state.meta.errors.length > 0
                      ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
                      : "border-slate-300 focus:border-[#002766] focus:ring-2 focus:ring-[#002766]/10"
                  }`}
                />

                {field.state.meta.isTouched &&
                  field.state.meta.errors[0]?.message && (
                    <p className="mt-1 text-xs text-red-600">
                      {field.state.meta.errors[0].message}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </div>
      </section>

      <SectionDivider />
    </>
  );
}
