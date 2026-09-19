import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getTodayVehicles,
  updateVehicle,
  getVehicles,
  type VehicleRecord,
} from "../api/endpoints/vehicles.api";

export function useTodayVehicles(page: number, pageSize: number) {
  return useQuery({
    queryKey: ["vehicles", "today", page, pageSize],
    queryFn: () => getTodayVehicles(page, pageSize),
    placeholderData: (previousData) => previousData,
  });
}

export function useVehicles(page: number, pageSize: number, search?: string,) {
  return useQuery({
    queryKey: ["vehicles", "all", page, pageSize, search],
    queryFn: () => getVehicles(page, pageSize, search),
    placeholderData: (previousData) => previousData,
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      recordId,
      data,
    }: {
      recordId: number;
      data: VehicleRecord["data"];
    }) => updateVehicle(recordId, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["vehicles"],
      });
    },
  });
}
