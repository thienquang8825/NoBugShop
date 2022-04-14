import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserAction } from '../actions/user.action'
import { BrandAction } from '../actions/brand.action'
import { CategoryAction } from '../actions/category.action'
import SearchBox from './SearchBox'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const location = useLocation()
  const isHome = location.pathname === '/'

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
      <>
        {/* <!-- Topbar Start --> */}
        <div className='row align-items-center py-3 px-xl-5'>
          <div className='col-lg-3 d-none d-lg-block'>
            <Link to='/' className='text-decoration-none'>
              <h1 className='m-0 display-5 font-weight-semi-bold'>
                <span className='text-primary font-weight-bold border px-3 mr-1'>
                  NoBug
                </span>
                Shop
              </h1>
            </Link>
          </div>

          <SearchBox />

          <div className='col-lg-3 col-6 text-right'>
            <Link to='/cart' className='btn border'>
              <i className='fas fa-shopping-cart text-primary'></i>
              <span className='badge'>
                {cartItems.length > 0 && `(${cartItems.length})`}
              </span>
            </Link>
          </div>
        </div>
        {/* <!-- Topbar End --> */}

        {/* <!-- Navbar Start --> */}
        <div className={`container-fluid ${isHome && 'mb-5'}`}>
          <div className='row border-top px-xl-5'>
            <div className='col-lg-3 d-none d-lg-block'>
              <a
                className='btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100'
                data-toggle='collapse'
                href='#navbar-vertical'
                style={{ height: '65px', marginTop: '-1px', padding: '0 30px' }}
              >
                <h6 className='m-0'>Danh mục sản phẩm</h6>
                <i className='fa fa-angle-down text-dark'></i>
              </a>
              <nav
                className={`collapse navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 
                ${isHome && 'show'}
                ${!isHome && 'position-absolute bg-light'}`}
                id='navbar-vertical'
                style={
                  !isHome ? { width: 'calc(100% - 30px)', zIndex: '1' } : {}
                }
              >
                <div
                  className='navbar-nav w-100 overflow-hidden'
                  style={{ height: '410px' }}
                >
                  <a href='/' className='nav-item nav-link'>
                    CPU - Bộ Vi Xử Lý
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    VGA - Card Màn Hình
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    PSU - Nguồn Máy Tính
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    Ram - Bộ Nhớ Trong
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    SSD - Ổ Cứng Thể Rắn
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    HDD - Ổ Cứng
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    Case - Vỏ Máy Tính
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    Bàn Phím - Chuột
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    ODD - Ổ đĩa quang
                  </a>
                  <a href='/' className='nav-item nav-link'>
                    Ổ cứng HDD - SSD
                  </a>
                </div>
              </nav>
            </div>
            <div className='col-lg-9'>
              <nav className='navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0'>
                <a href='/' className='text-decoration-none d-block d-lg-none'>
                  <h1 className='m-0 display-5 font-weight-semi-bold'>
                    <span className='text-primary font-weight-bold border px-3 mr-1'>
                      E
                    </span>
                    Shopper
                  </h1>
                </a>
                <button
                  type='button'
                  className='navbar-toggler'
                  data-toggle='collapse'
                  data-target='#navbarCollapse'
                >
                  <span className='navbar-toggler-icon'></span>
                </button>
                <div
                  className='collapse navbar-collapse justify-content-between'
                  id='navbarCollapse'
                >
                  <div className='navbar-nav mr-auto py-0'>
                    <Link to='/' className='nav-item nav-link active'>
                      Trang Chủ
                    </Link>
                    <Link to='/shopping' className='nav-item nav-link'>
                      Mua Sắm
                    </Link>

                    <div className='nav-item dropdown'>
                      <Link
                        to='#'
                        className='nav-link dropdown-toggle'
                        data-toggle='dropdown'
                      >
                        Thể loại
                      </Link>
                      <div className='dropdown-menu rounded-0 m-0'>
                        {categories &&
                          categories.map((category) => (
                            <Link
                              to={`/category/${category._id}`}
                              key={category._id}
                              className='dropdown-item'
                            >
                              {category.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                    <div className='nav-item dropdown'>
                      <Link
                        to='#'
                        className='nav-link dropdown-toggle'
                        data-toggle='dropdown'
                      >
                        Thương hiệu
                      </Link>
                      <div className='dropdown-menu rounded-0 m-0'>
                        {brands &&
                          brands.map((brand) => (
                            <Link
                              to={`/brand/${brand._id}`}
                              key={brand._id}
                              className='dropdown-item'
                            >
                              {brand.name}
                            </Link>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* if user logged */}
                  <div className='navbar-nav ml-auto py-0'>
                    {userInfo ? (
                      <div className='nav-item dropdown'>
                        <Link
                          to='#'
                          className='nav-link dropdown-toggle'
                          data-toggle='dropdown'
                        >
                          {userInfo.name}
                        </Link>
                        <div className='dropdown-menu rounded-0 m-0'>
                          <Link to='/profile' className='dropdown-item'>
                            Thông tin
                          </Link>
                          <div
                            className='dropdown-item'
                            onClick={logoutHandler}
                          >
                            Đăng xuất
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <Link to='/login' className='nav-item nav-link'>
                          Đăng nhập
                        </Link>
                        <Link to='/register' className='nav-item nav-link'>
                          Đăng ký
                        </Link>
                      </>
                    )}

                    {/* if user logged and user is admin */}
                    {userInfo && userInfo.isAdmin && (
                      <div className='nav-item dropdown'>
                        <Link
                          to='#'
                          className='nav-link dropdown-toggle'
                          data-toggle='dropdown'
                        >
                          Quản lý
                        </Link>
                        <div className='dropdown-menu rounded-0 m-0'>
                          <Link to='/admin/userlist' className='dropdown-item'>
                            Người dùng
                          </Link>
                          <Link
                            to='/admin/productlist'
                            className='dropdown-item'
                          >
                            Sản phẩm
                          </Link>
                          <Link to='/admin/orderlist' className='dropdown-item'>
                            Đơn hàng
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </nav>

              {/* Carousel Start */}
              {isHome && (
                <div
                  id='header-carousel'
                  className='carousel slide'
                  data-ride='carousel'
                >
                  <div className='carousel-inner'>
                    <div
                      className='carousel-item active'
                      style={{ height: '410px' }}
                    >
                      <img
                        className='img-fluid'
                        src='/images/banner1.jpg'
                        alt='mage'
                      />
                    </div>
                    <div className='carousel-item' style={{ height: '410px' }}>
                      <img
                        className='img-fluid'
                        src='/images/banner2.jpg'
                        alt='mage'
                      />
                    </div>
                  </div>
                  <a
                    className='carousel-control-prev'
                    href='#header-carousel'
                    data-slide='prev'
                  >
                    <div
                      className='btn btn-dark'
                      style={{ width: '45px', height: '45px' }}
                    >
                      <span className='carousel-control-prev-icon mb-n2'></span>
                    </div>
                  </a>
                  <a
                    className='carousel-control-next'
                    href='#header-carousel'
                    data-slide='next'
                  >
                    <div
                      className='btn btn-dark'
                      style={{ width: '45px', height: '45px' }}
                    >
                      <span className='carousel-control-next-icon mb-n2'></span>
                    </div>
                  </a>
                </div>
              )}

              {/* Carousel End */}
            </div>
          </div>
        </div>
        {/* <!-- Navbar End --> */}
      </>
    </header>
  )
}

export default Header
