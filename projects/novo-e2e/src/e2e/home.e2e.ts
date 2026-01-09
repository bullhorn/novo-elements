import { browser } from '@wdio/globals';
import { verifyPresent, verifyText } from 'utils/VerifyUtil';
import { getURLs } from 'utils/EnvironmentUtil';

describe('Novo Elements Demo Home Page', () => {
  before(async () => {
      await browser.navigateTo(getURLs().HOME);
  });

  it('should load the demo page', async () => {
    const title = await browser.getTitle();
    expect(title).toBeTruthy();
  });

  it('should have the main header with specific text', async () => {
    await verifyPresent('h1');
    await verifyText('h1', 'Novo Elements, Bullhorn\'s design system', 'main header title')
  });
});
