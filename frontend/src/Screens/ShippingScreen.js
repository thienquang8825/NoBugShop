import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
// import CheckoutSteps from '../components/CheckoutSteps'
import { CartAction } from '../actions/cart.action'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [ward, setWard] = useState(shippingAddress.ward)
  const [district, setDistrict] = useState(shippingAddress.district)
  const [city, setCity] = useState(shippingAddress.city)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(CartAction.saveShippingAddress({ address, ward, district, city }))

    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Địa Chỉ Giao Hàng</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-3'>
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập địa chỉ...'
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='ward' className='my-3'>
          <Form.Label>Phường/Xã</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập phường/xã...'
            value={ward}
            required
            onChange={(e) => setWard(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='district' className='my-3'>
          <Form.Label>Quận/Huyện</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập quận/huyện...'
            value={district}
            required
            onChange={(e) => setDistrict(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className='my-3'>
          <Form.Label>Thành phố</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập thành phố...'
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Tiếp tục
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
