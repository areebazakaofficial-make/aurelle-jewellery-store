import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Cart.css'

const FREE_SHIPPING_LIMIT = 5000

function Cart() {
  const { cartItems, updateQty, removeFromCart, clearCart, subtotal } = useCart()
  const navigate = useNavigate()

  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_LIMIT ? 0 : 250
  const total = subtotal + shipping
  const remaining = FREE_SHIPPING_LIMIT - subtotal

  // ===== Empty Cart =====
  if (cartItems.length === 0) {
    return (
      <div className="container cart-empty">
        <div className="cart-empty-icon">🛍️</div>
        <h1>Your Cart is Empty</h1>
        <p>Discover timeless pieces crafted for every moment.</p>
        <Link to="/shop" className="btn-gold">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="container cart">

      {/* ===== Header ===== */}
      <div className="cart-head">
        <h1>
          Your Cart <span className="cart-count">({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
        </h1>
        <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
      </div>

      {/* ===== Free Shipping Progress ===== */}
      <div className="ship-progress">
        {shipping === 0 ? (
          <p>🎉 Congrats! You've unlocked <strong>FREE Shipping</strong>!</p>
        ) : (
          <p>
            Add <strong>PKR {remaining.toLocaleString()}</strong> more to get <strong>FREE Shipping</strong>
          </p>
        )}
        <div className="ship-bar">
          <div
            className="ship-fill"
            style={{ width: `${Math.min((subtotal / FREE_SHIPPING_LIMIT) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="cart-layout">

        {/* ===== Items List ===== */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={`/product/${item.id}`} className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="cart-item-info">
                <span className="cart-item-cat">{item.category}</span>
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>
                <span className="cart-item-price">PKR {item.price.toLocaleString()}</span>
              </div>

              <div className="cart-item-qty">
                <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
              </div>

              <div className="cart-item-total">
                PKR {(item.price * item.qty).toLocaleString()}
              </div>

              <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove item"
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* ===== Summary ===== */}
        <aside className="cart-summary">
          <h3>Order Summary</h3>

          <div className="sum-row">
            <span>Subtotal</span>
            <span>PKR {subtotal.toLocaleString()}</span>
          </div>

          <div className="sum-row">
            <span>Shipping</span>
            <span className={shipping === 0 ? 'free-tag' : ''}>
              {shipping === 0 ? 'Free' : `PKR ${shipping}`}
            </span>
          </div>

          <div className="sum-row total">
            <span>Total</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>

          <Link to="/shop" className="continue-link">← Continue Shopping</Link>
        </aside>
      </div>
    </div>
  )
}

export default Cart