import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(each => {
        total += each.quantity * each.price
      })
      return (
        <div className="summary-container">
          <h1 className="summary-heading">
            <span className="summary-para">Order Total: </span>Rs {total}/-
          </h1>
          <p className="summary-para">{cartList.length} items in cart</p>
          <button type="button" className="summary-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
