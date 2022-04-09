import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { UserAction } from '../actions/user.action'
import { BrandAction } from '../actions/brand.action'
import { CategoryAction } from '../actions/category.action'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const brandGetList = useSelector((state) => state.brandGetList)
  const { brands } = brandGetList

  const categoryGetList = useSelector((state) => state.categoryGetList)
  const { categories } = categoryGetList

  useEffect(() => {
    dispatch(BrandAction.getList())
    dispatch(CategoryAction.getList())
  }, [dispatch])

  const logoutHandler = () => {
    dispatch(UserAction.logout())

    navigate('/login')
  }

  return (
    <header>
      <Navbar bg='primary' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>NoBug Shop</Navbar.Brand>
          </LinkContainer>

          <Nav>
            {categories && (
              <NavDropdown title='Category' id='categoryMenu'>
                {brands.map((category) => (
                  <NavDropdown.Item key={category._id}>
                    {category.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}

            {brands && (
              <NavDropdown title='Brand' id='brandMenu'>
                {brands.map((brand) => (
                  <NavDropdown.Item key={brand._id}>
                    {brand.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
          </Nav>

          <Nav className='ms-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i className='fas fa-shopping-cart'></i> Giỏ hàng{' '}
                {cartItems.length > 0 && `(${cartItems.length})`}
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Thông tin</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link>
                  <i className='fas fa-user'></i> Đăng nhập
                </Nav.Link>
              </LinkContainer>
            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenu'>
                <LinkContainer to='/admin/userlist'>
                  <NavDropdown.Item>Người dùng</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/productlist'>
                  <NavDropdown.Item>Sản phẩm</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orderlist'>
                  <NavDropdown.Item>Đơn hàng</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
