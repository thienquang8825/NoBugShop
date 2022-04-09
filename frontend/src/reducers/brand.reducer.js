import { BRAND_CONSTANT as CONSTANT } from '../constants/brand.constant'

const getList = (state = { brands: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      return { loading: true }
    case CONSTANT.GET_LIST_SUCCESS:
      return { loading: false, brands: action.payload }
    case CONSTANT.GET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const BrandReducer = { getList }
