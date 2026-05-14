import { test, expect } from '@playwright/test';

test.describe('Creator Login', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', msg => console.log('BROWSER:', msg.text()));
    await page.goto('/auth/login');
  });

  test('should render the login form in development mode', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Creator Stage/i })).toBeVisible();
    await expect(page.getByLabel(/identifier/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Launch Session/i })).toBeVisible();
  });

  test('should successfully login and redirect to join page', async ({ page }) => {
    // Mocking the success API response
    await page.route('**/api/auth/login', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        status: true,
        data: {
          jwt: 'mock-jwt',
          role: 'creator',
          expiry: Math.floor(Date.now() / 1000) + 3600,
        },
      }),
    }));
    
    await page.getByLabel(/identifier/i).fill('creator-1');
    
    // We expect the form to handle submission and redirect
    await page.getByRole('button', { name: /Launch Session/i }).click();
    
    // Check for redirect to /auth/join with params
    await expect(page).toHaveURL(/\/auth\/join\?session=.*&invite=.*/);
  });

  test('should show error toast on failed login', async ({ page }) => {
    // This might require mocking a 500 error
    await page.route('**/api/auth/login', route => route.fulfill({
      status: 500,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Internal Server Error' }),
    }));

    await page.getByLabel(/identifier/i).fill('invalid-creator');
    await page.getByRole('button', { name: /Launch Session/i }).click();

    // Check for error toast (assuming sonner is used)
    await expect(page.locator('li[data-sonner-toast]')).toContainText(/failed/i);
  });
});
