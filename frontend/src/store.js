import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { ProductReducer } from './reducers/product.reducer'
import { CartReducer } from './reducers/cart.reducer'
import { UserReducer } from './reducers/user.reducer'

const reducer = combineReducers({
  productGetList: ProductReducer.getList,
  productGetDetails: ProductReducer.getDetails,

  cart: CartReducer.cart,

  userLogin: UserReducer.login,
  userRegister: UserReducer.register,
  userGetProfile: UserReducer.getProfile,
  userUpdateProfile: UserReducer.updateProfile,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
