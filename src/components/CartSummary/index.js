import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalOrderAmount = cartList.reduce(
        (acc, eachItem) => acc + eachItem.price * eachItem.quantity,
        0,
      )
      const itemsCount = cartList.length

      return (
        <div className="cart-summary-container">
          <h1 className="order-total-heading">
            <span className="order-total-label">Order Total:</span> Rs{' '}
            {totalOrderAmount}/-
          </h1>
          <p className="total-items-text">
            {itemsCount} {itemsCount === 1 ? 'Item' : 'Items'} in cart
          </p>
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
