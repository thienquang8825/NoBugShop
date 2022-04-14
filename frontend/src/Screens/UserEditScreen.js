import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { UserAction } from '../actions/user.action'
import { USER_CONSTANTS } from '../constants/user.constants'

const UserEditScreen = () => {
  const { id: userId } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userGetProfile = useSelector((state) => state.userGetProfile)
  const { loading, error, userProfile } = userGetProfile

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_CONSTANTS.UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      console.log(userProfile._id)
      console.log(userId)
      if (!userProfile.name || userProfile._id !== userId) {
        dispatch(UserAction.getProfile(userId))
      } else {
        setName(userProfile.name)
        setEmail(userProfile.email)
        setIsAdmin(userProfile.isAdmin)
      }
    }
  }, [dispatch, navigate, successUpdate, userId, userProfile])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(UserAction.updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5 justify-content-center'>
          <div className='col-lg-5 col-md-8'>
            <div className='text-center mb-4'>
              <h2 className='section-title px-5'>
                <span className='px-2'>Thông Tin Người Dùng</span>
              </h2>
            </div>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
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
                  <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                    <input
                      type='checkbox'
                      className='custom-control-input'
                      id='isAdmin'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                    <label className='custom-control-label' htmlFor='isAdmin'>
                      Quản trị viên
                    </label>
                  </div>
                </div>

                <div className='form-group'>
                  <button className='btn btn-primary py-2 px-4' type='submit'>
                    Cập nhật thông tin
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default UserEditScreen
