import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../../../../../utils/playwright-dev-page';

test('tooltip-options.spec.ts-snapshots component should match snapshot', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.setDateTime('January 01 2022 00:00:00');
  await page.goto('http://localhost:4200/examples?componentName=tooltip-options.spec.ts-snapshots', { waitUntil: 'networkidle' });
  expect(await page.screenshot({animations: "disabled"})).toMatchSnapshot();
});