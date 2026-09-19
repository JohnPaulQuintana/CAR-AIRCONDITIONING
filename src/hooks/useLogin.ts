import { useMutation } from '@tanstack/react-query'

import {
  login,
  type LoginPayload,
} from '../api/endpoints/login.api'

export function useLogin() {
  return useMutation({
    mutationFn: (payload: LoginPayload) => login(payload),
  })
}