import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import './Wishlist.css'

function Wishlist() {
  const { wishlistItems } = useWishlist()

  return (
    <div className="container wishlist">

      {/* ===== Header ===== */}
      <div className="wishlist-head">
        <h1>
          My Wishlist
          {wishlistItems.length > 0 && (
            <span className="wishlist-count">
              ({wishlistItems.length} {wishlistItems.length === 1 ? 'piece' : 'pieces'})
            </span>
          )}
        </h1>
        <Link to="/shop" className="btn-outline">Discover More</Link>
      </div>

      {/* ===== Empty State ===== */}
      {wishlistItems.length === 0 ? (
        <div className="wishlist-empty">
          <div className="wishlist-empty-icon">♡</div>
          <h2>Your Wishlist is Empty</h2>
          <p>Tap the heart on any piece you love — it will be waiting for you here.</p>
          <Link to="/shop" className="btn-gold">Explore Collection</Link>
        </div>
      ) : (
        /* ===== Items Grid ===== */
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist