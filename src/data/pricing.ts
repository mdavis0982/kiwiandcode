/**
 * Prices shown on the homepage. This is the one place to change them.
 * Full price list (with extras and payment terms) lives in the Kiwi and Code
 * Price List doc; keep the two in step.
 */

export type Package = {
  name: string;
  price: number; // full "from" price in pounds
  bestFor: string;
  features: string[];
  popular?: boolean;
};

export const packages: Package[] = [
  {
    name: 'Starter',
    price: 395,
    bestFor: 'A new business, or one with only a Facebook page',
    features: ['One page, laid out in sections', 'Contact form, map and opening hours', '2 rounds of changes'],
  },
  {
    name: 'Standard',
    price: 695,
    bestFor: 'Most local businesses: trades, gyms, salons, cafés',
    features: ['Up to 5 pages and a photo gallery', 'Google Business Profile set up', '3 rounds of changes'],
    popular: true,
  },
  {
    name: 'Shop or Booking',
    price: 1195,
    bestFor: 'Selling products online or taking bookings',
    features: ['Everything in Standard', 'Up to 20 products, or a booking calendar', '3 or more rounds of changes'],
  },
];

export const carePlans = [
  { name: 'Essentials', monthly: 25, text: 'Updates, backups and up to 30 minutes of changes a month' },
  { name: 'Plus', monthly: 45, text: 'Up to 2 hours of changes, faster replies and a review call every 3 months' },
];

/**
 * Founding client offer. Set `active: false` to hide the banner and show
 * normal prices, and lower `spotsLeft` as places are taken.
 */
export const offer = {
  active: true,
  percent: 30,
  spotsLeft: 3,
  spotsTotal: 3,
};

/** Offer price, rounded down to the nearest £5. */
export const offerPrice = (price: number) => Math.floor((price * (100 - offer.percent)) / 100 / 5) * 5;

export const formatPrice = (pounds: number) => `£${pounds.toLocaleString('en-GB')}`;

export const showOffer = offer.active && offer.spotsLeft > 0;
