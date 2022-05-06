import { test, expect } from '@playwright/test';
import { PlaywrightDevPage } from '../../../../utils/playwright-dev-page';

test('multiple-select-with-search component should match snapshot', async ({ page }) => {
  const playwrightDev = new PlaywrightDevPage(page);
  await playwrightDev.setDateTime('January 01 2022 00:00:00');
  await page.goto('http://localhost:4200/examples?componentName=multiple-select-with-search', { waitUntil: 'networkidle' });
  expect(await page.screenshot({animations: "disabled"})).toMatchSnapshot();
});
