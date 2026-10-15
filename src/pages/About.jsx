import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <div className="about">

      {/* ===== Hero ===== */}
      <section className="about-hero">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1>Crafted with Love,<br />Worn with Pride</h1>
          <p>
            Aurelle was born from a simple belief — every woman deserves
            jewellery that feels as special as the moment she wears it for.
          </p>
        </div>
      </section>

      {/* ===== Story ===== */}
      <section className="about-story container">
        <div className="story-img">
          <img src="/images/hero/hero9.jpg" alt="Aurelle craftsmanship" />
        </div>
        <div className="story-text">
          <span className="section-label">The Aurelle Journey</span>
          <h2>From a Small Dream to Timeless Elegance</h2>
          <p>
            What began as a passion for beautiful things has grown into a
            curated collection of fine jewellery — each piece selected with
            care, crafted with precision, and delivered with love.
          </p>
          <p>
            From everyday essentials to once-in-a-lifetime pieces, every
            design at Aurelle tells a story — yours. We believe jewellery is
            more than an accessory; it's a feeling, a memory, a quiet
            celebration of who you are.
          </p>
          <div className="story-signature">— Team Aurelle ✦</div>
        </div>
      </section>

      {/* ===== Values ===== */}
      <section className="about-values container">
        <span className="section-label">Why Aurelle</span>
        <h2 className="section-title">What We Stand For</h2>

        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">✦</div>
            <h3>Craftsmanship</h3>
            <p>Every piece is finished by hand with attention to the smallest detail.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">♡</div>
            <h3>Quality First</h3>
            <p>Premium, tarnish-free materials that stay beautiful for years.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">✿</div>
            <h3>Honest Pricing</h3>
            <p>Luxury without the markup — fair prices, always.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">☾</div>
            <h3>Made for You</h3>
            <p>Designs inspired by real women, real moments, real stories.</p>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="about-stats">
        <div className="container stats-grid">
          <div className="stat">
            <strong>10,000+</strong>
            <span>Happy Customers</span>
          </div>
          <div className="stat">
            <strong>500+</strong>
            <span>Unique Designs</span>
          </div>
          <div className="stat">
            <strong>4.9 ★</strong>
            <span>Average Rating</span>
          </div>
          <div className="stat">
            <strong>100%</strong>
            <span>Premium Quality</span>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="about-cta container">
        <h2>Find the Piece That Tells Your Story</h2>
        <Link to="/shop" className="btn-gold">Explore Collection</Link>
      </section>
    </div>
  )
}

export default About