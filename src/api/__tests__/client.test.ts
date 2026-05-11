import { describe, it, expect, vi } from 'vitest'
import { client } from '../client'
import { useAuthStore } from '../../stores/auth-store'
import { server } from '../../test/server'
import { http, HttpResponse } from 'msw'

beforeAll(() => server.listen())
afterEach(() => {
  server.resetHandlers()
  vi.clearAllMocks()
})
afterAll(() => server.close())

describe('API Client', () => {
  it('adds Authorization header when JWT is present', async () => {
    useAuthStore.setState({ jwt: 'test-token' })

    let capturedHeader = ''
    server.use(
      http.get('/api/test', ({ request }) => {
        capturedHeader = request.headers.get('Authorization') || ''
        return HttpResponse.json({ success: true })
      })
    )

    await client('/api/test')
    expect(capturedHeader).toBe('Bearer test-token')
  })

  it('throws ApiError on non-2xx responses', async () => {
    server.use(
      http.get('/api/error', () => {
        return new HttpResponse(null, { status: 400, statusText: 'Bad Request' })
      })
    )

    await expect(client('/api/error')).rejects.toThrow('Bad Request')
  })

  it('clears auth token and throws on 401 response', async () => {
    const clearTokenSpy = vi.spyOn(useAuthStore.getState(), 'clearToken')

    server.use(
      http.get('/api/unauthorized', () => {
        return new HttpResponse(null, { status: 401 })
      })
    )

    await expect(client('/api/unauthorized')).rejects.toThrow()
    expect(clearTokenSpy).toHaveBeenCalled()
  })
})
