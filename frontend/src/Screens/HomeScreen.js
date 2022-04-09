import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { ProductAction } from '../actions/product.action'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'

const HomeScreen = () => {
  const { keyword, pageNumber } = useParams()

  const dispatch = useDispatch()

  const productGetList = useSelector((state) => state.productGetList)
  const { loading, error, products, page, pages } = productGetList

  useEffect(() => {
    dispatch(ProductAction.getList(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <h1>Danh Sách Sản Phẩm</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row className='d-flex justify-content-center'>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </Row>
        </>
      )}
    </>
  )
}

export default HomeScreen
