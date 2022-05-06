import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../../../../utils/playwright-dev-page';

test('basic-ace component should match snapshot', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.setDateTime('January 01 2022 00:00:00');
  await page.goto('http://localhost:4200/examples?componentName=basic-ace', { waitUntil: 'networkidle' });
  expect(await page.screenshot({animations: "disabled"})).toMatchSnapshot();
});

test('basic-ace component should accept text', async ({ page }) => {
  await page.locator('.ace_content').click();
  await page.locator('textarea').fill('test');
  expect(await page.locator('.ace_identifier').innerText()).toEqual('test');
});
