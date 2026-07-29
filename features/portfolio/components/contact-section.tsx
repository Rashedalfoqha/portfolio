import { profileLinks } from "@/shared/config/profile-links";

export function ContactSection() {
  return (
    <section className="contact" id="contact">
      <div className="contact-index" aria-hidden="true">
        06
      </div>
      <p className="eyebrow">
        <span>REMOTE / FREELANCE</span>
        <span>AVAILABLE FOR THE RIGHT FIT</span>
      </p>
      <h2>
        Have a product
        <br />
        that needs to <em>work?</em>
      </h2>
      <p>
        Send the product, problem, or feature. If I can help, I&apos;ll tell you
        how.
      </p>
      <a className="button button-light" href={profileLinks.email.href}>
        Send me the brief <span>↗</span>
      </a>
      <footer>
        <span>© 2026 RASHED MOHAMMAD ALFUQAHA</span>
        <nav aria-label="Social links">
          {profileLinks.social.map((link) => (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              key={link.label}
            >
              {link.label} ↗
            </a>
          ))}
        </nav>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}
