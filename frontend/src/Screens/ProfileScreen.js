import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { moneyFormat } from '../utils/moneyFormat'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { UserAction } from '../actions/user.action'
import { OrderAction } from '../actions/order.action'
import { USER_CONSTANTS } from '../constants/user.constants'

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
    }
  }, [dispatch, navigate, success, userInfo, userProfile])

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
    <Row>
      <Col md={3}>
        <h2>Thông Tin</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && (
          <Message variant='success'>Thông tin đã được cập nhật</Message>
        )}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-3'>
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập tên...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              placeholder='Nhập email...'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password' className='my-3'>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập mật khẩu...'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='Xác nhận mật khẩu' className='my-3'>
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập lại mật khẩu...'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Cập nhật
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>Đơn Hàng</h2>
        {loadingOrders ? (
          <Loader />
        ) : errorOrders ? (
          <Message variant='danger'>{errorOrders}</Message>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className='table-primary table-sm'
          >
            <thead>
              <tr>
                <th>Mã đơn hằng</th>
                <th>Ngày tạo</th>
                <th>Tổng tiền</th>
                <th>Thanh toán</th>
                <th>Giao hàng</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{moneyFormat(order.totalPrice)}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='primary'>
                        Chi tiết
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
