import axios from 'axios'
import { UserAction } from './user.action'
import { BRAND_CONSTANT as CONSTANT } from '../constants/brand.constant'

//syntax redux-thunk => allow to add a function within a fuction
const getList = () => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.GET_LIST_REQUEST })

    const { data } = await axios.get('/api/brands')

    dispatch({
      type: CONSTANT.GET_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(UserAction.logout())
    }
    dispatch({
      type: CONSTANT.GET_DETAILS_FAIL,
      payload: message,
    })
  }
}

export const BrandAction = { getList }
