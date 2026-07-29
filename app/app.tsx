import { PortfolioExperience } from "@/features/portfolio";
import {
  createChapterParts,
  createProjectList,
} from "@/features/portfolio/schema";
import {
  profileLinks,
  socialProfileUrls,
} from "@/shared/config/profile-links";
import { getSiteUrl } from "@/shared/config/site-url";
import NotFound from "./not-found";

function StructuredData() {
  const productionUrl = getSiteUrl();
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
      "Linux",
      "GitHub",
      "Postman",
      "Bootstrap",
      "jQuery",
      "API development",
      "Database design",
      "SaaS products",
      "Islamic arts and ornamental architecture",
      "Geometric pattern design",
    ],
  };
  const profileSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": profilePageId,
    name: "Rashed Alfuqaha - Full-Stack Software Engineer",
    headline:
      "Full-Stack Software Engineer building production-grade web apps end to end.",
    url: productionUrl.href,
    dateModified: "2026-07-29",
    inLanguage: "en",
    mainEntity: person,
    hasPart: [
      ...createChapterParts(productionUrl.href, "en", person["@id"]),
      createProjectList(productionUrl.href, "en"),
    ],
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export function App() {
  return (
    <>
      {window.location.pathname === "/" ? <PortfolioExperience /> : <NotFound />}
      <StructuredData />
    </>
  );
}
