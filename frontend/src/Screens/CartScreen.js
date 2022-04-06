import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { CartAction } from '../actions/cart.action'
import { moneyFormat } from '../utils/moneyFormat'

import Message from '../components/Message'

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const changeQuantityHandler = (e, item) => {
    dispatch(CartAction.addToCart(item, Number(e.target.value)))
  }

  const removeFromCartHandler = (productId) => {
    dispatch(CartAction.removeFromCart(productId))
  }

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={9}>
        <h1>Giỏ Hàng</h1>
        {cartItems.length === 0 ? (
          <Message>
            Giỏ hàng rỗng. <Link to='/'>Quay lại.</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.productId}>
                <Row className='d-flex align-items-center'>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid />
                  </Col>
                  <Col md={5}>
                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{moneyFormat(item.price)}</Col>
                  <Col md={2}>
                    <Form.Select
                      value={item.quantity}
                      onChange={(e) => changeQuantityHandler(e, item)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant='light'
                      onClick={() => removeFromCartHandler(item.productId)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={3}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Tổng ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                sản phẩm
              </h2>

              {moneyFormat(
                cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant='primary'
                style={{ width: '100%' }}
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Thanh toán
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
