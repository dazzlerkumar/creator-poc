import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      replace: () => null,
      push: () => null,
    };
  },
  usePathname() {
    return '/';
  },
}));
