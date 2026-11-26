import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {id, title, brand, quantity, price, imageUrl} = cartItemDetails

      const onRemoveCartItem = () => {
        removeCartItem(id)
      }

      const onIncrementQuantity = () => {
        incrementCartItemQuantity(id)
      }

      const onDecrementQuantity = () => {
        decrementCartItemQuantity(id)
      }

      return (
        <li className="cart-item">
          <img src={imageUrl} alt={title} className="cart-product-img" />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-btn"
                data-testid="minus"
                onClick={onDecrementQuantity}
                aria-label="Decrease quantity"
              >
                <BsDashSquare color="#52606D" size={14} />
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-btn"
                data-testid="plus"
                onClick={onIncrementQuantity}
                aria-label="Increase quantity"
              >
                <BsPlusSquare color="#52606D" size={14} />
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                type="button"
                className="delete-btn"
                data-testid="remove"
                onClick={onRemoveCartItem}
                aria-label="Remove item"
              >
                <AiFillCloseCircle color="#616E7C" size={20} />
              </button>
            </div>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
