import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              AURELLE
              <span>Fine Jewellery</span>
            </div>
            <p>
              Timeless pieces crafted with love. More than jewellery —
              it's a feeling. ✦
            </p>
            <div className="socials">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Pinterest">PT</a>
              <a href="#" aria-label="TikTok">TT</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/shop">Collections</Link></li>
              <li><Link to="/about">About Us </Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links">
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="footer-heading">Join the Aurelle Family</h4>
            <p className="newsletter-text">
              Be the first to know about new collections and exclusive offers.
            </p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Subscribe">→</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2025 Aurelle. All rights reserved.</span>
          <span>Crafted with ✦ in Pakistan</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer