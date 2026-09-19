import { Car } from "lucide-react";

import type { VehicleFormApi } from "../../../features/vehicle/vehicle.form";

import { Field, SectionDivider, SectionHeader } from "./FormComponents";

type VehicleInformationProps = {
  form: VehicleFormApi;
};

export function VehicleInformation({ form }: VehicleInformationProps) {
  return (
    <>
      <section>
        <SectionHeader
          icon={<Car className="h-4 w-4" />}
          title="Vehicle Information"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <form.Field name="plateNumber">
            {(field) => (
              <Field
                label="Plate Number"
                placeholder="ABC 1234"
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={
                  field.state.meta.isTouched
                    ? field.state.meta.errors[0]?.message
                    : undefined
                }
                className="sm:col-span-2"
              />
            )}
          </form.Field>

          <form.Field name="year">
            {(field) => (
              <Field
                label={
                  <>
                    Year{" "}
                    <span className="font-normal text-slate-400">
                      (optional)
                    </span>
                  </>
                }
                placeholder="e.g. 2024"
                type="number"
                value={field.state.value ?? ""}
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

          <form.Field name="make">
            {(field) => (
              <Field
                label="Make"
                placeholder="Toyota"
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

          <form.Field name="model">
            {(field) => (
              <Field
                label="Model"
                placeholder="Vios"
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
        </div>
      </section>

      <SectionDivider />
    </>
  );
}
