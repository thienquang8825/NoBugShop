import { PRODUCT_CONSTANT as CONSTANT } from '../constants/product.constant'

const getList = (state = { products: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      return { loading: true, products: [] }
    case CONSTANT.GET_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      }
    case CONSTANT.GET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const getDetails = (state = { product: { reviews: [] } }, action) => {
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

const deleteProduct = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.DELETE_REQUEST:
      return { loading: true }
    case CONSTANT.DELETE_SUCCESS:
      return { loading: false, success: true }
    case CONSTANT.DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const createProduct = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.CREATE_REQUEST:
      return { loading: true }
    case CONSTANT.CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case CONSTANT.CREATE_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.CREATE_RESET:
      return {}
    default:
      return state
  }
}

const updateProduct = (state = { product: {} }, action) => {
  switch (action.type) {
    case CONSTANT.UPDATE_REQUEST:
      return { loading: true }
    case CONSTANT.UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload }
    case CONSTANT.UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.UPDATE_RESET:
      return { product: {} }
    default:
      return state
  }
}

const createReview = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.CREATE_REVIEW_REQUEST:
      return { loading: true }
    case CONSTANT.CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case CONSTANT.CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.CREATE_REVIEW_RESET:
      return {}
    default:
      return state
  }
}

const getTopRated = (state = { products: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_TOP_RATED_REQUEST:
      return { loading: true, products: [] }
    case CONSTANT.GET_TOP_RATED_SUCCESS:
      return { loading: false, products: action.payload }
    case CONSTANT.GET_TOP_RATED_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const ProductReducer = {
  getList,
  getDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopRated,
}
