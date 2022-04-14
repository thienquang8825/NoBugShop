import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { BrandReducer } from './reducers/brand.reducer'
import { CategoryReducer } from './reducers/category.reducer'
import { ProductReducer } from './reducers/product.reducer'
import { CartReducer } from './reducers/cart.reducer'
import { UserReducer } from './reducers/user.reducer'
import { OrderReducer } from './reducers/order.reducer'

const reducer = combineReducers({
  brandGetList: BrandReducer.getList,

  categoryGetList: CategoryReducer.getList,

  productGetList: ProductReducer.getList,
  productGetDetails: ProductReducer.getDetails,
  productDelete: ProductReducer.deleteProduct,
  productCreate: ProductReducer.createProduct,
  productUpdate: ProductReducer.updateProduct,
  productGetTopRated: ProductReducer.getTopRated,
  productGetTopNew: ProductReducer.getTopNew,
  productCreateReview: ProductReducer.createReview,

  cart: CartReducer.cart,

  userLogin: UserReducer.login,
  userRegister: UserReducer.register,
  userGetProfile: UserReducer.getProfile,
  userUpdateProfile: UserReducer.updateProfile,
  userGetList: UserReducer.getList,
  userDelete: UserReducer.deleteUser,
  userUpdate: UserReducer.updateUser,

  orderCreate: OrderReducer.create,
  orderGetDetails: OrderReducer.getDetails,
  orderPay: OrderReducer.pay,
  orderDeliver: OrderReducer.deliver,
  orderGetMyList: OrderReducer.getMyList,
  orderGetList: OrderReducer.getList,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const shippingInfoFromStorage = localStorage.getItem('shippingInfo')
  ? JSON.parse(localStorage.getItem('shippingInfo'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingInfo: shippingInfoFromStorage,
    paymentMethod: paymentMethodFromStorage,
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
