import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
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
    <div className='container-fluid pt-5'>
      <div className='row px-xl-5 justify-content-center'>
        <div className='col-lg-4 col-md-8'>
          <div className='text-center mb-4'>
            <h2 className='section-title px-5'>
              <span className='px-2'>Đăng Ký</span>
            </h2>
          </div>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
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
                Đăng ký
              </button>
            </div>
            <div className='form-group'>
              Đã có tài khoản?{' '}
              <Link
                to={redirect !== '/' ? `/login?redirect=${redirect}` : '/login'}
              >
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
