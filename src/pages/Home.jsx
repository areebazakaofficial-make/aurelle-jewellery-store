import { Link } from 'react-router-dom'
import { products } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './Home.css'

const categoryData = [
  {
    name: 'Rings',
    image: '/images/rings/r1.jpg',
  },
  {
    name: 'Necklaces',
    image: '/images/necklace/n1.jpg',
  },
  {
    name: 'Earrings',
    image: '/images/earings/e4.jpg',
  },
  {
    name: 'Bracelets',
    image: '/images/bracelet/img4.jpg',
  },
]

function Home() {
  return (
    <div className="home">

      {/* ============ HERO (image left + text right) ============ */}
      <section className="hero">
        <div className="hero-img">
          <img src="/images/hero/hero9.jpg" alt="Aurelle Fine Jewellery" />
        </div>
        <div className="hero-content fade-in">
          <span className="section-label">Timeless Elegance</span>
          <h1>Jewelry for<br />Every Moment</h1>
          <p>
            From everyday essentials to once-in-a-lifetime pieces,
            find jewelry that tells your story.
          </p>
          <Link to="/shop" className="btn-gold">Explore Collection</Link>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="categories container" id="collections">
        <span className="section-label">Our Collections</span>
        <h2 className="section-title">Discover Your Style</h2>

        <div className="category-grid">
          {categoryData.map((cat) => (
            <Link
              to={`/shop?category=${cat.name}`}
              key={cat.name}
              className="category-card"
            >
              <div className="category-img">
                <img src={cat.image} alt={cat.name} loading="lazy" />
              </div>
              <div className="category-row">
                <span>{cat.name}</span>
                <span className="category-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ BESTSELLERS ============ */}
      <section className="bestsellers container">
        <div className="bestsellers-head">
          <div>
            <span className="section-label">Bestsellers</span>
            <h2 className="section-title">Most Loved Pieces</h2>
          </div>
          <Link to="/shop" className="btn-outline">Shop All</Link>
        </div>

        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ============ FEATURES STRIP ============ */}
      <section className="features">
        <div className="container features-grid">

          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
                <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
                <path d="M2 9h20M12 21L8 9l4-6 4 6-4 12" />
              </svg>
            </div>
            <h4>Premium Quality</h4>
            <p>Crafted with care</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="5" width="14" height="12" rx="1" />
                <path d="M15 9h4l3 4v4h-7" />
                <circle cx="6" cy="19" r="2" />
                <circle cx="18" cy="19" r="2" />
              </svg>
            </div>
            <h4>Free Shipping</h4>
            <p>On orders above PKR 5,000</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h4>Secure Payment</h4>
            <p>100% safe & trusted</p>
          </div>

          <div className="feature">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
              </svg>
            </div>
            <h4>24/7 Support</h4>
            <p>We're here to help</p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home