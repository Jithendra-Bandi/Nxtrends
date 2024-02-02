import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const modified = cartList.map(each => {
      if (each.id === id) return {...each, quantity: each.quantity + 1}
      return each
    })
    this.setState({cartList: modified})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(each => each.id === id)
    if (item.quantity === 1) {
      const removedList = cartList.filter(each => each.id !== id)
      this.setState({cartList: removedList})
    } else {
      const modified = cartList.map(each => {
        if (each.id === id) return {...each, quantity: each.quantity - 1}
        return each
      })
      this.setState({cartList: modified})
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isPresent = cartList.find(each => each.id === product.id)
    if (isPresent === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const modified = cartList.map(each => {
        if (each.id === product.id)
          return {...each, quantity: each.quantity + 1}
        return each
      })
      this.setState({cartList: modified})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedList})
  }

  removeAllCartItems = () => this.setState({cartList: []})

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
