import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { UserAction } from '../actions/user.action'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')
    ? searchParams.get('redirect')
    : '/'

  useEffect(() => {
    if (userInfo) {
      redirect === '/' ? navigate(redirect) : navigate(`/${redirect}`)
    }
  }, [navigate, redirect, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Xác nhận mật khẩu sai!')
    } else {
      dispatch(UserAction.register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Đăng Ký</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
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
          Đăng ký
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Đã có tài khoản?{' '}
          <Link
            to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
          >
            Đăng nhập
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
