import { apiClient } from "../client";

import type { VehicleFormZod } from "../../features/vehicle/create.schema";

export type CreateVehiclePayload = VehicleFormZod;

export interface CreateVehicleData {
  id: number;
}

export interface CreateVehicleResponse {
  status: boolean;
  message: string;
  data: CreateVehicleData;
}

export async function createVehicle(
  payload: CreateVehiclePayload,
): Promise<CreateVehicleResponse> {
  const response = await apiClient.post<CreateVehicleResponse>(
    "/vehicles/insert",
    payload,
  );

  return response.data;
}