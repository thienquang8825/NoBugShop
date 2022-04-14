import React from 'react'
import { Link } from 'react-router-dom'
import { moneyFormat } from '../utils/moneyFormat'
import { CartAction } from '../actions/cart.action'
import { useDispatch } from 'react-redux'

const Product = ({ product }) => {
  const dispatch = useDispatch()

  const addToCartHandler = () => {
    if (product.countInStock > 0) {
      window.alert('Đã thêm vào giỏ hàng!')
      dispatch(CartAction.addToCart(product, 1))
    } else {
      window.alert('Sản phẩm đã hết hàng!')
    }
  }
  return (
    product && (
      <>
        <div className='card product-item border-0 mb-4'>
          <div className='card-header product-img position-relative overflow-hidden bg-transparent border p-0'>
            <img
              className='img-fluid w-100'
              src={product.image}
              alt={product.name}
            />
          </div>
          <div className='card-body border-left border-right text-center p-0 pt-4 pb-3'>
            <h6 className='text-truncate mb-3 px-3'>{product.name}</h6>
            <div className='d-flex justify-content-center'>
              <h6>{moneyFormat(product.price)}</h6>
            </div>
          </div>
          <div className='card-footer d-flex justify-content-between bg-light border'>
            <Link
              to={`/product/${product._id}`}
              className='btn btn-sm text-dark p-0'
            >
              <i className='fas fa-eye text-primary mr-1'></i>Xem chi tiết
            </Link>
            <Link
              to='#'
              className='btn btn-sm text-dark p-0'
              onClick={addToCartHandler}
            >
              <i className='fas fa-shopping-cart text-primary mr-1'></i>Thêm giỏ
              hàng
            </Link>
          </div>
        </div>
      </>
    )
  )
}

export default Product
