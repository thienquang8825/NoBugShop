import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CartAction } from '../actions/cart.action'
import { moneyFormat } from '../utils/moneyFormat'
import PageHeader from '../components/PageHeader'

import Message from '../components/Message'

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  )
  cart.shippingPrice =
    cart.itemsPrice > 1000000 || cartItems.length === 0 ? 0 : 50000
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice

  const changeQuantityHandler = (e, item) => {
    dispatch(CartAction.addToCart(item, Number(e.target.value)))
  }

  const removeFromCartHandler = (productId) => {
    dispatch(CartAction.removeFromCart(productId))
  }

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/checkout')
    } else {
      navigate('/login?redirect=checkout')
    }
  }

  return (
    <>
      <PageHeader title='Giỏ Hàng' />
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5'>
          <div className='col-lg-8 table-responsive mb-5'>
            {cartItems.length === 0 ? (
              <Message>
                Giỏ hàng rỗng. <Link to='/'>Chọn sản phâm!</Link>
              </Message>
            ) : (
              <table className='table table-bordered text-center mb-0'>
                <thead className='bg-secondary text-dark'>
                  <tr>
                    <th>Sản phẩm</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody className='align-middle'>
                  {cartItems.map((item) => (
                    <tr key={item.productId}>
                      <td className='align-middle'>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '50px' }}
                        />{' '}
                        <Link to={`/product/${item.productId}`}>
                          {item.name}
                        </Link>
                      </td>
                      <td className='align-middle'>
                        {moneyFormat(item.price)}
                      </td>
                      <td className='align-middle'>
                        <select
                          value={item.quantity}
                          style={{ width: '60px' }}
                          className='py-1 bg-secondary text-center ml-2 rounded'
                          onChange={(e) => changeQuantityHandler(e, item)}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className='align-middle'>
                        {moneyFormat(item.quantity * item.price)}
                      </td>
                      <td className='align-middle'>
                        <button
                          className='btn btn-sm btn-primary'
                          onClick={() => removeFromCartHandler(item.productId)}
                        >
                          <i className='fa fa-times'></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className='col-lg-4'>
            <div className='card border-secondary mb-5'>
              <div className='card-header bg-secondary border-0'>
                <h4 className='font-weight-semi-bold m-0'>Thanh Toán</h4>
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
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Tiến Hành Thanh Toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CartScreen
