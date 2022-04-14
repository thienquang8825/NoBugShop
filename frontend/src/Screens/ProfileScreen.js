import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { moneyFormat } from '../utils/moneyFormat'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { UserAction } from '../actions/user.action'
import { OrderAction } from '../actions/order.action'
import { USER_CONSTANTS } from '../constants/user.constants'
import PageHeader from '../components/PageHeader'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userDetails = useSelector((state) => state.userGetProfile)
  const { loading, error, userProfile } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const orderGetMyList = useSelector((state) => state.orderGetMyList)
  const { loading: loadingOrders, error: errorOrders, orders } = orderGetMyList

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!userProfile.name || success) {
        dispatch({ type: USER_CONSTANTS.UPDATE_PROFILE_RESET })

        dispatch(UserAction.getProfile('profile'))
        dispatch(OrderAction.getMyList())
      } else {
        setName(userProfile.name)
        setEmail(userProfile.email)
      }

      // if (!orders || orders.length === 0) {
      //   dispatch(OrderAction.getMyList())
      // }
    }
  }, [dispatch, navigate, orders, success, userInfo, userProfile])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Xác nhận mật khẩu sai!')
    } else {
      dispatch(
        UserAction.updateProfile({ id: userProfile._id, name, email, password })
      )
    }
  }

  return (
    <>
      <PageHeader title='Tài Khoản Của Tôi' />

      <div className='container-fluid pt-5'>
        <div className='row px-xl-5'>
          <div className='col-lg-4'>
            <h4 className='font-weight-semi-bold mb-4'>Thông Tin Cá Nhận</h4>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && (
              <Message variant='success'>Thông tin đã được cập nhật</Message>
            )}
            {loading && <Loader />}
            <form onSubmit={submitHandler}>
              <div className='form-group'>
                <label>Tên</label>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Nhập tên...'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Email</label>
                <input
                  className='form-control bg-secondary'
                  type='text'
                  placeholder='Nhập email...'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Mật khẩu</label>
                <input
                  className='form-control bg-secondary'
                  type='password'
                  placeholder='Nhập mật khẩu...'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label>Xác nhận mật khẩu</label>
                <input
                  className='form-control bg-secondary'
                  type='password'
                  placeholder='Nhập lại mật khẩu...'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <button className='btn btn-primary py-2 px-4' type='submit'>
                  Cập nhật thông tin
                </button>
              </div>
            </form>
          </div>
          <div className='col-lg-8 table-responsive mb-5'>
            <h4 className='font-weight-semi-bold mb-4 text-center'>
              Lịch Sử Mua Hàng
            </h4>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders}</Message>
            ) : (
              <table className='table table-bordered text-center mb-0 table-hover'>
                <thead className='bg-secondary text-dark'>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày tạo</th>
                    <th>Tổng tiền</th>
                    <th>Thanh toán</th>
                    <th>Giao hàng</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>
                <tbody className='align-middle'>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className='align-middle'>{order._id}</td>
                      <td className='align-middle'>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className='align-middle'>
                        {moneyFormat(order.totalPrice)}
                      </td>
                      <td className='align-middle'>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i className='fas fa-times text-danger'></i>
                        )}
                      </td>
                      <td className='align-middle'>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i className='fas fa-times text-danger'></i>
                        )}
                      </td>
                      <td className='align-middle'>
                        <Link to={`/order/${order._id}`}>
                          <button className='btn-sm border-0 bg-primary'>
                            Chi tiết
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileScreen
