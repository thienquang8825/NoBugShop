import axios from 'axios'
import { USER_CONSTANTS as CONSTANT } from '../constants/user.constants'
import { CART_CONSTANT } from '../constants/cart.constant'

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

  dispatch({ type: CONSTANT.LOGOUT })
  dispatch({ type: CART_CONSTANT.CLEAR_ITEMS })

  document.location.href = '/login'
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

const getProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CONSTANT.GET_PROFILE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/profile`, config)

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

export const UserAction = {
  login,
  logout,
  register,
  getProfile,
  updateProfile,
}
