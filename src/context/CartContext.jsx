import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  // Cart items localStorage se load hongi (refresh pe bhi bachengi!)
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('aurelle-cart')
    return saved ? JSON.parse(saved) : []
  })

  // Har change pe localStorage mein save
  useEffect(() => {
    localStorage.setItem('aurelle-cart', JSON.stringify(cartItems))
  }, [cartItems])

  // Add to cart — agar item pehle se hai to quantity barh jayegi
  const addToCart = (product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        )
      }
      return [...prev, { ...product, qty }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQty = (id, newQty) => {
    if (newQty < 1) return
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    )
  }

  const clearCart = () => setCartItems([])

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, cartCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}