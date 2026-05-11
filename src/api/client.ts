import { useAuthStore } from '../stores/auth-store'
import { ApiError } from './types'

export async function client<T>(
  endpoint: string,
  { body, ...customConfig }: RequestInit & { body?: unknown } = {}
): Promise<T> {
  const jwt = useAuthStore.getState().jwt

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`
  }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const url = endpoint.startsWith('http') ? endpoint : `${baseUrl}${endpoint}`

  const response = await fetch(url, config)

  if (response.status === 401) {
    useAuthStore.getState().clearToken()
  }

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch {
      // Ignore if response is not JSON
    }
    throw new ApiError(response.status, response.statusText, errorData)
  }

  return response.json()
}
