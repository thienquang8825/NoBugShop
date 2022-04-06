import { USER_CONSTANTS as CONSTANT } from '../constants/user.constants'

const login = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.LOGIN_REQUEST:
      return { loading: true }
    case CONSTANT.LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case CONSTANT.LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.LOGOUT:
      return {}
    default:
      return state
  }
}

const register = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.REGISTER_REQUEST:
      return { loading: true }
    case CONSTANT.REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case CONSTANT.REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

const getProfile = (state = { userProfile: {} }, action) => {
  switch (action.type) {
    case CONSTANT.GET_PROFILE_REQUEST:
      return { ...state, loading: true }
    case CONSTANT.GET_PROFILE_SUCCESS:
      return { loading: false, userProfile: action.payload }
    case CONSTANT.GET_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.GET_PROFILE_RESET:
      return { userProfile: {} }
    default:
      return state
  }
}

const updateProfile = (state = {}, action) => {
  switch (action.type) {
    case CONSTANT.UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case CONSTANT.UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userProfile: action.payload }
    case CONSTANT.UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

const getList = (state = { users: [] }, action) => {
  switch (action.type) {
    case CONSTANT.GET_LIST_REQUEST:
      return { loading: true }
    case CONSTANT.GET_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case CONSTANT.GET_LIST_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.GET_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

const deleteUser = (state = {}, action) => {
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

const updateUser = (state = { users: {} }, action) => {
  switch (action.type) {
    case CONSTANT.UPDATE_REQUEST:
      return { loading: true }
    case CONSTANT.UPDATE_SUCCESS:
      return { loading: false, success: true }
    case CONSTANT.UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case CONSTANT.UPDATE_RESET:
      return { users: {} }
    default:
      return state
  }
}

export const UserReducer = {
  login,
  register,
  getProfile,
  updateProfile,
  getList,
  deleteUser,
  updateUser,
}
