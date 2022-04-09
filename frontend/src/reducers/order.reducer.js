import { ORDER_CONSTANT as CONSTANT } from '../constants/order.constant'

const create = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.CREATE_REQUEST:
      return {
        loading: true,
      }
    case CONSTANT.CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case CONSTANT.CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CONSTANT.CREATE_RESET:
      return {}
    default:
      return state
  }
}

const getDetails = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CONSTANT.GET_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case CONSTANT.GET_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case CONSTANT.GET_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

const pay = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.PAY_REQUEST:
      return {
        loading: true,
      }
    case CONSTANT.PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CONSTANT.PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CONSTANT.PAY_RESET:
      return {}
    default:
      return state
  }
}

const deliver = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.DELIVER_REQUEST:
      return {
        loading: true,
      }
    case CONSTANT.DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CONSTANT.DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CONSTANT.DELIVER_RESET:
      return {}
    default:
      return state
  }
}

const getMyList = (state = { orders: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_MY_LIST_REQUEST:
      return {
        loading: true,
      }
    case CONSTANT.GET_MY_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case CONSTANT.GET_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CONSTANT.GET_MY_LIST_RESET:
      return { orders: [] }
    default:
      return state
  }
}

const getList = (state = { orders: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      return {
        loading: true,
      }
    case CONSTANT.GET_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case CONSTANT.GET_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const OrderReducer = {
  create,
  getDetails,
  pay,
  deliver,
  getMyList,
  getList,
}
