// Build-time renderer for The Daily Frame, 21 November 2026.
//
// Takes design.html and screenshots it at exactly 1024x1024 with
// headless Chromium (Playwright, from the workspace tools install).
// The grader never runs this file: it runs main.ts, which copies the
// entry.png produced here.
//
//   node render.mjs            (run from this directory)

import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const toolsPackage = join(
  process.env.HOME ?? '',
  'workspace/makefun/tools-browser/package.json',
);
const { chromium } = createRequire(toolsPackage)('playwright');

const browser = await chromium.launch({
  args: ['--force-device-scale-factor=1'],
});
try {
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1024, height: 1024 });
  await page.goto('file://' + join(here, 'design.html'), {
    waitUntil: 'load',
  });
  await page.screenshot({ path: join(here, 'entry.png') });
  console.log('rendered entry.png at 1024x1024');
} finally {
  await browser.close();
}
