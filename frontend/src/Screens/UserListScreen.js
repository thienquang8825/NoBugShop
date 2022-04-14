import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { UserAction } from '../actions/user.action'

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userGetList = useSelector((state) => state.userGetList)
  const { loading, error, users } = userGetList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(UserAction.getList())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo, successDelete])

  const deleteHandler = (userId) => {
    if (window.confirm('Bạn chắc chứ???')) {
      dispatch(UserAction.deleteUser(userId))
    }
  }

  return (
    <>
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5'>
          <div className='col-lg-12 table-responsive mb-5'>
            <div className='text-center mb-4'>
              <h2 className='section-title px-5'>
                <span className='px-2'>Quản Lý Người Dùng</span>
              </h2>
            </div>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <table className='table table-bordered text-center mb-0 table-hover'>
                <thead className='bg-secondary text-dark'>
                  <tr>
                    <th>Mã nười dùng</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Sửa</th>
                    <th>Xóa</th>
                  </tr>
                </thead>
                <tbody className='align-middle'>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td className='align-middle'>{user._id}</td>
                      <td className='align-middle'>{user.name}</td>
                      <td className='align-middle'>{user.email}</td>
                      <td className='align-middle'>
                        {user.isAdmin ? (
                          <i
                            className='fas fa-check'
                            style={{ color: 'green' }}
                          ></i>
                        ) : (
                          <i
                            className='fas fa-times'
                            style={{ color: 'red' }}
                          ></i>
                        )}
                      </td>
                      <td className='align-middle'>
                        <Link to={`/admin/user/${user._id}/edit`}>
                          <button className='btn btn-sm btn-primary'>
                            <i className='fas fa-edit'></i>
                          </button>
                        </Link>
                      </td>
                      <td className='align-middle'>
                        <button
                          className='btn btn-sm btn-danger'
                          onClick={() => deleteHandler(user._id)}
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
        </div>
      </div>
    </>
  )
}

export default UserListScreen
