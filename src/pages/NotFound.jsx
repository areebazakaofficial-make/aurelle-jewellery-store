import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className="container notfound">
      <span className="notfound-code">404</span>
      <h1>This Piece Went Missing</h1>
      <p>
        Like a misplaced jewel, the page you're looking for couldn't be found.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="btn-gold">Back to Home</Link>
        <Link to="/shop" className="btn-outline">Visit Shop</Link>
      </div>
    </div>
  )
}

export default NotFound