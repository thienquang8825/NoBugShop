import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { moneyFormat } from '../utils/moneyFormat'
import { ProductAction } from '../actions/product.action'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Product from '../components/Product'
import Paginate from '../components/Paginate'

const ShoppingScreen = () => {
  const { keyword, categoryId, brandId, pageNumber } = useParams()

  const dispatch = useDispatch()

  const productGetList = useSelector((state) => state.productGetList)
  const { loading, error, products, page, pages } = productGetList

  useEffect(() => {
    if (categoryId) {
      dispatch(ProductAction.getListByCategory(categoryId, pageNumber))
    } else if (brandId) {
      dispatch(ProductAction.getListByBrand(brandId, pageNumber))
    } else {
      dispatch(ProductAction.getList(keyword, pageNumber))
    }
  }, [brandId, categoryId, dispatch, keyword, pageNumber])

  return (
    <>
      <PageHeader title='Mua Sắm' />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {/* <!-- Shop Start --> */}
          <div className='container-fluid pt-5'>
            <div className='row px-xl-5'>
              {/* <!-- Shop Sidebar Start --> */}
              <div className='col-lg-3 col-md-12'>
                {/* <!-- Price Start --> */}
                <div className='border-bottom mb-4 pb-4'>
                  <h5 className='font-weight-semi-bold mb-4'>Lọc theo giá</h5>
                  <form>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        defaultChecked
                        id='price-all'
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='price-all'
                      >
                        Tất cả giá
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='price-1'
                      />
                      <label className='custom-control-label' htmlFor='price-1'>
                        Dưới {moneyFormat(1000000)}
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='price-2'
                      />
                      <label className='custom-control-label' htmlFor='price-2'>
                        {moneyFormat(1000000)} - {moneyFormat(5000000)}
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='price-3'
                      />
                      <label className='custom-control-label' htmlFor='price-3'>
                        Trên {moneyFormat(5000000)}
                      </label>
                    </div>
                  </form>
                </div>
                {/* <!-- Price End --> */}

                {/* <!-- Category Start --> */}
                <div className='border-bottom mb-4 pb-4'>
                  <h5 className='font-weight-semi-bold mb-4'>
                    Lọc theo thể loại
                  </h5>
                  <form>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        defaultChecked
                        id='category-all'
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='category-all'
                      >
                        Tất cả thể loại
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='category-1'
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='category-1'
                      >
                        Ram - Bộ Nhớ Trong
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='category-2'
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='category-2'
                      >
                        VGA - Card Màn Hình
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='category-3'
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='category-3'
                      >
                        SSD - Ổ Cứng Thể Rắn
                      </label>
                    </div>
                  </form>
                </div>
                {/* <!-- Category End --> */}

                {/* <!-- Brand Start --> */}
                <div className='mb-5'>
                  <h5 className='font-weight-semi-bold mb-4'>
                    Lọc theo thương hiệu
                  </h5>
                  <form>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        defaultChecked
                        id='brand-all'
                      />
                      <label
                        className='custom-control-label'
                        htmlFor='brand-all'
                      >
                        Tất cả thương hiệu
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='brand-1'
                      />
                      <label className='custom-control-label' htmlFor='brand-1'>
                        GIGABYTE
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='brand-2'
                      />
                      <label className='custom-control-label' htmlFor='brand-2'>
                        MSI
                      </label>
                    </div>
                    <div className='custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3'>
                      <input
                        type='checkbox'
                        className='custom-control-input'
                        id='brand-3'
                      />
                      <label className='custom-control-label' htmlFor='brand-3'>
                        ASUS
                      </label>
                    </div>
                  </form>
                </div>
                {/* <!-- Brand End --> */}
              </div>
              {/* <!-- Shop Sidebar End --> */}

              {/* <!-- Shop Product Start --> */}
              <div className='col-lg-9 col-md-12'>
                <div className='row pb-3'>
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className='col-lg-4 col-md-6 col-sm-12 pb-1'
                    >
                      <Product product={product} />
                    </div>
                  ))}
                  <Paginate
                    page={page}
                    pages={pages}
                    categoryId={categoryId ? categoryId : ''}
                    brandId={brandId ? brandId : ''}
                    keyword={keyword ? keyword : ''}
                  />
                </div>
              </div>
              {/* <!-- Shop Product End --> */}
            </div>
          </div>
          {/* <!-- Shop End --> */}
        </>
      )}
    </>
  )
}

export default ShoppingScreen
