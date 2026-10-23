// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
//creating the config 
const config=({
  testDir: './tests',timeout:40*1000,expect:{
    timeout: 40*1000
  }, reporter:'html', 
 
  use: {
    browserName:'chromium',
    channel: 'msedge',
    headed: false,
    
    screenshot: 'on',
    trace: 'retain-on-failure',
    
  },

  

    
});
//exporting the project
module.exports =config

