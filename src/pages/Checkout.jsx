import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Checkout.css'

function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    payment: 'cod',
  })
  const [orderId, setOrderId] = useState(null)

  const shipping = subtotal >= 5000 ? 0 : 250
  const total = subtotal + shipping

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()

    // Unique order number generate karo
    const orderNum = 'AUR-' + Math.floor(100000 + Math.random() * 900000)
    setOrderId(orderNum)
    clearCart()
  }

  // ===== SUCCESS SCREEN =====
  if (orderId) {
    return (
      <div className="container checkout-success">
        <div className="success-icon">✦</div>
        <h1>Order Placed Successfully!</h1>
        <p className="success-msg">
          Thank you, {form.name.split(' ')[0]}! Your order has been received.
        </p>

        <div className="success-card">
          <div className="success-row">
            <span>Order Number</span>
            <strong>{orderId}</strong>
          </div>
          <div className="success-row">
            <span>Payment Method</span>
            <strong>{form.payment === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</strong>
          </div>
          <div className="success-row">
            <span>Delivery Address</span>
            <strong>{form.city}</strong>
          </div>
          <div className="success-row total">
            <span>Amount to Pay</span>
            <strong>PKR {total.toLocaleString()}</strong>
          </div>
        </div>

        <p className="success-note">
          We'll contact you at {form.phone} to confirm your order. ✦
        </p>

        <Link to="/shop" className="btn-gold">Continue Shopping</Link>
      </div>
    )
  }

  // ===== EMPTY CART =====
  if (cartItems.length === 0) {
    return (
      <div className="container checkout-empty">
        <h1>Nothing to Checkout</h1>
        <p>Your cart is empty. Add some beautiful pieces first!</p>
        <Link to="/shop" className="btn-gold">Shop Now</Link>
      </div>
    )
  }

  // ===== CHECKOUT FORM =====
  return (
    <div className="container checkout">

      <div className="checkout-head">
        <h1>Checkout</h1>
        <Link to="/cart" className="back-link">← Back to Cart</Link>
      </div>

      <div className="checkout-layout">

        {/* ===== Left: Form ===== */}
        <form className="checkout-form" onSubmit={handlePlaceOrder}>

          <h3 className="form-section-title">Delivery Details</h3>

          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ayesha Khan"
                required
              />
            </div>
            <div className="form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="0300 1234567"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ayesha@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Complete Address *</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House #, Street, Area..."
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Lahore"
              required
            />
          </div>

          <h3 className="form-section-title">Payment Method</h3>

          <label className={`payment-option ${form.payment === 'cod' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={form.payment === 'cod'}
              onChange={handleChange}
            />
            <div>
              <strong>Cash on Delivery 💵</strong>
              <p>Pay when your order arrives at your doorstep.</p>
            </div>
          </label>

          <label className={`payment-option ${form.payment === 'bank' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={form.payment === 'bank'}
              onChange={handleChange}
            />
            <div>
              <strong>Bank Transfer 🏦</strong>
              <p>Transfer details will be shared after order confirmation.</p>
            </div>
          </label>

          <button type="submit" className="place-order-btn">
            Place Order — PKR {total.toLocaleString()}
          </button>
        </form>

        {/* ===== Right: Order Summary ===== */}
        <aside className="checkout-summary">
          <h3>Your Order</h3>

          <div className="summary-items">
            {cartItems.map((item) => (
              <div className="summary-item" key={item.id}>
                <div className="summary-item-img">
                  <img src={item.image} alt={item.name} />
                  <span className="summary-item-qty">{item.qty}</span>
                </div>
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.name}</span>
                  <span className="summary-item-price">
                    PKR {(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
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
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Checkout