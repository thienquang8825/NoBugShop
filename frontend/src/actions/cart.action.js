import { CART_CONSTANT as CONSTANT } from '../constants/cart.constant'

const addToCart = (product, quantity) => async (dispatch, getState) => {
  dispatch({
    type: CONSTANT.ADD_ITEM,
    payload: {
      //product._id from ProductScreen, product.id from CartScreen
      id: product._id || product.id,
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

export const CartAction = { addToCart, removeFromCart }
