interface Env {
  ASSETS: Fetcher;
}

const NETLIFY_ORIGIN = "https://transition-music.netlify.app";
const FORM_PATHS = new Set([
  "/.netlify/functions/contact",
  "/.netlify/functions/submit-music",
]);

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (FORM_PATHS.has(url.pathname) && request.method === "POST") {
      const upstream = await fetch(`${NETLIFY_ORIGIN}${url.pathname}`, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: "follow",
      });

      const headers = new Headers(upstream.headers);
      headers.set("cache-control", "no-store");
      return new Response(upstream.body, {
        status: upstream.status,
        statusText: upstream.statusText,
        headers,
      });
    }

    return env.ASSETS.fetch(request);
  },
};
