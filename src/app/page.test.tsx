import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as navigation from 'next/navigation'
import Home from './page'

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt as string} />
  },
}))

const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

const mockSignIdentityToken = vi.fn()

vi.mock('@/lib/hmac', () => ({
  signIdentityToken: (...args: unknown[]) => mockSignIdentityToken(...args),
}))

describe('Home – Gateway Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(navigation, 'useRouter').mockReturnValue({
      replace: mockReplace,
    } as unknown as ReturnType<typeof navigation.useRouter>)

    mockSignIdentityToken.mockImplementation(
      () => new Promise(() => {}), // never resolves by default — stays in loading
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  // ---------------------------------------------------------------------------
  // REQ-002 / REQ-003 / AC-001: Loading UI
  // ---------------------------------------------------------------------------
  describe('Loading State (REQ-002, REQ-003)', () => {
    it('renders loading UI with authenticating message on mount', () => {
      render(<Home />)
      expect(
        screen.getByText(/authenticating access/i),
      ).toBeInTheDocument()
    })

    it('does not show error UI while authentication is pending', () => {
      render(<Home />)
      expect(
        screen.queryByText(/authentication error/i),
      ).not.toBeInTheDocument()
    })
  })

  // ---------------------------------------------------------------------------
  // REQ-004 / REQ-005 / AC-002: Successful auth → redirect
  // ---------------------------------------------------------------------------
  describe('Successful Authentication (REQ-005)', () => {
    beforeEach(() => {
      mockSignIdentityToken.mockResolvedValue('user.token123')
    })

    it('calls signIdentityToken on mount', async () => {
      render(<Home />)
      await waitFor(() => {
        expect(mockSignIdentityToken).toHaveBeenCalled()
      })
    })

    it('redirects to join path using router.replace', async () => {
      render(<Home />)
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/join')
      })
    })

    it('does not show error UI after successful auth', async () => {
      render(<Home />)
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalled()
      })
      expect(
        screen.queryByText(/authentication error/i),
      ).not.toBeInTheDocument()
    })
  })

  // ---------------------------------------------------------------------------
  // REQ-006 / REQ-007 / AC-003: Failed auth → error UI
  // ---------------------------------------------------------------------------
  describe('Failed Authentication (REQ-006, REQ-007)', () => {
    beforeEach(() => {
      mockSignIdentityToken.mockRejectedValue(new Error('Invalid token'))
    })

    it('shows authentication error heading', async () => {
      render(<Home />)
      expect(
        await screen.findByText(/authentication error/i),
      ).toBeInTheDocument()
    })

    it('shows descriptive error message about joining via WhatsApp link', async () => {
      render(<Home />)
      expect(
        await screen.findByText(
          /use the link sent to your whatsapp to join the stream/i,
        ),
      ).toBeInTheDocument()
    })

    it('does not redirect on failure', async () => {
      render(<Home />)
      await screen.findByText(/authentication error/i)
      expect(mockReplace).not.toHaveBeenCalled()
    })

    it('shows a reload button', async () => {
      render(<Home />)
      expect(
        await screen.findByRole('button', { name: /reload/i }),
      ).toBeInTheDocument()
    })

    it('shows contact support link', async () => {
      render(<Home />)
      const supportLink = await screen.findByRole('link', { name: /contact support/i })
      expect(supportLink).toBeInTheDocument()
      expect(supportLink).toHaveAttribute('href', 'https://wa.me/917969329686')
    })

    it('shows need assistance label', async () => {
      render(<Home />)
      expect(
        await screen.findByText(/need assistance/i),
      ).toBeInTheDocument()
    })

    it('reloads the page when reload button is clicked', async () => {
      const reloadMock = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { reload: reloadMock },
        writable: true,
      })

      render(<Home />)
      const reloadButton = await screen.findByRole('button', {
        name: /reload/i,
      })
      fireEvent.click(reloadButton)
      expect(reloadMock).toHaveBeenCalled()
    })
  })

  // ---------------------------------------------------------------------------
  // GUD-001: Graceful error handling
  // ---------------------------------------------------------------------------
  describe('Edge Cases', () => {
    it('handles network error gracefully and shows error UI', async () => {
      mockSignIdentityToken.mockRejectedValue(new TypeError('Failed to fetch'))
      render(<Home />)
      expect(
        await screen.findByText(/authentication error/i),
      ).toBeInTheDocument()
    })

    it('handles timeout-like rejection and shows error UI', async () => {
      mockSignIdentityToken.mockRejectedValue(new Error('Timeout'))
      render(<Home />)
      expect(
        await screen.findByText(/authentication error/i),
      ).toBeInTheDocument()
      expect(mockReplace).not.toHaveBeenCalled()
    })
  })
})
