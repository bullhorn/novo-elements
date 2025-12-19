import type { Options } from '@wdio/types';
import { URLS } from './src/utils/EnvironmentUtil';

export const config: Options.Testrunner = {
  runner: 'local',
  specs: ['./src/**/*.e2e.ts'],
  exclude: [],
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--disable-gpu'],
      },
    },
  ],
  logLevel: 'silent',
  bail: 0,
  baseUrl: 'https://bullhorn.github.io/novo-elements/docs/#/home',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  reporters: ['spec'],
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: 'projects/novo-e2e/tsconfig.json',
      transpileOnly: true,
    },
  },

  onPrepare: async (config, capabilities) => {
    setHeadlessMode(capabilities);
  },
  before: async () => {
    await browser.url(URLS.HOME);
  },
};

function setHeadlessMode(capabilities) {
    const browserName = getWdioBrowserName();
    let headless;

    process.argv.forEach((arg) => {
        if (arg.startsWith('--headless=')) {
            headless = arg.split('=')[1];
        }
    });

    if (headless !== 'false') {
        switch (browserName) {
            case 'edge':
                capabilities[0]['ms:edgeOptions'].args.push('--headless');
                capabilities[0]['ms:edgeOptions'].args.push('--disable-gpu');
                capabilities[0]['ms:edgeOptions'].args.push('--window-size=1936,1056');
                break;
            case 'firefox':
                capabilities[0]['moz:firefoxOptions'].args.push('--headless');
                break;
            default:
                capabilities[0]['goog:chromeOptions'].args.push('--headless');
                capabilities[0]['goog:chromeOptions'].args.push('--window-size=1936,1056');
        }
    }
}

function getWdioBrowserName() {
    let browserName;

    process.argv.forEach((arg) => {
        if (arg.startsWith('--browserName=')) {
            browserName = arg.split('=')[1];
        }
    });

    return browserName === undefined ? 'chrome' : browserName;
}