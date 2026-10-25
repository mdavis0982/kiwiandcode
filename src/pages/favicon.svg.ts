/**
 * Builds /favicon.svg at build time from the same geometry as the header logo.
 * A rounded ink square keeps the mark readable on light and dark tabs, and
 * shows through the slash between the two halves.
 */
import type { APIRoute } from 'astro';
import { colors, markMarkup } from '../lib/kiwiMark';

export const GET: APIRoute = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
<rect width="120" height="120" rx="26" fill="${colors.ink}"/>
<g transform="translate(60 60) scale(1.12) translate(-60 -60)">${markMarkup('fav')}</g>
</svg>`;

  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
