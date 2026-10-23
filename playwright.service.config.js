const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');

module.exports = defineConfig(
  createAzurePlaywrightConfig(
    {},
    {
      exposeNetwork: '<loopback>',
      connectTimeout: 3 * 60 * 1000,
      os: ServiceOS.LINUX,
      credential: new DefaultAzureCredential(),
    }
  ),
  {
    reporter: [
      ['html', { open: 'never' }],
      ['@azure/playwright/reporter'],
    ],
  }
);