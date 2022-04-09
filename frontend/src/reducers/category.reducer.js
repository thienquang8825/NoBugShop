import { CATEGORY_CONSTANT as CONSTANT } from '../constants/category.constant'

const getList = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      return { loading: true }
    case CONSTANT.GET_LIST_SUCCESS:
      return { loading: false, categories: action.payload }
    case CONSTANT.GET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const CategoryReducer = { getList }
