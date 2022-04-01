import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  // const [numItem, setItem] = useState(0)

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  return (
    <header>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>NoBug Shop</Navbar.Brand>
          </LinkContainer>
          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i> Giỏ hàng{' '}
                {cartItems.length > 0 && `(${cartItems.length})`}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>
                <i className='fas fa-user'></i> Đăng nhập
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
