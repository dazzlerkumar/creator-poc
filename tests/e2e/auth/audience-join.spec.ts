import { test, expect } from '@playwright/test';

test.describe('Audience Join Page', () => {
  const SID = 'test-session';
  const INVITE = 'test-invite-token';
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  test('should show loading state then audience stage on success', async ({ page }) => {
    // Mock session status - using regex to match with potential prefixes
    await page.route(/\/api\/sessions\/.*\/status/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'live' }),
      });
    });

    // Mock token exchange
    await page.route(/\/api\/auth\/token/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          jwt: 'fake-jwt',
          role: 'audience',
          expiry: Math.floor(Date.now() / 1000) + 3600,
        }),
      });
    });

    await page.goto(`/auth/join?session=${SID}&invite=${INVITE}`);

    // Verify loading state
    await expect(page.getByText(/joining/i)).toBeVisible();

    // Verify AudienceStage is rendered
    await expect(page.getByTestId('audience-stage')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/audience stage/i)).toBeVisible();
  });

  test('should redirect to ended page if session is ended', async ({ page }) => {
    await page.route(/\/api\/sessions\/.*\/status/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'ended' }),
      });
    });

    await page.goto(`/auth/join?session=${SID}&invite=${INVITE}`);

    await expect(page).toHaveURL(/\/auth\/ended/);
  });

  test('should redirect to error page if invite is invalid', async ({ page }) => {
    await page.route(/\/api\/sessions\/.*\/status/, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'live' }),
      });
    });

    await page.route(/\/api\/auth\/token/, async (route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'invalid_invite' }),
      });
    });

    await page.goto(`/auth/join?session=${SID}&invite=${INVITE}`);

    await expect(page).toHaveURL(/\/auth\/error\?reason=invalid_invite/);
  });
});
