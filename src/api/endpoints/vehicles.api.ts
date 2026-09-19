import { apiClient } from "../client";

export interface VehiclePart {
  id: string;
  name: string;
  quantity: number;
  price?: number;
}

export interface VehicleService {
  id: string;
  serviceDate: string;
  technician?: string;
  servicePerformed?: string;
  parts: VehiclePart[];
}

export interface VehicleRecord {
  id: number;
  data: {
    plateNumber: string;
    year?: string;
    make: string;
    model: string;
    ownerName: string;
    contactNumber: string;
    address: string;
    services: VehicleService[];
  };
  created_at: string;
  updated_at: string;
}

export interface GetVehiclesResponse {
  status: boolean;
  message: string;
  data: VehicleRecord[];
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
}

export interface UpdateVehicleResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
  } | null;
}

export async function getTodayVehicles(
  page: number,
  pageSize: number,
): Promise<GetVehiclesResponse> {
  const response = await apiClient.get<GetVehiclesResponse>("/vehicles/today", {
    params: {
      page,
      page_size: pageSize,
    },
  });

  return response.data;
}

export async function getVehicles(
  page: number,
  pageSize: number,
  search?: string,
): Promise<GetVehiclesResponse> {
  const response = await apiClient.get<GetVehiclesResponse>("/vehicles/all", {
    params: {
      page,
      page_size: pageSize,
      ...(search?.trim() ? { search: search.trim() } : {}),
    },
  });

  return response.data;
}

export async function updateVehicle(
  recordId: number,
  data: VehicleRecord["data"],
): Promise<UpdateVehicleResponse> {
  const response = await apiClient.put<UpdateVehicleResponse>(
    `/vehicles/${recordId}`,
    data,
  );

  return response.data;
}
