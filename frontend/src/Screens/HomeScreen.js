import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ProductAction } from '../actions/product.action'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductList from '../components/ProductList'

const HomeScreen = () => {
  const dispatch = useDispatch()

  // const productGetTopRated = useSelector((state) => state.productGetTopRated)
  // const { loading, error, products } = productGetTopRated

  const productsNew = useSelector((state) => state.productGetTopNew)

  const productsRated = useSelector((state) => state.productGetTopRated)

  useEffect(() => {
    dispatch(ProductAction.getTopRated())
    dispatch(ProductAction.getTopNew())
  }, [dispatch])

  return productsNew.loading ? (
    <Loader />
  ) : productsNew.error ? (
    <Message variant='danger'>{productsNew.error}</Message>
  ) : (
    <>
      <ProductList title='Sản Phẩm Mới' products={productsNew.products} />
      <ProductList
        title='Sản Phẩm Được Đánh Cao'
        products={productsRated.products}
      />
    </>
  )
}

export default HomeScreen
