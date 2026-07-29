import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";

const fallbackSiteUrl =
  "https://rashed-alfuqaha-portfolio.rashedalfoqha002.chatgpt.site";

function normalizedSiteUrl() {
  const url = new URL(
    process.env.URL ?? process.env.VITE_SITE_URL ?? fallbackSiteUrl,
  );
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url.href;
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "portfolio-html-metadata",
      transformIndexHtml(html) {
        return html.replaceAll(
          "https://portfolio.example/",
          normalizedSiteUrl(),
        );
      },
    },
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  server:
    process.env.CODEX_SANDBOX === "seatbelt"
      ? { watch: { useFsEvents: false, usePolling: true } }
      : undefined,
});
