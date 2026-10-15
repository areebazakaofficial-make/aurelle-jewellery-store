import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, categories } from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import './Shop.css'

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category')
  const searchParam = searchParams.get('search')

  const [selectedCats, setSelectedCats] = useState(
    categoryParam ? [categoryParam] : []
  )
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)

  const productsPerPage = 8

  // Home page se category aaye to wahi select ho
  useEffect(() => {
    setSelectedCats(categoryParam ? [categoryParam] : [])
    setCurrentPage(1)
  }, [categoryParam])

  // Search change pe page 1 pe jao
  useEffect(() => {
    setCurrentPage(1)
  }, [searchParam])

  // Category checkbox toggle
  const handleCategory = (cat) => {
    setCurrentPage(1)
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  // ===== FILTERING =====
  let filtered = products

  // Search filter (naam ya category se)
  if (searchParam) {
    const q = searchParam.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    )
  }

  if (selectedCats.length > 0) {
    filtered = filtered.filter((p) => selectedCats.includes(p.category))
  }

  if (priceRange === 'under5') {
    filtered = filtered.filter((p) => p.price < 5000)
  } else if (priceRange === '5to10') {
    filtered = filtered.filter((p) => p.price >= 5000 && p.price <= 10000)
  } else if (priceRange === '10to15') {
    filtered = filtered.filter((p) => p.price > 10000 && p.price <= 15000)
  } else if (priceRange === 'above15') {
    filtered = filtered.filter((p) => p.price > 15000)
  }

  if (sortBy === 'lowHigh') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'highLow') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  }

  // ===== PAGINATION =====
  const totalPages = Math.ceil(filtered.length / productsPerPage)
  const startIndex = (currentPage - 1) * productsPerPage
  const visibleProducts = filtered.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="shop container">

      {/* Page Header */}
      <div className="shop-header">
        <h1>
          {searchParam
            ? `Results for "${searchParam}"`
            : categoryParam
            ? categoryParam
            : 'Collections'}
        </h1>
        <p>
          {searchParam
            ? `${filtered.length} beautiful ${filtered.length === 1 ? 'piece' : 'pieces'} found`
            : 'Explore our carefully curated collections, designed for every occasion.'}
        </p>
        {searchParam && (
          <button className="clear-search" onClick={() => setSearchParams({})}>
            ✕ Clear Search
          </button>
        )}
      </div>

      <div className="shop-layout">

        {/* ===== SIDEBAR ===== */}
        <aside className="shop-sidebar">

          {/* Category Filter */}
          <div className="filter-box">
            <h3>Filter By</h3>

            <h4>Category</h4>
            {categories.map((cat) => (
              <label key={cat} className="filter-option">
                <input
                  type="checkbox"
                  checked={selectedCats.includes(cat)}
                  onChange={() => handleCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          {/* Price Filter */}
          <div className="filter-box">
            <h4>Price Range</h4>
            {[
              { value: 'all', label: 'All Prices' },
              { value: 'under5', label: 'Under PKR 5,000' },
              { value: '5to10', label: 'PKR 5,000 – 10,000' },
              { value: '10to15', label: 'PKR 10,000 – 15,000' },
              { value: 'above15', label: 'Above PKR 15,000' },
            ].map((opt) => (
              <label key={opt.value} className="filter-option">
                <input
                  type="radio"
                  name="price"
                  checked={priceRange === opt.value}
                  onChange={() => { setPriceRange(opt.value); setCurrentPage(1) }}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          {/* Sort */}
          <div className="filter-box">
            <h4>Sort By</h4>
            {[
              { value: 'newest', label: 'Newest First' },
              { value: 'lowHigh', label: 'Price: Low to High' },
              { value: 'highLow', label: 'Price: High to Low' },
            ].map((opt) => (
              <label key={opt.value} className="filter-option">
                <input
                  type="radio"
                  name="sort"
                  checked={sortBy === opt.value}
                  onChange={() => { setSortBy(opt.value); setCurrentPage(1) }}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

        </aside>

        {/* ===== PRODUCTS ===== */}
        <div className="shop-products">

          {visibleProducts.length === 0 ? (
            <p className="no-results">No jewellery found. Try different filters. ✦</p>
          ) : (
            <div className="shop-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={num === currentPage ? 'active' : ''}
                  onClick={() => setCurrentPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                →
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Shop