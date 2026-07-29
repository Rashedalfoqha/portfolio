const fallbackSiteUrl =
  "https://rashed-alfuqaha-portfolio.rashedalfoqha002.chatgpt.site";

function normalizeSiteUrl(value: string) {
  const url = new URL(value);
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

export function getSiteUrl() {
  const configuredUrl =
    (typeof window !== "undefined" ? window.location.origin : undefined) ??
    import.meta.env.VITE_SITE_URL ??
    fallbackSiteUrl;

  try {
    return normalizeSiteUrl(configuredUrl);
  } catch {
    return normalizeSiteUrl(fallbackSiteUrl);
  }
}
