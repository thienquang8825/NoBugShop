import React, { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { moneyFormat } from '../utils/moneyFormat'
import { OrderAction } from '../actions/order.action'
import { ORDER_CONSTANT } from '../constants/order.constant'
import PageHeader from '../components/PageHeader'

const OrderScreen = () => {
  const { id: orderId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderGetDetails = useSelector((state) => state.orderGetDetails)
  const { order, loading, error } = orderGetDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { success: successPay, loading: loadingPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { success: successDeliver, loading: loadingDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    }

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_CONSTANT.PAY_RESET })
      dispatch({ type: ORDER_CONSTANT.DELIVER_RESET })

      dispatch(OrderAction.getDetails(orderId))
    }
  }, [dispatch, navigate, order, orderId, successDeliver, successPay, userInfo])

  const paymentHandler = () => {
    dispatch(OrderAction.pay(orderId))
  }

  const deliverHandler = () => {
    dispatch(OrderAction.deliver(orderId))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <PageHeader title={`Đơn Hàng (${orderId})`} />

      <div className='container-fluid pt-5'>
        <div className='row px-xl-5'>
          <div className='col-lg-8'>
            <div className='card border-secondary mb-5'>
              <div className='card-header bg-secondary border-0'>
                <h4 className='font-weight-semi-bold m-0'>Chi Tiết Hóa Đơn</h4>
              </div>
              <div className='card-body'>
                <h5 className='font-weight-medium mb-3'>Thông tin giao hàng</h5>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Tên: </strong>
                    {order.shippingInfo.name}
                  </p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Email: </strong>
                    {order.shippingInfo.email}
                  </p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Số điện thoại: </strong>
                    {order.shippingInfo.phone}
                  </p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Địa chỉ: </strong>
                    {order.shippingInfo.address}, {order.shippingInfo.ward},{' '}
                    {order.shippingInfo.district}, {order.shippingInfo.city}
                  </p>
                </div>
                {order.shippingInfo.note && (
                  <div className='d-flex justify-content-between'>
                    <p>
                      <strong>Ghi chú: </strong>
                      {order.shippingInfo.note}
                    </p>
                  </div>
                )}
                {order.isDelivered ? (
                  <Message variant='success'>
                    Đã giao hàng vào lúc: {order.deliveredAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message variant='danger'>Chưa giao hàng</Message>
                )}
                <hr className='mt-0' />
                <h5 className='font-weight-medium mb-3'>
                  Phương thức thanh toán
                </h5>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Phương thức: </strong>
                    {order.paymentMethod}
                  </p>
                </div>
                {order.isPaid ? (
                  <Message variant='success'>
                    Đã thanh toán vào lúc: {order.paidAt.substring(0, 10)}
                  </Message>
                ) : (
                  <Message variant='danger'>Chưa thanh toán</Message>
                )}
                <hr className='mt-0' />
                <h5 className='font-weight-medium mb-3'>Sản phẩm</h5>
                {order.orderItems.map((item) => (
                  <div
                    key={item.productId}
                    className='d-flex justify-content-between'
                  >
                    <p>
                      ({item.quantity}) x{' '}
                      <Link to={`/product/${item.productId}`}>{item.name}</Link>
                    </p>
                    <p>{moneyFormat(item.quantity * item.price)}</p>
                  </div>
                ))}
                <hr className='mt-0' />
                <div className='d-flex justify-content-between pt-1'>
                  <h5 className='font-weight-medium'>Tổng tiền hàng</h5>
                  <h5 className='font-weight-medium'>
                    {moneyFormat(order.itemsPrice)}
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-4'>
            <div className='card border-secondary mb-5'>
              <div className='card-header bg-secondary border-0'>
                <h4 className='font-weight-semi-bold m-0'>Tổng Hóa Đơn</h4>
              </div>
              <div className='card-body'>
                <div className='d-flex justify-content-between mb-3 pt-1'>
                  <h6 className='font-weight-medium'>Tổng tiền hàng</h6>
                  <h6 className='font-weight-medium'>
                    {moneyFormat(order.itemsPrice)}
                  </h6>
                </div>
                <div className='d-flex justify-content-between'>
                  <h6 className='font-weight-medium'>Phí vận chuyển</h6>
                  <h6 className='font-weight-medium'>
                    {moneyFormat(order.shippingPrice)}
                  </h6>
                </div>
              </div>
              <div className='card-footer border-secondary bg-transparent'>
                <div className='d-flex justify-content-between mt-2'>
                  <h5 className='font-weight-bold'>Tổng số tiền</h5>
                  <h5 className='font-weight-bold'>
                    {moneyFormat(order.totalPrice)}
                  </h5>
                </div>

                {loadingPay && <Loader />}
                {!order.isPaid && (
                  <button
                    className='btn btn-block btn-primary my-3 py-3'
                    onClick={paymentHandler}
                  >
                    Thanh Toán
                  </button>
                )}

                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <button
                      className='btn btn-block btn-primary my-3 py-3'
                      onClick={deliverHandler}
                    >
                      Xác Nhận Đã Giao
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderScreen
