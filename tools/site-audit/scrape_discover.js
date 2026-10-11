const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function discover() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const visited = new Set();
  const toVisit = [
    'https://www.karka.academy/',
    'https://www.karka.academy/courses',
    'https://www.karka.academy/placement',
    'https://www.karka.academy/about-us',
    'https://www.karka.academy/contact',
    'https://www.karka.academy/roadmap',
    'https://www.karka.academy/for-school-students',
    'https://www.karka.academy/for-college-students',
    'https://www.karka.academy/for-graduates',
    'https://www.karka.academy/for-professionals',
    'https://www.karka.academy/blog',
    'https://infini.karka.academy/',
    'https://spike.karka.academy/'
  ];

  const foundLinks = new Set(toVisit);

  for (const url of toVisit) {
    try {
      console.log(`Checking ${url}...`);
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      const status = response ? response.status() : 'unknown';
      console.log(`Status for ${url}: ${status}`);

      // extract all links
      const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a[href]'))
          .map(a => a.href)
          .filter(h => h.startsWith('http'));
      });

      for (const link of links) {
        if (link.includes('karka.academy')) {
          foundLinks.add(link.split('#')[0]);
        }
      }
    } catch (e) {
      console.error(`Error on ${url}:`, e.message);
    }
  }

  console.log('\n--- ALL FOUND LINKS ---');
  Array.from(foundLinks).sort().forEach(l => console.log(l));

  await browser.close();
}

discover();
