import { useMutation } from '@tanstack/react-query'

import {
  register,
  type RegisterPayload,
} from '../api/endpoints/register.api'

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterPayload) => register(payload),
  })
}