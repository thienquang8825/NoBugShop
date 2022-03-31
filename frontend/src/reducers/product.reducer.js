import { PRODUCT_CONSTANT as CONSTANT } from '../constants/product.constant'

const getList = (state = { products: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      return { loading: true, products: [] }
    case CONSTANT.GET_LIST_SUCCESS:
      return { loading: false, products: action.payload }
    case CONSTANT.GET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const getDetails = (state = { product: {} }, action) => {
  switch (action.type) {
    case CONSTANT.GET_DETAILS_REQUEST:
      return { ...state, loading: true }
    case CONSTANT.GET_DETAILS_SUCCESS:
      return { loading: false, product: action.payload }
    case CONSTANT.GET_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const ProductReducer = { getList, getDetails }
