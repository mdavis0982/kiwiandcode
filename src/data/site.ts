/**
 * Site-wide settings. Edit details here and every page picks them up.
 */
export const site = {
  name: 'Kiwi and Code',
  url: 'https://kiwiandcode.co.uk',
  owner: 'Marcus Davis',
  email: 'marcus@kiwiandcode.co.uk',
  area: 'County Down, Ireland',

  // Placeholder: set this to the full profile URL once the account exists,
  // e.g. 'https://www.instagram.com/kiwiandcode'. While it's null the footer
  // shows "Instagram coming soon" instead of a link.
  instagram: null as string | null,

  // Default SEO text, used by any page that doesn't set its own.
  title: 'Kiwi and Code | Affordable websites for small businesses in County Down, Ireland',
  description:
    'Clean, fast, affordable websites for small and local businesses in County Down, Ireland. Built by Marcus Davis, a local developer you can talk to.',
  ogImage: '/og-image.png',
};

/**
 * Where the main buttons and nav links point.
 * The examples and contact pages don't exist yet, so these jump to sections
 * on the homepage. When the real pages are built, change them to
 * '/examples/' and '/contact/'.
 */
export const links = {
  examples: '/#examples',
  contact: '/#contact',
};

export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'How it works', href: '/#process' },
  { label: 'About', href: '/#about' },
  { label: 'Examples', href: links.examples },
];
