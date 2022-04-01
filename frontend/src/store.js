import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { ProductReducer } from './reducers/product.reducer'
import { CartReducer } from './reducers/cart.reducer'

const reducer = combineReducers({
  productGetList: ProductReducer.getList,
  productGetDetails: ProductReducer.getDetails,

  cart: CartReducer.cart,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
