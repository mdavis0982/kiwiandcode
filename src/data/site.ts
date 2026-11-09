/**
 * Site-wide settings. Edit details here and every page picks them up.
 */
export const site = {
  name: 'Kiwi and Code',
  url: 'https://kiwiandcode.co.uk',
  owner: 'Marcus Davis',
  email: 'marcus@kiwiandcode.co.uk',
  area: 'County Down, Ireland',

  // Full profile URL. Set to null to show "Instagram coming soon" in the footer.
  instagram: 'https://www.instagram.com/kiwiandcode/' as string | null,

  // Default SEO text, used by any page that doesn't set its own.
  // Title and description only appear in Google results and link previews, never
  // on the page, so they say "Northern Ireland" (what people search for). Visible
  // page text says "County Down" and "Ireland" instead.
  title: 'Web Design County Down, Northern Ireland | Kiwi and Code',
  description:
    'Affordable web design for small and local businesses in County Down, Northern Ireland. Fast, clean websites built by Marcus Davis, a local developer you can talk to.',

  // Towns listed in the structured data as places served (not shown on the page).
  townsServed: ['Downpatrick', 'Ballynahinch', 'Saintfield', 'Newcastle', 'Castlewellan', 'Comber', 'Newtownards', 'Banbridge', 'Dromore', 'Carryduff'],
  ogImage: '/og-image.png',
};

/**
 * Where the main buttons and nav links point.
 * There's no separate examples index yet, so that one jumps to the homepage
 * section. When it exists, change it to '/examples/'.
 */
export const links = {
  examples: '/#examples',
  pricing: '/#pricing',
  contact: '/contact/',
};

export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Examples', href: links.examples },
  { label: 'Prices', href: links.pricing },
];
