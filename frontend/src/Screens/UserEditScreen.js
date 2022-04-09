import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
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
      <Link to='/admin/userlist' className='btn btn-primary my-3'>
        Quay lại
      </Link>
      <FormContainer>
        <h1>Cập Nhật Thông Tin</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mb-3'>
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type='name'
                placeholder='Nhập tên...'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='my-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Nhập email...'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' className='my-3'>
              <Form.Check
                type='checkbox'
                label='Quản trị viên'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Cập nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
