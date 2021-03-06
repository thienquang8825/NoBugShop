import axios from 'axios'
import { USER_CONSTANTS as CONSTANT } from '../constants/user.constants'
import { CART_CONSTANT } from '../constants/cart.constant'
import { ORDER_CONSTANT } from '../constants/order.constant'

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.LOGIN_REQUEST })

    const config = {
      'Content-type': 'application/json',
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: CONSTANT.LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CONSTANT.LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const logout = () => async (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  // localStorage.removeItem('shippingInfo')
  // localStorage.removeItem('paymentMethod')

  dispatch({ type: CONSTANT.LOGOUT })
  dispatch({ type: CART_CONSTANT.CLEAR_ITEMS })
  dispatch({ type: CONSTANT.GET_PROFILE_RESET })
  dispatch({ type: ORDER_CONSTANT.GET_MY_LIST_RESET })
  dispatch({ type: CONSTANT.GET_LIST_RESET })
}

const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.REGISTER_REQUEST })

    const config = {
      'Content-type': 'application/json',
    }

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )

    dispatch({
      type: CONSTANT.REGISTER_SUCCESS,
      payload: data,
    })

    dispatch({
      type: CONSTANT.LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CONSTANT.REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getProfile = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSTANT.GET_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${userId}`, config)

    dispatch({
      type: CONSTANT.GET_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONSTANT.GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const updateProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSTANT.UPDATE_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: CONSTANT.UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONSTANT.UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

const getList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSTANT.GET_LIST_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

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
      type: CONSTANT.GET_LIST_FAIL,
      payload: message,
    })
  }
}

const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSTANT.DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${userId}`, config)

    dispatch({ type: CONSTANT.DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(UserAction.logout())
    }
    dispatch({
      type: CONSTANT.DELETE_FAIL,
      payload: message,
    })
  }
}

const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSTANT.UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({ type: CONSTANT.UPDATE_SUCCESS })

    dispatch({
      type: CONSTANT.GET_PROFILE_SUCCESS,
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
      type: CONSTANT.UPDATE_FAIL,
      payload: message,
    })
  }
}

export const UserAction = {
  login,
  logout,
  register,
  getProfile,
  updateProfile,
  getList,
  deleteUser,
  updateUser,
}
