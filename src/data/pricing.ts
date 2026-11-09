/**
 * All prices on the site come from this file. This is the one place to change them.
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

/**
 * Spread the cost: any package can be paid over 12 months instead of up
 * front. A deposit to start, then 12 equal payments once the site is live.
 * The payments end after 12 months and the site is fully the client's.
 * Spreading adds a small flat fee. Care plans are separate and optional.
 */
export const spread = {
  deposit: 95,
  months: 12,
  fee: 60,
};

/** Monthly payment when a price is spread over 12 months (rounded up to £1). */
export const monthlyFor = (price: number) => Math.ceil((price + spread.fee - spread.deposit) / spread.months);

/** Total paid when spreading a price over 12 months. */
export const spreadTotal = (price: number) => spread.deposit + monthlyFor(price) * spread.months;
