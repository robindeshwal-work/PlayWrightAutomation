import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
//   testDir: './tests/Basic UI Test',
reporter:'html',
  testDir: './tests/',
  // timeout: 40000,
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 }, // Add this line
    screenshot: 'only-on-failure',
    // trace: 'retain-on-failure'
    trace: 'on'
    // browserName: 'firefox',
  },
  expect: {
    timeout: 5000 // 5 seconds timeout for expect assertions
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //         name: 'edge',
    //         use: { ...devices['Desktop Edge'] },
    //     },
  ],
});