export const profileLinks = {
  email: {
    address: "rashedmohammadalfuqaha@gmail.com",
    href: "mailto:rashedmohammadalfuqaha@gmail.com",
  },
  social: [
    { label: "GitHub", href: "https://github.com/Rashedalfoqha" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rashedalfuqaha/" },
  ],
} as const;

export const socialProfileUrls = profileLinks.social.map(({ href }) => href);
