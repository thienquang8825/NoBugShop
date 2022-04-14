import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { UserAction } from '../actions/user.action'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

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

    dispatch(UserAction.login(email, password))
  }

  return (
    <div className='container-fluid pt-5'>
      <div className='row px-xl-5 justify-content-center'>
        <div className='col-lg-4 col-md-8'>
          <div className='text-center mb-4'>
            <h2 className='section-title px-5'>
              <span className='px-2'>Đăng Nhập</span>
            </h2>
          </div>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
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
              <button className='btn btn-primary py-2 px-4' type='submit'>
                Đăng nhập
              </button>
            </div>
            <div className='form-group'>
              Chưa có tài khoản?{' '}
              <Link
                to={
                  redirect !== '/'
                    ? `/register?redirect=${redirect}`
                    : '/register'
                }
              >
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
