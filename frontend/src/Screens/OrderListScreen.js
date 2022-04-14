import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { OrderAction } from '../actions/order.action'
import { moneyFormat } from '../utils/moneyFormat'

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderGetList = useSelector((state) => state.orderGetList)
  const { loading, error, orders } = orderGetList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(OrderAction.getList())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <>
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5'>
          <div className='col-lg-12 table-responsive mb-5'>
            <div className='text-center mb-4'>
              <h2 className='section-title px-5'>
                <span className='px-2'>Quản Lý Đơn Hàng</span>
              </h2>
            </div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <table className='table table-bordered text-center mb-0 table-hover'>
                <thead className='bg-secondary text-dark'>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Tên khách hàng</th>
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
                        {order.userId && order.userId.name}
                      </td>
                      <td className='align-middle'>
                        {order.createdAt.substring(0, 10)}
                      </td>
                      <td className='align-middle'>
                        {moneyFormat(order.totalPrice)}
                      </td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i className='fas fa-times text-danger'></i>
                        )}
                      </td>
                      <td>
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

export default OrderListScreen
