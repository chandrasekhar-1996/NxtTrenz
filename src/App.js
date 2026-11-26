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

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    this.setState(prevState => {
      const productObject = prevState.cartList.find(
        eachCartItem => eachCartItem.id === product.id,
      )

      if (productObject) {
        return {
          cartList: prevState.cartList.map(eachCartItem => {
            if (eachCartItem.id === product.id) {
              const updatedQuantity = eachCartItem.quantity + product.quantity
              return {...eachCartItem, quantity: updatedQuantity}
            }
            return eachCartItem
          }),
        }
      }

      return {cartList: [...prevState.cartList, product]}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachCartItem => eachCartItem.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (eachCartItem.id === id) {
          return {...eachCartItem, quantity: eachCartItem.quantity + 1}
        }
        return eachCartItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => {
      const targetItem = prevState.cartList.find(
        eachCartItem => eachCartItem.id === id,
      )

      if (!targetItem) {
        return null
      }

      if (targetItem.quantity > 1) {
        return {
          cartList: prevState.cartList.map(eachCartItem => {
            if (eachCartItem.id === id) {
              return {...eachCartItem, quantity: eachCartItem.quantity - 1}
            }
            return eachCartItem
          }),
        }
      }

      return {
        cartList: prevState.cartList.filter(eachCartItem => eachCartItem.id !== id),
      }
    })
  }

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
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App