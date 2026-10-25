/**
 * Builds /favicon.svg at build time from the same geometry as the header logo.
 * A rounded forest-green square keeps the mark readable on light and dark tabs.
 */
import type { APIRoute } from 'astro';
import { brackets, colors, sliceMarkup } from '../lib/kiwiMark';

export const GET: APIRoute = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="160 70 760 760">
<rect x="160" y="70" width="760" height="760" rx="150" fill="${colors.forest}"/>
<g fill="none" stroke="${colors.kiwi}" stroke-width="${brackets.width + 8}" stroke-linecap="round" stroke-linejoin="round">
<path d="${brackets.left}"/><path d="${brackets.right}"/>
</g>
${sliceMarkup()}
</svg>`;

  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
