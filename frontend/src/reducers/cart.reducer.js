import { CART_CONSTANT as CONSTANT } from '../constants/cart.constant'

const cart = (state = { cartItems: [], shippingAddress: {} }, action) => {
  switch (action.type) {
    case CONSTANT.ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      )

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }

    case CONSTANT.REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productId !== action.payload
        ),
      }

    case CONSTANT.CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }

    case CONSTANT.SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      }

    case CONSTANT.SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      }

    default:
      return state
  }
}

export const CartReducer = { cart }
