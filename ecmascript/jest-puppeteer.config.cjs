/** @type {import('jest-environment-puppeteer').JestPuppeteerConfig} */

const CI = Boolean(process.env.CI || false);

const launch = {
  dumpio: true,
  headless: true,
};

if (CI) {
  launch.headless = true;
  launch.executablePath = '/usr/bin/google-chrome-stable'; // '/usr/bin/chromium-browser';
  launch.args = [
    '--ignore-certificate-errors',
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu'
  ];
}

module.exports = {
  launch,
};
