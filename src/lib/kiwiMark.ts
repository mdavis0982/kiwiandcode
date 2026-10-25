/**
 * Geometry for the Kiwi and Code mark: a kiwi slice cut clean in two by a
 * slash, the "/" from </>. The two halves sit slightly apart so the gap
 * between them reads as the slash.
 *
 * Everything is drawn on a 120×120 grid centred at (60, 60). The header and
 * hero logo (LogoMark.astro), the favicon (pages/favicon.svg.ts) and the
 * PNG icons (scripts/make-icons.mjs) are all built from these numbers, so
 * they always match.
 */

export const colors = {
  ink: '#0D1B14',
  skin: '#7A4E2C',
  kiwi: '#9BE15D',
  lime: '#D4F5A8',
  paper: '#FAF7EC',
};

export const viewBox = '0 0 120 120';
export const center = { x: 60, y: 60 };

export const radius = {
  skin: 46, // brown rim
  flesh: 42.5, // main green
  ring: 27, // pale inner ring
  core: 11, // cream centre
};

/**
 * The cut runs from (75, -10) to (45, 130), through the centre, leaning like
 * a "/". Each half is clipped to one side of it, then nudged away from the
 * line by `offset` (along the line's normal) to open the gap.
 */
export const cut = {
  left: '-10,-10 75,-10 45,130 -10,130',
  right: '75,-10 130,-10 130,130 45,130',
  offset: { x: 3.9, y: 0.8 },
};

const SEED_COUNT = 10;
const SEED_RADIUS = 19;

const round = (n: number) => Math.round(n * 10) / 10;

/** Seeds sit in a ring, each one pointing out from the centre. */
export const seeds = Array.from({ length: SEED_COUNT }, (_, i) => {
  const angle = (i / SEED_COUNT) * 360 + 18;
  const rad = (angle * Math.PI) / 180;
  return {
    cx: round(center.x + SEED_RADIUS * Math.sin(rad)),
    cy: round(center.y - SEED_RADIUS * Math.cos(rad)),
    rotate: round(angle),
  };
});

export const seedSize = { rx: 1.9, ry: 3.7 };

/** One whole (uncut) slice as a plain SVG string. */
export function sliceMarkup(): string {
  const { x, y } = center;
  return [
    `<circle cx="${x}" cy="${y}" r="${radius.skin}" fill="${colors.skin}"/>`,
    `<circle cx="${x}" cy="${y}" r="${radius.flesh}" fill="${colors.kiwi}"/>`,
    `<circle cx="${x}" cy="${y}" r="${radius.ring}" fill="${colors.lime}"/>`,
    `<circle cx="${x}" cy="${y}" r="${radius.core}" fill="${colors.paper}"/>`,
    `<g fill="${colors.ink}">`,
    ...seeds.map(
      (s) =>
        `<ellipse cx="${s.cx}" cy="${s.cy}" rx="${seedSize.rx}" ry="${seedSize.ry}" transform="rotate(${s.rotate} ${s.cx} ${s.cy})"/>`,
    ),
    `</g>`,
  ].join('');
}

/**
 * The full cut mark as SVG elements (no <svg> wrapper), for the favicon and
 * PNG icons. `id` keeps clip-path ids unique if several marks share a page.
 */
export function markMarkup(id = 'kc'): string {
  const { x: dx, y: dy } = cut.offset;
  return [
    `<defs><clipPath id="${id}-l"><polygon points="${cut.left}"/></clipPath>`,
    `<clipPath id="${id}-r"><polygon points="${cut.right}"/></clipPath></defs>`,
    `<g clip-path="url(#${id}-l)" transform="translate(${-dx} ${-dy})">${sliceMarkup()}</g>`,
    `<g clip-path="url(#${id}-r)" transform="translate(${dx} ${dy})">${sliceMarkup()}</g>`,
  ].join('');
}
