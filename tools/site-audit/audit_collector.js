const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = path.resolve(__dirname, 'docs', 'site-audit');
const SCREENSHOTS_DIR = path.resolve(OUTPUT_DIR, 'screenshots');
const ASSETS_DIR = path.resolve(OUTPUT_DIR, 'assets');

[OUTPUT_DIR, SCREENSHOTS_DIR, ASSETS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const pagesToAudit = [
  { id: 'home', url: 'https://www.karka.academy/', name: 'Home' },
  { id: 'courses', url: 'https://www.karka.academy/courses', name: 'Courses Index' },
  { id: 'placement', url: 'https://www.karka.academy/placement', name: 'Placements' },
  { id: 'about-us', url: 'https://www.karka.academy/about-us', name: 'About Us' },
  { id: 'contact', url: 'https://www.karka.academy/contact', name: 'Contact' },
  { id: 'roadmap', url: 'https://www.karka.academy/roadmap', name: 'Free Career Roadmap' },
  { id: 'for-school-students', url: 'https://www.karka.academy/for-school-students', name: 'For School Students' },
  { id: 'for-college-students', url: 'https://www.karka.academy/for-college-students', name: 'For College Students' },
  { id: 'for-graduates', url: 'https://www.karka.academy/for-graduates', name: 'For Graduates' },
  { id: 'for-professionals', url: 'https://www.karka.academy/for-professionals', name: 'For Professionals' },
  { id: 'blog', url: 'https://www.karka.academy/blog', name: 'Blog' },
  { id: 'privacy-policy', url: 'https://www.karka.academy/privacy-policy', name: 'Privacy Policy' },
  { id: 'terms-of-service', url: 'https://www.karka.academy/terms-of-service', name: 'Terms of Service' },
  { id: 'infini', url: 'https://infini.karka.academy/', name: 'Karka Infini AI Competition' },
  { id: 'spike', url: 'https://spike.karka.academy/', name: 'Spike AI Learning Platform' },

  // Course pages
  { id: 'course-mern-fullstack', url: 'https://www.karka.academy/courses/mern-fullstack', name: 'MERN Full Stack' },
  { id: 'course-react-java-fullstack', url: 'https://www.karka.academy/courses/react-java-fullstack', name: 'React Java Full Stack' },
  { id: 'course-react-python-fullstack', url: 'https://www.karka.academy/courses/react-python-fullstack', name: 'React Python Full Stack' },
  { id: 'course-ai-data-science', url: 'https://www.karka.academy/courses/ai-data-science', name: 'AI & Data Science' },
  { id: 'course-data-analytics-ai', url: 'https://www.karka.academy/courses/data-analytics-ai', name: 'Data Analytics & AI' },
  { id: 'course-data-engineering', url: 'https://www.karka.academy/courses/data-engineering', name: 'Data Engineering' },
  { id: 'course-ui-ux-design', url: 'https://www.karka.academy/courses/ui-ux-design', name: 'UI / UX Design' },
  { id: 'course-web-designing', url: 'https://www.karka.academy/courses/web-designing', name: 'Web Designing' },
  { id: 'course-graphic-designing', url: 'https://www.karka.academy/courses/graphic-designing', name: 'Graphic Designing' },
  { id: 'course-hr-finance', url: 'https://www.karka.academy/courses/hr-finance', name: 'HR & Finance' },
  { id: 'course-tally', url: 'https://www.karka.academy/courses/tally', name: 'Tally Prime' },
  { id: 'course-business-analyst', url: 'https://www.karka.academy/courses/business-analyst', name: 'Business Analyst' },
  { id: 'course-python-for-kids', url: 'https://www.karka.academy/courses/python-for-kids', name: 'Python for Kids' },
  { id: 'course-java-basics-student', url: 'https://www.karka.academy/courses/java-basics-student', name: 'Java Basics for Students' },
  { id: 'course-html-css-school', url: 'https://www.karka.academy/courses/html-css-school', name: 'HTML & CSS for School' },
  { id: 'course-javascript-juniors', url: 'https://www.karka.academy/courses/javascript-juniors', name: 'JavaScript Juniors' },
  { id: 'course-fullstack-internship', url: 'https://www.karka.academy/courses/fullstack-internship', name: 'Full Stack Internship' },
  { id: 'course-data-science-foundation', url: 'https://www.karka.academy/courses/data-science-foundation', name: 'Data Science Foundation' },
  { id: 'course-frontend-mastery-college', url: 'https://www.karka.academy/courses/frontend-mastery-college', name: 'Frontend Mastery College' },
  { id: 'course-backend-mastery-college', url: 'https://www.karka.academy/courses/backend-mastery-college', name: 'Backend Mastery College' },
  { id: 'course-uiux-design-college', url: 'https://www.karka.academy/courses/uiux-design-college', name: 'UI/UX Design College' },
  { id: 'course-python-mini-college', url: 'https://www.karka.academy/courses/python-mini-college', name: 'Python Mini College' },
  { id: 'course-java-mini-college', url: 'https://www.karka.academy/courses/java-mini-college', name: 'Java Mini College' },
  { id: 'course-react-mini-college', url: 'https://www.karka.academy/courses/react-mini-college', name: 'React Mini College' },
  { id: 'course-sql-mastery-college', url: 'https://www.karka.academy/courses/sql-mastery-college', name: 'SQL Mastery College' },
  { id: 'course-genai-foundations', url: 'https://www.karka.academy/courses/genai-foundations', name: 'GenAI Foundations' },
  { id: 'course-genai-mastery', url: 'https://www.karka.academy/courses/genai-mastery', name: 'GenAI Mastery' },
  { id: 'course-genai-llm-developer', url: 'https://www.karka.academy/courses/genai-llm-developer', name: 'GenAI LLM Developer' },
  { id: 'course-video-editing', url: 'https://www.karka.academy/courses/video-editing', name: 'Video Editing' },
  { id: 'course-graphic-designing-dm', url: 'https://www.karka.academy/courses/graphic-designing-dm', name: 'Graphic Designing & Digital Media' },
  { id: 'course-multimedia-animation', url: 'https://www.karka.academy/courses/multimedia-animation', name: 'Multimedia Animation' },
  { id: 'course-digital-marketing', url: 'https://www.karka.academy/courses/digital-marketing', name: 'Digital Marketing' },
  { id: 'course-seo-analyst', url: 'https://www.karka.academy/courses/seo-analyst', name: 'SEO Analyst' },
  { id: 'course-storytelling-content-writing', url: 'https://www.karka.academy/courses/storytelling-content-writing', name: 'Storytelling & Content Writing' },
  { id: 'course-cloud-devops', url: 'https://www.karka.academy/courses/cloud-devops', name: 'Cloud & DevOps' },
  { id: 'course-automation-testing', url: 'https://www.karka.academy/courses/automation-testing', name: 'Automation Testing' },
  { id: 'course-mobile-app-development', url: 'https://www.karka.academy/courses/mobile-app-development', name: 'Mobile App Development' }
];

async function downloadFile(fileUrl, destPath) {
  return new Promise((resolve, reject) => {
    try {
      const client = fileUrl.startsWith('https') ? https : http;
      client.get(fileUrl, (res) => {
        if (res.statusCode === 200) {
          const fileStream = fs.createWriteStream(destPath);
          res.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close(resolve);
          });
        } else if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Handle redirect
          downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        } else {
          resolve(false); // ignore failed download
        }
      }).on('error', (err) => {
        resolve(false);
      });
    } catch (e) {
      resolve(false);
    }
  });
}

