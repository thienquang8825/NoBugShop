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
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ProductAction } from '../actions/product.action'
import { CartAction } from '../actions/cart.action'
import { moneyFormat } from '../utils/moneyFormat'
import { PRODUCT_CONSTANT } from '../constants/product.constant'

const ProductScreen = () => {
  const { id: productId } = useParams()

  const [quantity, setQuantity] = useState(1)
  const [modalShow, setModalShow] = useState(false)

  //reviews
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productGetDetails = useSelector((state) => state.productGetDetails)
  const { loading, error, product } = productGetDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCreateReview = useSelector((state) => state.productCreateReview)
  const {
    loading: loadingReview,
    error: errorReview,
    success: successReview,
  } = productCreateReview

  useEffect(() => {
    if (successReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== productId || successReview) {
      dispatch(ProductAction.getDetails(productId))
      dispatch({ type: PRODUCT_CONSTANT.CREATE_REVIEW_RESET })
    }
  }, [dispatch, product._id, productId, successReview])

  const addToCartHandler = () => {
    setModalShow(true)

    dispatch(CartAction.addToCart(product, quantity))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      ProductAction.createReview(productId, {
        rating,
        comment,
      })
    )
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
                  <b>Thể loại:</b> {product.category}
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
          <Row>
            <Col md={6}>
              <h2>Đánh Giá</h2>
              {product.reviews.length === 0 && (
                <Message>Không có đánh giá</Message>
              )}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Bình Luận</h2>
                  {successReview && (
                    <Message variant='success'>Bình luận đã được gửi</Message>
                  )}
                  {loadingReview && <Loader />}
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating' className='my-3'>
                        <Form.Label>Đánh giá</Form.Label>
                        <Form.Select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Chọn...</option>
                          <option value='1'>1 - Tệ</option>
                          <option value='2'>2 - Tạm được</option>
                          <option value='3'>3 - Tốt</option>
                          <option value='4'>4 - Rất tốt</option>
                          <option value='5'>5 - Tuyệt vời</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group controlId='comment' className='my-3'>
                        <Form.Label>Bình luận</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={loadingReview}
                        type='submit'
                        variant='primary'
                      >
                        Bình luận
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Hãy <Link to='/login'>đăng nhập</Link> để có thể bình luận{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
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
