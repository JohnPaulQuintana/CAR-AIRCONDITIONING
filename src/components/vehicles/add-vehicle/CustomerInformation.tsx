import { UserRound } from "lucide-react";

import type { VehicleFormApi } from "../../../features/vehicle/vehicle.form";

import {
  Field,
  SectionDivider,
  SectionHeader,
} from "./FormComponents";

type CustomerInformationProps = {
  form: VehicleFormApi;
};

export function CustomerInformation({
  form,
}: CustomerInformationProps) {
  return (
    <>
      <section>
        <SectionHeader
          icon={<UserRound className="h-4 w-4" />}
          title="Customer Information"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <form.Field name="ownerName">
            {(field) => (
              <Field
                label="Owner Name"
                placeholder="Customer name"
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

          <form.Field name="contactNumber">
            {(field) => (
              <Field
                label="Contact Number"
                placeholder="09XXXXXXXXX"
                type="tel"
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

          <form.Field name="address">
            {(field) => (
              <Field
                label="Address"
                placeholder="Customer address"
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
        </div>
      </section>

      <SectionDivider />
    </>
  );
}