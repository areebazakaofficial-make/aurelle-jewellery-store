import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import ProductCard from '../components/ProductCard.jsx'
import './ProductDetail.css'

// Har category ke liye specs
const specsByCategory = {
  Rings: [
    'Material: 925 Sterling Silver (Gold Plated)',
    'Stone: Cubic Zirconia',
    'Weight: 3.5 g',
    'Available Sizes: 6, 7, 8, 9',
  ],
  Necklaces: [
    'Material: 18K Gold Plated Brass',
    'Stone: Freshwater Pearl',
    'Chain Length: 45 cm + 5 cm extender',
    'Closure: Lobster Clasp',
  ],
  Earrings: [
    'Material: 925 Sterling Silver (Gold Plated)',
    'Stone: Cubic Zirconia & Pearl',
    'Weight: 2.8 g per piece',
    'Closure: Push Back',
  ],
  Bracelets: [
    'Material: 18K Gold Plated',
    'Weight: 6.2 g',
    'Length: 17 cm + 3 cm extender',
    'Hypoallergenic & Tarnish Free',
  ],
}

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === Number(id))

  const { addToCart } = useCart()
  const { toggleWishlist, isWishlisted } = useWishlist()
  const wishlisted = product ? isWishlisted(product.id) : false

  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [openAcc, setOpenAcc] = useState(null)

  // Product change hone pe scroll top + reset
  useEffect(() => {
    window.scrollTo(0, 0)
    setQty(1)
    setActiveImg(0)
    setAdded(false)
  }, [id])

  if (!product) {
    return (
      <div className="container detail-missing">
        <p>Product not found. ✦</p>
        <Link to="/shop" className="btn-outline">Back to Shop</Link>
      </div>
    )
  }

  const stars =
    '★'.repeat(Math.round(product.rating)) +
    '☆'.repeat(5 - Math.round(product.rating))

  const specs = specsByCategory[product.category]

  // Gallery: main image + same category ki 2 aur images
  const galleryImgs = [
    product.image,
    ...products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 2)
      .map((p) => p.image),
  ]

  // Related products
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAdd = () => {
    addToCart(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  // ⚡ Buy Now — add to cart + seedha checkout!
  const handleBuyNow = () => {
    addToCart(product, qty)
    navigate('/checkout')
  }

  const accordions = [
    {
      title: 'Shipping & Returns',
      body: 'Orders are dispatched within 2–3 business days. Free shipping on orders above PKR 5,000. We offer easy 7-day returns on unused items with original packaging.',
    },
    {
      title: 'Reviews',
      body: `${stars} Based on ${product.reviews} verified reviews. Customers love the premium finish and elegant packaging of this piece.`,
    },
  ]

  return (
    <div className="container detail">

      {/* Breadcrumb */}
      <nav className="detail-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">{product.category}</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      <div className="detail-layout">

        {/* ===== Left: Gallery ===== */}
        <div className="gallery">
          <div className="thumbs">
            {galleryImgs.map((img, i) => (
              <button
                key={i}
                className={`thumb ${activeImg === i ? 'active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={img} alt={`${product.name} view ${i + 1}`} />
              </button>
            ))}
          </div>
          <div className="main-img">
            <img src={galleryImgs[activeImg]} alt={product.name} />
          </div>
        </div>

        {/* ===== Right: Info ===== */}
        <div className="detail-info">
          <h1>{product.name}</h1>
          <div className="detail-price">
            PKR {product.price.toLocaleString()}
            {product.oldPrice && (
              <span className="old-price">PKR {product.oldPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="detail-stars">
            <span className="stars">{stars}</span>
            <span>({product.reviews} reviews)</span>
          </div>

          <p className="detail-desc">{product.description}</p>

          <ul className="detail-specs">
            {specs.map((spec) => (
              <li key={spec}>{spec}</li>
            ))}
          </ul>

          {/* Quantity */}
          <div className="qty-row">
            <div className="qty-box">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart + Buy Now side by side */}
          <div className="buy-buttons">
            <button
              className={`add-cart ${added ? 'added' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Added' : 'Add to Cart'}
            </button>

            <button
              className="buy-now"
              onClick={handleBuyNow}
            >
              Buy Now ⚡
            </button>
          </div>

          <div className="detail-actions">
            <button onClick={() => toggleWishlist(product)}>
              <span className={wishlisted ? 'heart-fill' : ''}>{wishlisted ? '♥' : '♡'}</span>
              {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            </button>
            <button onClick={() => alert('Link copied! ✦')}>⇄ Share</button>
          </div>

          {/* Accordions */}
          <div className="accordion">
            {accordions.map((acc, i) => (
              <div className="acc-item" key={acc.title}>
                <button
                  className="acc-head"
                  onClick={() => setOpenAcc(openAcc === i ? null : i)}
                >
                  <span>{acc.title}</span>
                  <span className="acc-icon">{openAcc === i ? '−' : '+'}</span>
                </button>
                {openAcc === i && <div className="acc-body">{acc.body}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Related Products ===== */}
      {related.length > 0 && (
        <section className="related">
          <span className="section-label">You May Also Like</span>
          <h2 className="section-title">Complete The Look</h2>
          <div className="related-grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetail
