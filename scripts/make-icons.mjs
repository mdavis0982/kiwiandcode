/**
 * Renders the PNG icons in public/ from the logo geometry in src/lib/kiwiMark.ts:
 *
 *   apple-touch-icon.png  180×180   home-screen icon
 *   logo-square.png       1080×1080 profile picture (Instagram etc.) and schema.org logo
 *   og-image.png          1200×630  social sharing preview
 *
 * Run with `npm run icons` after changing the mark. Uses headless Google Chrome
 * to rasterise, so Chrome must be installed (set CHROME to its path if it isn't
 * in the usual macOS spot). Needs Node 22.18+ to import the .ts file directly.
 */
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { colors, markMarkup } from '../src/lib/kiwiMark.ts';

const root = resolve(import.meta.dirname, '..');
const chrome = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const font = pathToFileURL(join(root, 'node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2'));

const mark = (id, scale = 1) =>
  `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><g transform="translate(60 60) scale(${scale}) translate(-60 -60)">${markMarkup(id)}</g></svg>`;

const page = (width, height, body) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
@font-face { font-family: Archivo; src: url('${font}') format('woff2'); font-stretch: 62% 125%; font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
html, body { width: ${width}px; height: ${height}px; overflow: hidden; }
body { background: ${colors.ink}; color: #F5F3EA; font-family: Archivo, sans-serif; }
svg { display: block; }
</style></head><body>${body}</body></html>`;

const icons = [
  {
    file: 'apple-touch-icon.png',
    width: 180,
    height: 180,
    // iOS rounds the corners itself, so fill the whole square.
    body: `<div style="display:grid;place-items:center;height:100%">${mark('touch', 0.86)}</div>`,
  },
  {
    file: 'logo-square.png',
    width: 1080,
    height: 1080,
    // Instagram crops to a circle, so keep the mark well inside it.
    body: `<div style="display:grid;place-items:center;height:100%;background:radial-gradient(circle at 70% 25%, rgb(155 225 93 / .16), transparent 60%)">
      <div style="width:760px">${mark('square')}</div></div>`,
  },
  {
    file: 'og-image.png',
    width: 1200,
    height: 630,
    body: `<div style="position:relative;display:flex;align-items:center;gap:64px;height:100%;padding:0 96px;
        background:radial-gradient(circle at 85% 15%, rgb(155 225 93 / .18), transparent 55%),radial-gradient(circle at 0% 100%, rgb(255 122 89 / .14), transparent 55%)">
      <div style="flex:none;width:340px">${mark('og')}</div>
      <div>
        <p style="font-size:84px;font-weight:800;font-stretch:112%;letter-spacing:-0.03em;line-height:1">Kiwi <span style="color:${colors.lime};font-weight:600">and</span> Code</p>
        <p style="margin-top:28px;font-size:34px;font-weight:500;line-height:1.3;color:#B4BFB7;max-width:620px">Clean, affordable websites for <span style="color:${colors.kiwi}">local businesses</span> in County Down, Ireland.</p>
      </div>
    </div>`,
  },
];

const dir = mkdtempSync(join(tmpdir(), 'kc-icons-'));
try {
  for (const icon of icons) {
    const html = join(dir, icon.file.replace('.png', '.html'));
    writeFileSync(html, page(icon.width, icon.height, icon.body));
    execFileSync(chrome, [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${icon.width},${icon.height}`,
      `--screenshot=${join(root, 'public', icon.file)}`,
      pathToFileURL(html).href,
    ], { stdio: 'ignore' });
    console.log(`public/${icon.file}  ${icon.width}×${icon.height}`);
  }
} finally {
  rmSync(dir, { recursive: true, force: true });
}
