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
      const increaseQuantity = () => incrementCartItemQuantity(id)

      const decreaseQuantity = () => decrementCartItemQuantity(id)

      const minusIcon = () => <BsDashSquare color="#52606D" size={12} />

      const plusIcon = () => <BsPlusSquare color="#52606D" size={12} />

      const closeIcon = () => <AiFillCloseCircle color="#616E7C" size={20} />

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={imageUrl} alt={title} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{title}</p>
              <p className="cart-product-brand">by {brand}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                onClick={decreaseQuantity}
                data-testid="minus"
                className="quantity-controller-button"
              >
                {minusIcon()}
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                onClick={increaseQuantity}
                data-testid="plus"
                type="button"
                className="quantity-controller-button"
              >
                {plusIcon()}
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {price * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
                data-testid="remove"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            {closeIcon()}
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
