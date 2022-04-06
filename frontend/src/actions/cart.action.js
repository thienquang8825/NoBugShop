import { CART_CONSTANT as CONSTANT } from '../constants/cart.constant'

const addToCart = (product, quantity) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANT.ADD_ITEM,
    payload: {
      //product._id get from URL of ProductScreen, product.id from CartScreen
      productId: product._id || product.productId,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      quantity,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const removeFromCart = (productId) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANT.REMOVE_ITEM,
    payload: productId,
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: CONSTANT.SAVE_SHIPPING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: CONSTANT.SAVE_PAYMENT_METHOD,
    payload: data,
  })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

export const CartAction = {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
}
