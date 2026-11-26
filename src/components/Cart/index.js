import {Link} from 'react-router-dom'
import Header from '../Header'
import CartItem from '../CartItem'
import CartSummary from '../CartSummary'
import CartContext from '../../context/CartContext'

import './index.css'

const EMPTY_CART_IMAGE_URL =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <div className="empty-cart-container">
                <img
                  src={EMPTY_CART_IMAGE_URL}
                  alt="cart empty"
                  className="empty-cart-img"
                />
                <h1 className="empty-cart-heading">Your Cart Is Empty</h1>
                <Link to="/products">
                  <button type="button" className="shop-now-btn">
                    Shop Now
                  </button>
                </Link>
              </div>
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="remove-all-container">
                  <button
                    type="button"
                    className="remove-all-btn"
                    onClick={onClickRemoveAll}
                  >
                    Remove All
                  </button>
                </div>
                <ul className="cart-list">
                  {cartList.map(eachCartItem => (
                    <CartItem
                      key={eachCartItem.id}
                      cartItemDetails={eachCartItem}
                    />
                  ))}
                </ul>
                <CartSummary />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