async function runAudit() {
  console.log(`Starting site audit for ${pagesToAudit.length} pages...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080']
  });

  const allPageData = [];
  const allImagesToDownload = new Map(); // url -> filename

  // Loop through pages
  for (let i = 0; i < pagesToAudit.length; i++) {
    const item = pagesToAudit[i];
    console.log(`[${i + 1}/${pagesToAudit.length}] Auditing ${item.name} (${item.url})...`);

    const page = await browser.newPage();
    try {
      // 1. Visit at Desktop (1440px)
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
      await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 45000 });
      // Wait a moment for any lazy-loaded elements/animations to settle
      await new Promise(r => setTimeout(r, 1500));

      // Desktop Screenshot
      const ssDesktop = path.join(SCREENSHOTS_DIR, `${item.id}_1440px.png`);
      await page.screenshot({ path: ssDesktop, fullPage: true });

      // 2. Mobile Screenshot (390px)
      await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
      await new Promise(r => setTimeout(r, 1000));
      const ssMobile = path.join(SCREENSHOTS_DIR, `${item.id}_390px.png`);
      await page.screenshot({ path: ssMobile, fullPage: true });

      // Reset to 1440 for DOM extraction
      await page.setViewport({ width: 1440, height: 900 });

      // Extract detailed page data
      const pageData = await page.evaluate((item) => {
        const getCleanText = (el) => el ? (el.innerText || el.textContent || '').replace(/\s+/g, ' ').trim() : '';

        // Extract Title & Meta
        const title = document.title;
        const metaDesc = document.querySelector('meta[name="description"]')?.content || '';
        const canonical = document.querySelector('link[rel="canonical"]')?.href || '';

        // Extract Headings
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => ({
          tag: h.tagName.toLowerCase(),
          text: getCleanText(h)
        })).filter(h => h.text.length > 0);

        // Extract Sections
        const sectionNodes = Array.from(document.querySelectorAll('header, main > *, section, footer'));
        const sections = [];
        sectionNodes.forEach((node, idx) => {
          const heading = node.querySelector('h1, h2, h3, h4')?.innerText?.trim() || '';
          const text = getCleanText(node);
          if (text.length > 0) {
            sections.push({
              index: idx,
              tag: node.tagName.toLowerCase(),
              className: node.className || '',
              heading: heading,
              textSnippet: text.substring(0, 300),
              fullText: text
            });
          }
        });

        // Extract Buttons & Links
        const buttons = Array.from(document.querySelectorAll('button, a.btn, a[class*="button"], a[class*="rounded"]')).map(b => ({
          text: getCleanText(b),
          href: b.href || '',
          tag: b.tagName.toLowerCase(),
          classes: b.className || ''
        })).filter(b => b.text.length > 0);

        // Extract Images
        const imgs = Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt || '',
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height,
          classes: img.className || ''
        }));

        // Extract FAQs if present
        const faqs = [];
        const faqItems = document.querySelectorAll('[data-state], details, .accordion-item, [class*="faq"], [class*="accordion"]');
        faqItems.forEach(faq => {
          const q = faq.querySelector('button, summary, h3, h4, [class*="trigger"]')?.innerText?.trim();
          const a = faq.querySelector('[data-state="open"], [class*="content"], p')?.innerText?.trim();
          if (q) {
            faqs.push({ question: q, answer: a || '' });
          }
        });

        // Extract full raw text
        const bodyText = getCleanText(document.body);

        return {
          id: item.id,
          name: item.name,
          url: item.url,
          title,
          metaDesc,
          canonical,
          headings,
          sections,
          buttons,
          imgs,
          faqs,
          bodyText
        };
      }, item);

      allPageData.push(pageData);

      // Collect images to download
      pageData.imgs.forEach(img => {
        if (img.src && (img.src.startsWith('http://') || img.src.startsWith('https://'))) {
          // generate clean filename
          try {
            const urlObj = new URL(img.src);
            const base = path.basename(urlObj.pathname);
            if (base && !base.includes('?') && base.includes('.')) {
              allImagesToDownload.set(img.src, base);
            } else {
              const safeName = (img.alt ? img.alt.toLowerCase().replace(/[^a-z0-9]+/g, '_') : 'image') + '_' + Math.random().toString(36).substring(7) + '.png';
              allImagesToDownload.set(img.src, safeName);
            }
          } catch (e) {}
        }
      });

    } catch (err) {
      console.error(`Error auditing ${item.url}:`, err.message);
      allPageData.push({
        id: item.id,
        name: item.name,
        url: item.url,
        error: err.message
      });
    } finally {
      await page.close();
    }
  }

  // Brand style extraction from home page
  console.log('Extracting brand styling, fonts, and colors from home page...');
  const brandPage = await browser.newPage();
  await brandPage.goto('https://www.karka.academy/', { waitUntil: 'networkidle2' });
  const brandData = await brandPage.evaluate(() => {
    const computedBody = window.getComputedStyle(document.body);
    const fonts = {
      bodyFont: computedBody.fontFamily,
      headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => ({
        tag: h.tagName,
        fontFamily: window.getComputedStyle(h).fontFamily,
        fontSize: window.getComputedStyle(h).fontSize,
        fontWeight: window.getComputedStyle(h).fontWeight,
        color: window.getComputedStyle(h).color
      }))
    };

    const buttons = Array.from(document.querySelectorAll('button, a[class*="rounded"]')).slice(0, 10).map(btn => {
      const style = window.getComputedStyle(btn);
      return {
        text: btn.innerText.trim(),
        backgroundColor: style.backgroundColor,
        color: style.color,
        borderRadius: style.borderRadius,
        padding: style.padding,
        boxShadow: style.boxShadow,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight
      };
    });

    const colors = new Set();
    document.querySelectorAll('*').forEach(el => {
      const s = window.getComputedStyle(el);
      if (s.color) colors.add(s.color);
      if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)') colors.add(s.backgroundColor);
    });

    return {
      fonts,
      buttons,
      detectedColors: Array.from(colors).slice(0, 50)
    };
  });
  await brandPage.close();
  await browser.close();

  // Save raw data to json
  fs.writeFileSync(path.join(OUTPUT_DIR, 'raw_crawl_data.json'), JSON.stringify({ pages: allPageData, brandData }, null, 2));
  console.log('Saved raw crawl data.');

  // Download key assets
  console.log(`Downloading ${allImagesToDownload.size} assets to docs/site-audit/assets/...`);
  let downloadedCount = 0;
  for (const [imgUrl, filename] of allImagesToDownload.entries()) {
    const cleanFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '_');
    const dest = path.join(ASSETS_DIR, cleanFilename);
    try {
      await downloadFile(imgUrl, dest);
      downloadedCount++;
    } catch (e) {
      console.warn(`Failed downloading ${imgUrl}:`, e.message);
    }
  }
  console.log(`Downloaded ${downloadedCount} assets.`);

  console.log('Site audit crawling completed successfully!');
}

runAudit();
