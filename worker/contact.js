/**
 * Contact form handler: POST /api/contact.
 *
 * Checks the fields, quietly drops obvious bots (a hidden "honeypot" field and
 * forms sent within a couple of seconds of loading), then emails the message
 * to Marcus through Cloudflare Email Routing (the SEND_EMAIL binding in
 * wrangler.jsonc). Replying to the email goes straight to the visitor.
 *
 * Answers JSON when the page's script sends the form, and redirects to a
 * thank-you or problem page when the browser posts it without JavaScript.
 *
 * EmailMessage is passed in rather than imported, so this file can be tested
 * outside Cloudflare.
 */

const FROM = 'website@kiwiandcode.co.uk';
const TO = 'kiwiandcode@gmail.com';

/** Field limits. Required fields have a minimum length of 1 or more. */
const FIELDS = {
  name: { min: 1, max: 100 },
  email: { min: 3, max: 200 },
  phone: { min: 0, max: 40 },
  business: { min: 0, max: 120 },
  service: { min: 0, max: 60 },
  message: { min: 10, max: 5000 },
};

const EMAIL_PATTERN = /^[^\s@<>()",;:]+@[^\s@<>()",;:]+\.[^\s@<>()",;:]+$/;

/** Returns { values, errors } where errors maps a field name to a message. */
export function validate(form) {
  const values = {};
  const errors = {};

  for (const [field, { min, max }] of Object.entries(FIELDS)) {
    const raw = form.get(field);
    const value = typeof raw === 'string' ? raw.trim() : '';
    values[field] = value;

    if (value.length < min) {
      errors[field] =
        field === 'message'
          ? 'Please write a little more about what you need (at least 10 characters).'
          : `Please enter your ${field === 'email' ? 'email address' : field}.`;
    } else if (value.length > max) {
      errors[field] = `That's a bit long. Please keep it under ${max} characters.`;
    }
  }

  // Single-line fields must not contain line breaks (they go into email headers).
  for (const field of ['name', 'email', 'phone', 'business', 'service']) {
    values[field] = values[field].replace(/[\r\n]+/g, ' ');
  }
  if (!errors.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = 'Please enter an email address like name@example.com.';
  }

  return { values, errors };
}

/** True when the submission looks automated. */
export function looksLikeBot(form, now = Date.now()) {
  if (String(form.get('website') ?? '').trim() !== '') return true; // honeypot
  const started = Number(form.get('started'));
  return Number.isFinite(started) && started > 0 && now - started < 2500;
}

/** Encodes a header value that may contain non-ASCII characters. */
function encodeHeader(text) {
  return /^[\x20-\x7e]*$/.test(text) ? text : `=?UTF-8?B?${base64(text)}?=`;
}

function base64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/** Builds the raw MIME email for a valid submission. */
export function buildEmail(values, { id = crypto.randomUUID(), date = new Date() } = {}) {
  const lines = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    values.phone ? `Phone: ${values.phone}` : null,
    values.business ? `Business: ${values.business}` : null,
    values.service ? `Looking for: ${values.service}` : null,
    '',
    values.message,
    '',
    '--',
    'Sent from the contact form on kiwiandcode.co.uk. Reply to this email to answer them directly.',
  ].filter((line) => line !== null);

  const body = base64(lines.join('\r\n')).replace(/.{76}/g, '$&\r\n');
  const subject = `Website enquiry from ${values.name}${values.business ? ` (${values.business})` : ''}`;

  return [
    `From: ${encodeHeader('Kiwi and Code website')} <${FROM}>`,
    `To: <${TO}>`,
    `Reply-To: <${values.email}>`,
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${date.toUTCString()}`,
    `Message-ID: <${id}@kiwiandcode.co.uk>`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
    '',
    body,
  ].join('\r\n');
}

function respond(request, ok, { status = ok ? 200 : 400, errors } = {}) {
  const wantsJson = (request.headers.get('Accept') ?? '').includes('application/json');
  if (wantsJson) {
    return Response.json({ ok, ...(errors ? { errors } : {}) }, { status });
  }
  const page = ok ? '/contact/sent/' : '/contact/problem/';
  return Response.redirect(new URL(page, request.url).toString(), 303);
}

export async function handleContact(request, env, EmailMessage) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return respond(request, false);
  }

  // Pretend it worked, so bots get no signal to adapt to.
  if (looksLikeBot(form)) return respond(request, true);

  const { values, errors } = validate(form);
  if (Object.keys(errors).length) return respond(request, false, { errors });

  try {
    await env.SEND_EMAIL.send(new EmailMessage(FROM, TO, buildEmail(values)));
  } catch (error) {
    console.error('Contact form email failed', error);
    return respond(request, false, { status: 502 });
  }
  return respond(request, true);
}
