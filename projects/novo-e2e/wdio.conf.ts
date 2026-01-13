// Extract base URL from environment or command line
let baseUrl = process.env.E2E_BASE_URL || 'https://bullhorn.github.io/novo-elements/docs';

process.argv.forEach((arg) => {
  if (arg.startsWith('--baseUrl=')) {
    baseUrl = arg.split('=')[1];
  }
});

// Store globally for EnvironmentUtil to access
(global as any).E2E_BASE_URL = baseUrl;

console.info('E2E Base URL:', baseUrl);

// Import after setting global variable
import { getURLs } from './src/utils/EnvironmentUtil';

export const config = {
  runner: 'local',
  specs: ['./src/**/*.e2e.ts'],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: 'stable',
      'goog:chromeOptions': {
          binary: process.env.CHROMIUM_BIN || '/usr/bin/chromium-browser',
          args: [],
      },
      'goog:loggingPrefs': {
          browser: 'ALL',
      },
      timeouts: {
          pageLoad: 120000,
      },
    },
  ],
  logLevel: 'silent',
  bail: 0,
  baseUrl: baseUrl + '/#/home',
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

  onPrepare: async (conf, capabilities) => {
    setHeadlessMode(capabilities);
  },
  before: async () => {
    const URLS = getURLs();
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
