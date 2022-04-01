import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
  Modal,
  Container,
} from 'react-bootstrap'
import { ProductAction } from '../actions/product.action'
import { CartAction } from '../actions/cart.action'

import { moneyFormat } from '../utils/moneyFormat'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {
  const { id: productId } = useParams()

  const [quantity, setQuantity] = useState(1)
  const [modalShow, setModalShow] = useState(false)

  const dispatch = useDispatch()

  const productGetDetails = useSelector((state) => state.productGetDetails)
  const { loading, error, product } = productGetDetails

  useEffect(() => {
    dispatch(ProductAction.getDetails(productId))
  }, [dispatch, productId])

  const addToCartHandler = () => {
    setModalShow(true)

    dispatch(CartAction.addToCart(product, quantity))
  }

  return (
    <>
      <Link to='/' className='btn btn-primary my-3'>
        Quay Lại
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            <Col md='5'>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md='4'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Giá:</b> {moneyFormat(product.price)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Thương hiệu:</b> {product.brand}
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Bảo hành:</b> {product.warranty} tháng
                </ListGroup.Item>
                <ListGroup.Item>
                  <b>Mô tả:</b> {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md='3'>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Giá:</Col>
                      <Col>
                        <strong>{moneyFormat(product.price)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Trạng thái:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className='d-flex align-items-center'>Qty</Col>
                        <Col>
                          <Form.Select
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Number(e.target.value))
                            }
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      variant='primary'
                      style={{ width: '100%' }}
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Modal
            show={modalShow}
            size='sm'
            centered
            onHide={() => setModalShow(false)}
            onClick={() => setModalShow(false)}
          >
            <Modal.Body>
              <Container className='text-center'>
                <Row className='mb-2'>
                  <Col>
                    <i
                      className='fas fa-check-circle text-primary'
                      style={{ fontSize: '60px' }}
                    ></i>
                  </Col>
                </Row>
                <Row>
                  <Col>Sản phẩm đã được thêm</Col>
                </Row>
              </Container>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  )
}

export default ProductScreen
