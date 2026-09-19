import { useForm } from "@tanstack/react-form";

import {
  vehicleSchema,
  type VehicleFormZod,
} from "./create.schema";

const defaultVehicleValues: VehicleFormZod = {
  plateNumber: "",
  year: undefined,

  make: "",

  model: "",

  ownerName: "",

  contactNumber: "",

  address: "",

  services: [
    {
      id: crypto.randomUUID(),

      serviceDate: new Date()
        .toISOString()
        .split("T")[0],

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
  ],
};

export function useVehicleForm(
  onSave: (data: VehicleFormZod) => Promise<void>,
  initialValues?: VehicleFormZod,
) {
  return useForm({
    defaultValues:
      initialValues ?? defaultVehicleValues,

    validators: {
      onSubmit: vehicleSchema,
    },

    onSubmit: async ({ value }) => {
      await onSave(value);
    },
  });
}

export type VehicleFormApi =
  ReturnType<typeof useVehicleForm>;