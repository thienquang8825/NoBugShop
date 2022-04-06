import axios from 'axios'
import { ORDER_CONSTANTS as CONSTANT } from '../constants/order.constants'
// import { CART_CONSTANT } from '../constants/cart.constant'

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

    // dispatch({
    //   type: CART_CONSTANT.CLEAR_ITEMS,
    // })
    // localStorage.removeItem('cartItems')
  } catch (error) {
    dispatch({
      type: CONSTANT.CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const OrderAction = { create }
