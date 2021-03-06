import axios from 'axios'
import { UserAction } from '../actions/user.action'
import { PRODUCT_CONSTANT as CONSTANT } from '../constants/product.constant'

//syntax redux-thunk => allow to add a function within a fuction
const getList =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CONSTANT.GET_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      )

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

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${productId}`, config)

    dispatch({
      type: CONSTANT.DELETE_SUCCESS,
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
      type: CONSTANT.DELETE_FAIL,
      payload: message,
    })
  }
}

const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch({
      type: CONSTANT.CREATE_SUCCESS,
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
      type: CONSTANT.CREATE_FAIL,
      payload: message,
    })
  }
}

const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.UPDATE_REQUEST,
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

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch({
      type: CONSTANT.UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: CONSTANT.GET_DETAILS_SUCCESS, payload: data })
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

const createReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONSTANT.CREATE_REVIEW_REQUEST,
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

    await axios.post(`/api/products/${productId}/reviews`, review, config)

    dispatch({
      type: CONSTANT.CREATE_REVIEW_SUCCESS,
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
      type: CONSTANT.CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

const getTopRated = () => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.GET_TOP_RATED_REQUEST })

    const { data } = await axios.get(`/api/products/toprated`)

    dispatch({
      type: CONSTANT.GET_TOP_RATED_SUCCESS,
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
      type: CONSTANT.GET_TOP_RATED_FAIL,
      payload: message,
    })
  }
}

const getTopNew = () => async (dispatch) => {
  try {
    dispatch({ type: CONSTANT.GET_TOP_NEW_REQUEST })

    const { data } = await axios.get(`/api/products/topnew`)
    dispatch({
      type: CONSTANT.GET_TOP_NEW_SUCCESS,
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
      type: CONSTANT.GET_TOP_NEW_FAIL,
      payload: message,
    })
  }
}

const getListByCategory =
  (categoryId, pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CONSTANT.GET_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/products/category/${categoryId}?pageNumber=${pageNumber}`
      )

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

const getListByBrand =
  (brandId, pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: CONSTANT.GET_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/products/brand/${brandId}?pageNumber=${pageNumber}`
      )

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

export const ProductAction = {
  getList,
  getDetails,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopRated,
  getTopNew,
  getListByCategory,
  getListByBrand,
}
