import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { moneyFormat } from '../utils/moneyFormat'
import { OrderAction } from '../actions/order.action'
import { ORDER_CONSTANT } from '../constants/order.constant'
import PageHeader from '../components/PageHeader'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || cart.cartItems.length === 0) {
      console.log(cart.cartItems.length)
      navigate('/login')
    }
  })

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  cart.shippingPrice = cart.itemsPrice > 1000000 ? 0 : 50000
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success } = orderCreate
  // const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      // dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CONSTANT.CREATE_RESET })
    }
    //eslint-disable-next-line
  }, [navigate, success])

  const placeOrderHandler = () => {
    dispatch(
      OrderAction.create({
        orderItems: cart.cartItems,
        shippingInfo: cart.shippingInfo,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    )
  }

  return (
    <>
      <PageHeader title='Đặt Hàng' />

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
                    {cart.shippingInfo.name}
                  </p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Email: </strong>
                    {cart.shippingInfo.email}
                  </p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Số điện thoại: </strong>
                    {cart.shippingInfo.phone}
                  </p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Địa chỉ: </strong>
                    {cart.shippingInfo.address}, {cart.shippingInfo.ward},{' '}
                    {cart.shippingInfo.district}, {cart.shippingInfo.city}
                  </p>
                </div>
                {cart.shippingInfo.note && (
                  <div className='d-flex justify-content-between'>
                    <p>
                      <strong>Ghi chú: </strong>
                      {cart.shippingInfo.note}
                    </p>
                  </div>
                )}
                <hr className='mt-0' />
                <h5 className='font-weight-medium mb-3'>
                  Phương thức thanh toán
                </h5>
                <div className='d-flex justify-content-between'>
                  <p>
                    <strong>Phương thức: </strong>
                    {cart.paymentMethod}
                  </p>
                </div>
                <hr className='mt-0' />
                <h5 className='font-weight-medium mb-3'>Sản phẩm</h5>
                {cart.cartItems.map((item) => (
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
                    {moneyFormat(cart.itemsPrice)}
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
                    {moneyFormat(cart.itemsPrice)}
                  </h6>
                </div>
                <div className='d-flex justify-content-between'>
                  <h6 className='font-weight-medium'>Phí vận chuyển</h6>
                  <h6 className='font-weight-medium'>
                    {moneyFormat(cart.shippingPrice)}
                  </h6>
                </div>
              </div>
              <div className='card-footer border-secondary bg-transparent'>
                <div className='d-flex justify-content-between mt-2'>
                  <h5 className='font-weight-bold'>Tổng số tiền</h5>
                  <h5 className='font-weight-bold'>
                    {moneyFormat(cart.totalPrice)}
                  </h5>
                </div>
                <button
                  className='btn btn-block btn-primary my-3 py-3'
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceOrderScreen
