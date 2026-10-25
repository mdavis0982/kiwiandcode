/**
 * Geometry for the Kiwi and Code mark: a kiwi slice between code brackets.
 *
 * Coordinates match the original 1080×1080 logo PNG, so the slice is centred
 * at (540, 450). Both the header logo (LogoMark.astro) and the favicon
 * (pages/favicon.svg.ts) are drawn from these numbers, so they always match.
 */

export const colors = {
  forest: '#112A1F',
  kiwi: '#8CC63F',
  ray: '#A6D457',
  ring: '#C3E27F',
  core: '#F4F2D8',
  skin: '#7D5733',
  seed: '#2A1B10',
};

export const center = { x: 540, y: 450 };

export const radius = {
  skin: 200, // brown rim
  flesh: 187, // main green
  ring: 125, // pale inner ring
  core: 60, // cream centre
};

/** Crop of the logo that holds just the mark (no wordmark). */
export const viewBox = '180 240 720 420';

/** Chevron paths for the < and > brackets. */
export const brackets = {
  left: 'M285 357 L200 450 L285 543',
  right: 'M795 357 L880 450 L795 543',
  width: 26,
};

const SEED_COUNT = 18;
const SEED_RADIUS = 97;
const RAY_COUNT = 40;

const round = (n: number) => Math.round(n * 10) / 10;

/** Seeds sit in a ring, each one pointing out from the centre. */
export const seeds = Array.from({ length: SEED_COUNT }, (_, i) => {
  const angle = (i / SEED_COUNT) * 360;
  const rad = (angle * Math.PI) / 180;
  return {
    cx: round(center.x + SEED_RADIUS * Math.sin(rad)),
    cy: round(center.y - SEED_RADIUS * Math.cos(rad)),
    // SVG rotation is clockwise from "up", which matches how we placed them.
    rotate: round(angle),
  };
});

/** Faint radial lines in the flesh, alternating long and short. */
export const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
  const rad = ((i + 0.5) / RAY_COUNT) * Math.PI * 2;
  const inner = i % 2 === 0 ? 136 : 150;
  const outer = 176;
  return {
    x1: round(center.x + inner * Math.sin(rad)),
    y1: round(center.y - inner * Math.cos(rad)),
    x2: round(center.x + outer * Math.sin(rad)),
    y2: round(center.y - outer * Math.cos(rad)),
  };
});

/** The kiwi slice as a plain SVG string (used by the favicon). */
export function sliceMarkup(): string {
  const { x, y } = center;
  return [
    `<circle cx="${x}" cy="${y}" r="${radius.skin}" fill="${colors.skin}"/>`,
    `<circle cx="${x}" cy="${y}" r="${radius.flesh}" fill="${colors.kiwi}"/>`,
    `<g stroke="${colors.ray}" stroke-width="5" stroke-linecap="round">`,
    ...rays.map((r) => `<line x1="${r.x1}" y1="${r.y1}" x2="${r.x2}" y2="${r.y2}"/>`),
    `</g>`,
    `<circle cx="${x}" cy="${y}" r="${radius.ring}" fill="${colors.ring}"/>`,
    `<circle cx="${x}" cy="${y}" r="${radius.core}" fill="${colors.core}"/>`,
    `<g fill="${colors.seed}">`,
    ...seeds.map(
      (s) => `<ellipse cx="${s.cx}" cy="${s.cy}" rx="7" ry="12" transform="rotate(${s.rotate} ${s.cx} ${s.cy})"/>`,
    ),
    `</g>`,
  ].join('');
}
