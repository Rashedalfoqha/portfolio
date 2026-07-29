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
    process.env.URL ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    fallbackSiteUrl;

  try {
    return normalizeSiteUrl(configuredUrl);
  } catch {
    return normalizeSiteUrl(fallbackSiteUrl);
  }
}
