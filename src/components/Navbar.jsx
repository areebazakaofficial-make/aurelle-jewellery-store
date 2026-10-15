import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import './Navbar.css'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  const marqueeText =
    '✦ Free Shipping on Orders Above PKR 5,000 ✦ Easy 7-Day Returns ✦ New Collection 2025 ✦ Crafted With Love'

  const closeAll = () => {
    setMenuOpen(false)
    setSearchOpen(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`)
      setSearchTerm('')
      closeAll()
    }
  }

  return (
    <>
      {/* ===== Scrolling Announcement Bar ===== */}
      <div className="announcement-bar">
        <div className="announcement-track">
          <span>{marqueeText}</span>
          <span aria-hidden="true">{marqueeText}</span>
        </div>
      </div>

      {/* ===== Sticky Navbar ===== */}
      <header className="navbar">
        <div className="container navbar-inner">

          {/* Logo */}
          <Link to="/" className="logo" onClick={closeAll}>
            <span className="logo-name">AURELLE</span>
            <span className="logo-tagline">Fine Jewellery</span>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>

          {/* Icons */}
          <div className="nav-icons">
            <button aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
            </button>
            <button aria-label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button aria-label="Wishlist" onClick={() => navigate('/wishlist')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
            </button>
            <button aria-label="Cart" onClick={() => navigate('/cart')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* ===== Search Bar ===== */}
        {searchOpen && (
          <div className="search-bar">
            <form className="container search-form" onSubmit={handleSearch}>
              <input
                type="text"
                autoFocus
                placeholder="Search for rings, necklaces, earrings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
              <button type="button" className="search-close" onClick={() => setSearchOpen(false)}>✕</button>
            </form>
          </div>
        )}

        {/* ===== Mobile Menu ===== */}
        {menuOpen && (
          <ul className="mobile-menu">
            <li><Link to="/" onClick={closeAll}>Home</Link></li>
            <li><Link to="/shop" onClick={closeAll}>Shop</Link></li>
            <li><Link to="/about" onClick={closeAll}>About</Link></li>
            <li><Link to="/contact" onClick={closeAll}>Contact</Link></li>
            <li><Link to="/wishlist" onClick={closeAll}>Wishlist ({wishlistCount})</Link></li>
            <li><Link to="/cart" onClick={closeAll}>Cart ({cartCount})</Link></li>
          </ul>
        )}
      </header>
    </>
  )
}

export default Navbar