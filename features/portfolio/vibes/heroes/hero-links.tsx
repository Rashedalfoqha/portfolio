export function HeroLinks({ label = "Inspect selected work" }: { label?: string }) {
  return (
    <div className="vibe-hero-links">
      <a href="#work">{label}<span aria-hidden="true">↘</span></a>
      <a
        href="/Rashed_Mohammad_Alfuqaha_CV_EN_2026.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open CV <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
