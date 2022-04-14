import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { ProductAction } from '../actions/product.action'
import { CartAction } from '../actions/cart.action'
import { moneyFormat } from '../utils/moneyFormat'
import { PRODUCT_CONSTANT } from '../constants/product.constant'
import PageHeader from '../components/PageHeader'
import { Col, Container, Modal, Row } from 'react-bootstrap'

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
      <PageHeader title='Chi tiết sản phẩm' />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {/* <!-- Shop Detail Start --> */}
          <div className='container-fluid py-5'>
            <div className='row px-xl-5'>
              <div className='col-lg-5 pb-5'>
                <div className='carousel-item active'>
                  <img
                    className='w-100 h-100'
                    src={product.image}
                    alt={product.name}
                  />
                </div>
              </div>

              <div className='col-lg-7 pb-5'>
                <h3 className='font-weight-semi-bold'>{product.name}</h3>

                <div className='my-3'>
                  <Rating
                    value={product.rating}
                    numReviews={product.numReviews}
                  />
                </div>

                <h3 className='font-weight-semi-bold mb-3'>
                  {moneyFormat(product.price)}
                </h3>
                <p className='text-dark mb-3 mr-3'>
                  <b>Thể loại:</b> {product.category}
                </p>
                <p className='text-dark mb-3 mr-3'>
                  <b>Thương hiệu:</b> {product.brand}
                </p>
                <p className='text-dark mb-3 mr-3'>
                  <b>Bảo hành:</b> {product.warranty} tháng
                </p>
                <p className='text-dark mb-3 mr-3'>
                  <b>Số lượng tồn:</b> {product.countInStock} sản phẩm
                </p>
                <p className='text-dark mb-3 mr-3'>
                  <b>Mô tả:</b> {product.description}
                </p>
                {product.countInStock > 0 && (
                  <div className='text-dark mb-3 mr-3'>
                    <span>
                      <b>Chọn số lượng: </b>
                    </span>
                    <select
                      defaultValue='1'
                      style={{ width: '60px' }}
                      className='py-1 bg-secondary text-center ml-2 rounded'
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <button
                  className='btn btn-primary px-3'
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  <i className='fa fa-shopping-cart mr-1'></i> Thêm giỏ hàng
                </button>
              </div>
            </div>
            {/* reviews */}
            <div className='text-center mb-4'>
              <h2 className='section-title px-5'>
                <span className='px-2'>Đánh Giá Sản Phẩm</span>
              </h2>
            </div>
            <div className='row px-xl-5'>
              <div className='col'>
                <div className='row'>
                  {/* left reviews */}
                  <div className='col-md-6'>
                    <h4 className='mb-4'>
                      {product.reviews.length > 0
                        ? `Sản phẩm có ${product.numReviews} đánh giá`
                        : 'Sản phẩm chưa có đánh giá'}
                    </h4>
                    <div className='media mb-4'>
                      <div className='media-body'>
                        {product.reviews.map((review) => (
                          <div key={review._id}>
                            <h6>
                              {review.name}
                              <small>
                                {' '}
                                - <i>{review.createdAt.substring(0, 10)}</i>
                              </small>
                            </h6>
                            <Rating value={review.rating} />
                            <p>{review.comment}</p>
                            <hr />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* right reviews */}
                  <div className='col-md-6'>
                    <h4 className='mb-4'>Đánh giá của bạn</h4>
                    {/* {successReview && (
                      <Message variant='success'>Đánh giá đã được gửi</Message>
                    )} */}
                    {/* {loadingReview && <Loader />} */}
                    {errorReview && (
                      <Message variant='danger'>
                        Bạn đã đánh giá sản phẩm này rồi
                      </Message>
                    )}
                    {userInfo ? (
                      <form onSubmit={submitHandler}>
                        <div className='text-dark mb-3 mr-3'>
                          <span>
                            Đánh giá (
                            <i className='fas fa-star text-primary'></i>) :
                          </span>
                          <select
                            className='py-1 bg-secondary ml-2 rounded px-2'
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                          >
                            <option value=''>Chọn...</option>
                            <option value='1'>1 - Tệ</option>
                            <option value='2'>2 - Tạm được</option>
                            <option value='3'>3 - Tốt</option>
                            <option value='4'>4 - Rất tốt</option>
                            <option value='5'>5 - Tuyệt vời</option>
                          </select>
                        </div>
                        <div className='form-group'>
                          <label htmlFor='message'>Nhận xét :</label>
                          <textarea
                            id='message'
                            cols='30'
                            rows='5'
                            className='form-control'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                        <div className='form-group mb-0'>
                          <input
                            className='btn btn-primary px-3'
                            type='submit'
                            value='Để lại đánh giá'
                            disabled={loadingReview}
                          />
                        </div>
                      </form>
                    ) : (
                      <Message>
                        Hãy <Link to='/login'>đăng nhập</Link> để bình luận
                      </Message>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Shop Detail End --> */}

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
