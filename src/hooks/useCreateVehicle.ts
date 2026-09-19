import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createVehicle,
  type CreateVehiclePayload,
} from "../api/endpoints/create-vehicle.api";

export function useCreateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateVehiclePayload) =>
      createVehicle(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
    },
  });
}