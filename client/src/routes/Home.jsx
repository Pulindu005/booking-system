export default function Home() {
  return (
    <section className="home">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Sri Lanka stays and rides</p>
          <h1>Book a place, rent a ride, and explore nearby gems</h1>
          <p className="lede">
            Discover hotels, villas, and rentals in one place. Add listings, post
            vehicle ads, and guide travelers to beautiful places to visit.
          </p>
          <div className="hero-actions">
            <button className="primary">Start search</button>
            <button className="ghost">List your property</button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="stat">
            <span className="stat-label">Bookings made</span>
            <span className="stat-value">1,240+</span>
          </div>
          <div className="stat">
            <span className="stat-label">Vehicle listings</span>
            <span className="stat-value">380+</span>
          </div>
          <div className="stat">
            <span className="stat-label">Places to visit</span>
            <span className="stat-value">200+</span>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Choose your journey</h2>
        <div className="grid">
          <article className="card">
            <h3>Hotels and villas</h3>
            <p>Browse stays with clear pricing, photos, and instant booking.</p>
          </article>
          <article className="card">
            <h3>Vehicles for rent</h3>
            <p>Find cars, bikes, and three wheelers with trusted hosts.</p>
          </article>
          <article className="card">
            <h3>Nearby places</h3>
            <p>Help guests explore beaches, waterfalls, and local food spots.</p>
          </article>
        </div>
      </div>

      <div className="section highlight">
        <div>
          <h2>Hosts can post ads in minutes</h2>
          <p>
            Share your property or vehicle, set availability, and accept bookings
            with confidence.
          </p>
        </div>
        <button className="primary">Create listing</button>
      </div>
    </section>
  );
}
