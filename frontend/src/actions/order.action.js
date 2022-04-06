import axios from 'axios'
import { ORDER_CONSTANT as CONSTANT } from '../constants/order.constant'
import { UserAction } from '../actions/user.action'
import { CART_CONSTANT } from '../constants/cart.constant'

const create = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/orders`, order, config)

    dispatch({
      type: CONSTANT.CREATE_SUCCESS,
      payload: data,
    })

    dispatch({ type: CART_CONSTANT.CLEAR_ITEMS })
    localStorage.removeItem('cartItems')

    dispatch(getMyList())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(UserAction.logout())
    }
    dispatch({
      type: CONSTANT.CREATE_FAIL,
      payload: message,
    })
  }
}

const getDetails = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.GET_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${orderId}`, config)

    dispatch({
      type: CONSTANT.GET_DETAILS_SUCCESS,
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

const pay = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/orders/${orderId}/pay`, {}, config)

    dispatch({
      type: CONSTANT.PAY_SUCCESS,
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
      type: CONSTANT.PAY_FAIL,
      payload: message,
    })
  }
}

const getMyList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.GET_MY_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch({
      type: CONSTANT.GET_MY_LIST_SUCCESS,
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
      type: CONSTANT.GET_MY_LIST_FAIL,
      payload: message,
    })
  }
}

export const OrderAction = {
  create,
  getDetails,
  pay,
  getMyList,
}
