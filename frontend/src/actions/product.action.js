import axios from 'axios'
import { PRODUCT_CONSTANT as CONSTANT } from '../constants/product.constant'

//syntax redux-thunk => allow to add a function within a fuction
const getList = () => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.GET_LIST_REQUEST })

    const { data } = await axios.get('/api/products')

    dispatch({
      type: CONSTANT.GET_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONSTANT.GET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getDetails = (productId) => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.GET_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${productId}`)

    dispatch({
      type: CONSTANT.GET_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONSTANT.GET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const ProductAction = { getList, getDetails }
