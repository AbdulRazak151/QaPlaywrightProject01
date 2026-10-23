// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';
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
  testDir: './tests',timeout:40*1000,
  retries: 1,//to handle falky test, we use this retries 
  workers:3,//parallel testing for each test in test folder
    expect:{
    timeout: 40*1000
  }, reporter:'html', 

  projects:[//configuration of different broswers to run in specific browswer
    {
    name: 'edgebrowser',
    use: {
    browserName:'chromium',
    channel: 'msedge',
    headed: false,
    screenshot: 'on',
    video: 'on-first-entry',
    trace: 'retain-on-failure',//debug in logs
    viewport: {width:720,height:720},
   // ...devices['iPhone 11'],//run in respective devices
    ignoreHttpsErros:true,//allowing for ssl certifications
    permisions:['geolocation']//allowing location access for browser

  }
},
{
     name: 'chrome',
    use: {
    browserName:'chromium',
    headed: false,
    screenshot: 'on',
    trace: 'retain-on-failure',
    viewport: {width:720,height:720},//setting browser size--user for responsive testing
    
  } 

}


]
 
  });
//exporting the project
module.exports =config

