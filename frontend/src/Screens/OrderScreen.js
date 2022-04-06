import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { moneyFormat } from '../utils/moneyFormat'
import { OrderAction } from '../actions/order.action'
import { ORDER_CONSTANT } from '../constants/order.constant'

const OrderScreen = () => {
  const { id: orderId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderGetDetails = useSelector((state) => state.orderGetDetails)
  const { order, loading, error } = orderGetDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { success: successPay, loading: loadingPay, error: errorPay } = orderPay

  if (!loading) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  }

  useEffect(() => {
    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_CONSTANT.PAY_RESET })

      dispatch(OrderAction.getDetails(orderId))
    }
  }, [dispatch, order, orderId, successPay])

  const successPaymentHandler = () => {
    dispatch(OrderAction.pay(orderId))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Địa Chỉ Giao Hàng</h2>
              <p>
                <strong>Tên: </strong> {order.userId.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.userId.email}`}>
                  {order.userId.email}
                </a>
              </p>
              <p>
                <strong>Địa chỉ: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.ward},{' '}
                {order.shippingAddress.district}, {order.shippingAddress.city}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Đã giao hàng: {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>Chưa giao hàng</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Phương Thức Thanh Toán</h2>
              <p>
                <strong>Phương thức: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Đã thanh toán: {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>Chưa thanh toán</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Sản Phẩm</h2>
              {order.orderItems.length === 0 ? (
                <Message>Đơn hàng rỗng</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.quantity} x {moneyFormat(item.price)} ={' '}
                          {moneyFormat(item.price * item.quantity)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Tổng Đơn Hàng</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Giá sản phẩm</Col>
                  <Col>{moneyFormat(order.itemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phí giao hàng</Col>
                  <Col>{moneyFormat(order.shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tổng tiền:</Col>
                  <Col>{moneyFormat(order.totalPrice)}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-block w-100'
                    onClick={successPaymentHandler}
                  >
                    Thanh toán
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
