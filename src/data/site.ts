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
  title: 'Kiwi and Code | Affordable websites for small businesses in County Down, Ireland',
  description:
    'Clean, fast, affordable websites for small and local businesses in County Down, Ireland. Built by Marcus Davis, a local developer you can talk to.',
  ogImage: '/og-image.png',
};

/**
 * Where the main buttons and nav links point.
 * There's no separate examples index yet, so that one jumps to the homepage
 * section. When it exists, change it to '/examples/'.
 */
export const links = {
  examples: '/#examples',
  contact: '/contact/',
};

export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Examples', href: links.examples },
];
