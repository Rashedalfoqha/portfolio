export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-grid" aria-hidden="true" />
      <a
        className="mark not-found-mark"
        href="/"
        aria-label="Return to Rashed Alfuqaha home"
      >
        <span>R</span>
        <i />
        <span>A</span>
      </a>
      <section>
        <p className="kicker">COORDINATE / 404</p>
        <h1>This path left the pattern.</h1>
        <p>The portfolio is intact, but this page does not exist.</p>
        <a className="primary-link" href="/">
          Return home <span aria-hidden="true">←</span>
        </a>
      </section>
      <div className="not-found-coordinate" aria-hidden="true">
        <span>4</span>
        <i />
        <span>4</span>
      </div>
    </main>
  );
}
