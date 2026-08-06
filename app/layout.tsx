import type { Metadata, Viewport } from "next";
import "@fontsource-variable/jetbrains-mono";
import {
  profileLinks,
  socialProfileUrls,
} from "@/shared/config/profile-links";
import {
  createChapterParts,
  createProjectList,
} from "@/features/portfolio/schema";
import "./globals.css";
import "./final-overrides.css";
import "@/app/creative-direction.css";

const productionUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rashedalfouqaha.netlify.app",
);
const metadataBase = process.env.NODE_ENV === "development"
  ? new URL("http://localhost:3000")
  : productionUrl;

export const metadata: Metadata = {
  applicationName: "Rashed Alfuqaha - Software Engineer",
  title: "Rashed Alfuqaha - Full-Stack Software Engineer",
  description:
    "Rashed Alfuqaha is a full-stack software engineer in Amman building maintainable web apps with TypeScript, React, Next.js, Node.js, and NestJS.",
  metadataBase,
  alternates: {
    canonical: "/",
    languages: { en: "/", "x-default": "/" },
  },
  authors: [{ name: "Rashed Mohammad Alfuqaha" }],
  creator: "Rashed Mohammad Alfuqaha",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  keywords: [
    "Rashed Alfuqaha",
    "Full-Stack Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "NestJS Developer",
    "SCSS",
    "API Developer",
    "Database Design",
    "Figma Plugin Developer",
    "SVG Package Developer",
    "Developer Tooling",
    "Design Systems",
    "Amman Jordan",
    "Remote Developer",
  ],
  openGraph: {
    title: "Rashed Alfuqaha - Full-Stack Software Engineer",
    description:
      "One engineer, four signals: explore Rashed Alfuqaha’s full-stack work through four distinct digital experiences.",
    type: "website",
    url: "/",
    siteName: "Rashed Alfuqaha",
    locale: "en_US",
    images: [
      {
        url: "/og-four-signals.png",
        width: 1536,
        height: 804,
        type: "image/png",
        alt: "Rashed Alfuqaha - Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rashed Alfuqaha - Full-Stack Software Engineer",
    description:
      "One engineer. Four signals. Full-stack systems, developer tooling, and an AI-augmented workflow.",
    images: ["/og-four-signals.png"],
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#eeeae2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profilePageId = `${productionUrl.href}#profile-page`;
  const profileImageUrl = new URL("/rashed-photo.jpg", productionUrl).href;
  const person = {
    "@id": `${productionUrl.href}#rashed-alfuqaha`,
    "@type": "Person",
    name: "Rashed Mohammad Alfuqaha",
    alternateName: "Rashed Alfuqaha",
    jobTitle: "Full-Stack Software Engineer",
    description:
      "Full-stack software engineer in Amman building maintainable web apps across interfaces, APIs, real-time systems, and data workflows.",
    url: productionUrl.href,
    mainEntityOfPage: { "@id": profilePageId },
    image: {
      "@type": "ImageObject",
      "@id": `${productionUrl.href}#profile-image`,
      url: profileImageUrl,
      contentUrl: profileImageUrl,
      width: 600,
      height: 800,
      caption: "Rashed Mohammad Alfuqaha in Amman, Jordan",
      representativeOfPage: true,
    },
    email: profileLinks.email.href,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressCountry: "JO",
    },
    sameAs: socialProfileUrls,
    worksFor: {
      "@type": "Organization",
      name: "GoldenTik",
      alternateName: "CartBuzz",
    },
    alumniOf: [
      { "@type": "EducationalOrganization", name: "WISE University" },
      { "@type": "EducationalOrganization", name: "MERAKI Academy" },
    ],
    knowsLanguage: ["Arabic", "English", "Turkish"],
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "Socket.IO",
      "REST APIs",
      "Real-time web systems",
      "AI-augmented software development",
      "Figma Plugin API",
      "Design systems",
      "Smart Animate",
      "SVG package engineering",
      "SVGO",
      "ESM and CommonJS packages",
      "Docker",
      "SCSS",
      "GitHub",
      "Postman",
      "Bootstrap",
      "API development",
      "Database design",
      "Islamic arts and ornamental architecture",
      "Geometric pattern design",
    ],
  };
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": profilePageId,
    name: "Rashed Alfuqaha - Full-Stack Software Engineer",
    headline: "Full-Stack Software Engineer building maintainable web applications end to end.",
    url: productionUrl.href,
    dateModified: "2026-08-05",
    inLanguage: "en",
    mainEntity: person,
    hasPart: [...createChapterParts(productionUrl.href, "en", person["@id"]), createProjectList(productionUrl.href, "en")],
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${productionUrl.href}#website`,
    url: productionUrl.href,
    name: "Rashed Alfuqaha - Software Engineer",
    inLanguage: "en",
    author: { "@id": `${productionUrl.href}#rashed-alfuqaha` },
  };

  return (
    <html lang="en" dir="ltr">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
