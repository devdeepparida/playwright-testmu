import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Utility helpers used across all test scenarios.
 */

/** Ensure a directory exists, creating it if needed */
export function ensureDir(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/** Capture a full-page screenshot with a timestamped name */
export async function captureScreenshot(page: Page, testName: string): Promise<void> {
  const dir = path.join('test-results', 'screenshots');
  ensureDir(dir);
  const filePath = path.join(dir, `${testName}-${Date.now()}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  console.log(`Screenshot saved: ${filePath}`);
}

/** Log all browser console messages to stdout */
export function attachConsoleLogger(page: Page): void {
  page.on('console', (msg) => {
    console.log(`[Browser Console] [${msg.type().toUpperCase()}] ${msg.text()}`);
  });
}

/** Log network requests */
export function attachNetworkLogger(page: Page): void {
  page.on('request',  (req)  => console.log(`[Network -->] ${req.method()} ${req.url()}`));
  page.on('response', (res)  => console.log(`[Network <--] ${res.status()} ${res.url()}`));
}

/** Test data for Input Form */
export const FORM_DATA = {
  name:     'John Doe',
  email:    'johndoe@example.com',
  password: 'SecurePass@123',
  company:  'TestMu Inc.',
  website:  'https://www.testmuai.com/selenium-playground/',
  country:  'United States',
  city:     'New York',
  address1: '123 Main Street',
  address2: 'Suite 456',
  state:    'New York',
  zip:      '10001',
} as Form_Data;
