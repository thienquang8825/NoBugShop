import { ORDER_CONSTANTS as CONSTANTS } from '../constants/order.constants'

const create = (state = {}, action) => {
  switch (action.type) {
    case CONSTANTS.CREATE_REQUEST:
      return {
        loading: true,
      }
    case CONSTANTS.CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case CONSTANTS.CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    // case ORDER_CREATE_RESET:
    //   return {}
    default:
      return state
  }
}

export const OrderReducer = { create }
