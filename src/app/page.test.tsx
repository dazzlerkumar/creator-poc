import { expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import * as navigation from 'next/navigation'
import Home from './page'

test('Home page redirects to login', () => {
  const replaceSpy = vi.fn()
  vi.spyOn(navigation, 'useRouter').mockReturnValue({
    replace: replaceSpy,
  } as unknown as ReturnType<typeof navigation.useRouter>)

  render(<Home />)
  expect(replaceSpy).toHaveBeenCalledWith('/auth/login/')
})
