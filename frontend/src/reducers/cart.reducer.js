import { CART_CONSTANT as CONSTANT } from '../constants/cart.constant'

const cart = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CONSTANT.ADD_ITEM:
      const item = action.payload

      const existItem = state.cartItems.find((x) => x.id === item.id)

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? item : x
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
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      }

    case CONSTANT.CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      }

    default:
      return state
  }
}

export const CartReducer = { cart }
