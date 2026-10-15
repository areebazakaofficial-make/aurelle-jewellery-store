import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext.jsx'
import './ProductCard.css'

function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(product.id)

  const stars =
    '★'.repeat(Math.round(product.rating)) +
    '☆'.repeat(5 - Math.round(product.rating))

  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        {/* Badge — New / Sale / Bestseller */}
        {product.badge && (
          <span className={`product-badge ${product.badge.toLowerCase()}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist heart — ab kaam karta hai! */}
        <button
          className={`wishlist-btn ${wishlisted ? 'active' : ''}`}
          aria-label="Toggle wishlist"
          onClick={() => toggleWishlist(product)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={wishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Hover pe View Details */}
        <Link to={`/product/${product.id}`} className="quick-view">View Details</Link>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <div className="stars">
          {stars} <span className="review-count">({product.reviews})</span>
        </div>
        <p className="product-price">
          PKR {product.price.toLocaleString()}
          {product.oldPrice && (
            <span className="old-price">PKR {product.oldPrice.toLocaleString()}</span>
          )}
        </p>
      </div>
    </div>
  )
}

export default ProductCard