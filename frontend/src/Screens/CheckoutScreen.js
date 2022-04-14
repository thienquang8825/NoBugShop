import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { CartAction } from '../actions/cart.action'

const CheckoutScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { shippingInfo } = cart

  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo || cart.cartItems.length === 0) {
      console.log(cart.cartItems.length)
      navigate('/login')
    }
  })

  const [name, setName] = useState(shippingInfo.name)
  const [email, setEmail] = useState(shippingInfo.email)
  const [phone, setPhone] = useState(shippingInfo.phone)
  const [address, setAddress] = useState(shippingInfo.address)
  const [ward, setWard] = useState(shippingInfo.ward)
  const [district, setDistrict] = useState(shippingInfo.district)
  const [city, setCity] = useState(shippingInfo.city)
  const [note, setNote] = useState(shippingInfo.note)

  const [paymentMethod, setPaymentMethod] = useState(
    cart.paymentMethod || 'Thẻ ATM'
  )

  const dispatch = useDispatch()

  console.log(paymentMethod)

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(
      CartAction.saveShippingInfo({
        name,
        email,
        phone,
        address,
        ward,
        district,
        city,
        note,
      })
    )
    dispatch(CartAction.savePaymentMethod(paymentMethod))

    navigate('/placeorder')
  }

  return (
    <>
      <PageHeader title='Xác Nhận Thông Tin' />
      <div className='container-fluid pt-5'>
        <form onSubmit={submitHandler}>
          <div className='row px-xl-5'>
            <div className='col-lg-8'>
              <div className='mb-4'>
                <h4 className='font-weight-semi-bold mb-4'>
                  Thông Tin Giao Hàng
                </h4>
                <div className='row'>
                  <div className='col-md-6 form-group'>
                    <label>Tên</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Nguyên Văn A'
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className='col-md-6 form-group'>
                    <label>Email</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='nva@gmail.com'
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='col-md-6 form-group'>
                    <label>Số điện thoại</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='+84 123 456 789'
                      value={phone}
                      required
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className='col-md-6 form-group'>
                    <label>Địa chỉ</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='KDC Gia Hòa'
                      value={address}
                      required
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className='col-md-6 form-group'>
                    <label>Phường/Xã</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Phong Phú'
                      value={ward}
                      required
                      onChange={(e) => setWard(e.target.value)}
                    />
                  </div>
                  <div className='col-md-6 form-group'>
                    <label>Quận/Huyện</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Bình Chánh'
                      value={district}
                      required
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                  <div className='col-md-6 form-group'>
                    <label>Tỉnh/Thành phố</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Thành phố Hồ Chí Minh'
                      value={city}
                      required
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className='col-md-6 form-group'>
                    <label>Ghi chú (nếu có)</label>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='Ghi chú...'
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className='card border-secondary mb-5'>
                <div className='card-header bg-secondary border-0'>
                  <h4 className='font-weight-semi-bold m-0'>
                    Phương Thức Thanh Toán
                  </h4>
                </div>
                <div className='card-body'>
                  <div className='form-group'>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        className='custom-control-input'
                        name='payment'
                        id='atm'
                        value='Thẻ ATM'
                        checked={paymentMethod === 'Thẻ ATM'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className='custom-control-label' htmlFor='atm'>
                        Thẻ ATM
                      </label>
                    </div>
                  </div>
                  <div className='form-group'>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        className='custom-control-input'
                        name='payment'
                        id='credit'
                        value='Thẻ tín dụng'
                        checked={paymentMethod === 'Thẻ tín dụng'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className='custom-control-label' htmlFor='credit'>
                        Thẻ tín dụng
                      </label>
                    </div>
                  </div>
                  <div className=''>
                    <div className='custom-control custom-radio'>
                      <input
                        type='radio'
                        className='custom-control-input'
                        name='payment'
                        id='momo'
                        value='Ví Momo'
                        checked={paymentMethod === 'Ví Momo'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className='custom-control-label' htmlFor='momo'>
                        Ví Momo
                      </label>
                    </div>
                  </div>
                </div>
                <div className='card-footer border-secondary bg-transparent'>
                  <button
                    type='submit'
                    className='btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3'
                  >
                    Đặt Hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default CheckoutScreen
