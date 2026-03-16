import api from './api'
import type { LoginData, RegisterData, AuthResponse } from '../types/auth'

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await api.post('/auth/login', data)
  return res.data.data
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await api.post('/auth/register', data)
  return res.data.data
}

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
}

export const getMe = async () => {
  const res = await api.get('/auth/me')
  return res.data.data
}