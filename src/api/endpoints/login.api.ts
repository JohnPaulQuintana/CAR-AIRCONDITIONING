import { apiClient } from '../client'

export interface LoginPayload {
  email: string
  password: string
  project_slug: string
}

export interface LoginProject {
  id: number
  name: string
  slug: string
}

export interface LoginRole {
  id: number
  name: string
  slug: string
}

export interface LoginResponse {
  message: string
  access_token: string
  token_type: string
  user_id: number
  email: string
  project: LoginProject
  role: LoginRole
}

export async function login(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>(
    '/auth/login',
    payload,
  )

  return response.data
}