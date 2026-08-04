import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rashed Alfuqaha - From Pattern to Product",
    short_name: "Rashed Alfuqaha",
    description:
      "Full-stack systems, real-time products, and an AI-augmented engineering workflow.",
    start_url: "/",
    lang: "en",
    dir: "ltr",
    display: "standalone",
    background_color: "#10100f",
    theme_color: "#10100f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
