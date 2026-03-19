import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); // loads .env automatically

const TESTMU_USER = process.env.TESTMU_USERNAME;
const TESTMU_KEY = process.env.TESTMU_ACCESS_KEY;
const USE_CLOUD = !!TESTMU_USER && !!TESTMU_KEY;

const cloudCaps = (browser: string, os: string, osVersion: string, name: string) =>
  JSON.stringify({
    browser,
    browserVersion: 'latest',
    os,
    osVersion,
    name,
    build: 'Playwright-TestMu-Build',
    networkLogs: true,
    video: true,
    screenshot: true,
    consoleLogs: true,
    username: TESTMU_USER,      // ← top-level, not nested in LT:Options
    accessKey: TESTMU_KEY,
  });

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 2,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  use: {
    baseURL: 'https://www.testmuai.com/selenium-playground/',
    trace: 'off',
    video: 'off',
    screenshot: 'off',
    headless: true,
  },

  projects: USE_CLOUD
    ? [
      // ── Cloud: Windows 10 + Chrome ───────────────────────────────────────
      {
        name: 'testmu-windows-chrome',
        use: {
          ...devices['Desktop Chrome'],
          connectOptions: {
            wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
              cloudCaps('chrome', 'Windows', '10', 'TestScenarios - Windows Chrome')
            )}`,
          },
        },
      },
      {
        name: 'testmu-macos-firefox',
        use: {
          ...devices['Desktop Firefox'],
          connectOptions: {
            wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
              cloudCaps('firefox', 'macOS', 'Catalina', 'TestScenarios - macOS Firefox')
            )}`,
          },
        },
      },
    ]
    : [
      // ── Local fallback ────────────────────────────────────────────────────
      { name: 'local-chromium', use: { ...devices['Desktop Chrome'] } },
      { name: 'local-firefox', use: { ...devices['Desktop Firefox'] } },
    ],

  outputDir: 'test-results',
});