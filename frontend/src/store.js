import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { ProductReducer } from './reducers/product.reducer'
import { CartReducer } from './reducers/cart.reducer'
import { UserReducer } from './reducers/user.reducer'
import { OrderReducer } from './reducers/order.reducer'

const reducer = combineReducers({
  productGetList: ProductReducer.getList,
  productGetDetails: ProductReducer.getDetails,

  cart: CartReducer.cart,

  userLogin: UserReducer.login,
  userRegister: UserReducer.register,
  userGetProfile: UserReducer.getProfile,
  userUpdateProfile: UserReducer.updateProfile,

  orderCreate: OrderReducer.create,
  orderGetDetails: OrderReducer.getDetails,
  orderPay: OrderReducer.pay,
  orderGetMyList: OrderReducer.getMyList,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

// const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
//   ? JSON.parse(localStorage.getItem('paymentMethod'))
//   : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    // paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
