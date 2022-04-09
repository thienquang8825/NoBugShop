import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { moneyFormat } from '../utils/moneyFormat'
import { ProductAction } from '../actions/product.action'
import { PRODUCT_CONSTANT } from '../constants/product.constant'

const ProductListScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productGetList = useSelector((state) => state.productGetList)
  const { loading, error, products } = productGetList

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
      dispatch(ProductAction.getList())
    }
  }, [
    dispatch,
    navigate,
    createdProduct,
    successDelete,
    successCreate,
    userInfo,
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
      <Row className='align-items-center'>
        <Col>
          <h1>Danh Sách Sản Phẩm</h1>
        </Col>
        <Col className='text-end'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Tạo mới sản phẩm
          </Button>
        </Col>
      </Row>
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
          <Table striped bordered hover responsive className='table-sm'>
            <thead className='table-primary'>
              <tr>
                <th>Id</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Thể loại</th>
                <th>Thương hiệu</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{moneyFormat(product.price)}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='primary' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default ProductListScreen
