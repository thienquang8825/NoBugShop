import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { moneyFormat } from '../utils/moneyFormat'
import { ProductAction } from '../actions/product.action'
import { PRODUCT_CONSTANT } from '../constants/product.constant'

const ProductListScreen = () => {
  const { pageNumber } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productGetList = useSelector((state) => state.productGetList)
  const { loading, error, products, page, pages } = productGetList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CONSTANT.CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login')
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(ProductAction.getList('', pageNumber))
    }
  }, [
    dispatch,
    navigate,
    createdProduct,
    successDelete,
    successCreate,
    userInfo,
    pageNumber,
  ])

  function deleteHandler(productId) {
    if (window.confirm('Bạn chắc chứ???')) {
      dispatch(ProductAction.deleteProduct(productId))
    }
  }

  const createProductHandler = () => {
    dispatch(ProductAction.createProduct())
  }

  return (
    <>
      <div className='container-fluid pt-5'>
        <div className='row px-xl-5'>
          <div className='col-lg-12 table-responsive mb-5'>
            <div className='text-center mb-4'>
              <h2 className='section-title px-5'>
                <span className='px-2'>Quản Lý Sản Phẩm</span>
              </h2>
              <div>
                <button
                  className='btn btn-primary'
                  onClick={createProductHandler}
                >
                  <i className='fas fa-plus'></i> Thêm sản phẩm
                </button>
              </div>
            </div>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                <table className='table table-bordered text-center mb-4 table-hover'>
                  <thead className='bg-secondary text-dark'>
                    <tr>
                      <th>Mã sản phẩm</th>
                      <th>Tên</th>
                      <th>Giá</th>
                      <th>Thể loại</th>
                      <th>Thương hiệu</th>
                      <th>Sửa</th>
                      <th>Xóa</th>
                    </tr>
                  </thead>
                  <tbody className='align-middle'>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td>{product._id}</td>
                        <td>{product.name}</td>
                        <td>{moneyFormat(product.price)}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td className='align-middle'>
                          <Link to={`/admin/product/${product._id}/edit`}>
                            <button className='btn btn-sm btn-primary'>
                              <i className='fas fa-edit'></i>
                            </button>
                          </Link>
                        </td>
                        <td className='align-middle'>
                          <button
                            className='btn btn-sm btn-danger'
                            onClick={() => deleteHandler(product._id)}
                          >
                            <i className='fa fa-times'></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Paginate pages={pages} page={page} isAdmin={true} />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductListScreen
