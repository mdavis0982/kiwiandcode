/**
 * Tiny Cloudflare Worker in front of the static site.
 * - Sends www.kiwiandcode.co.uk to kiwiandcode.co.uk (301, keeps path and query).
 * - Everything else is served straight from the built site in dist/.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === 'www.kiwiandcode.co.uk') {
      url.hostname = 'kiwiandcode.co.uk';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    return env.ASSETS.fetch(request);
  },
};
