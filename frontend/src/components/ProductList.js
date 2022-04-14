import React from 'react'
import Product from './Product'

const ProductList = ({ title, products }) => {
  return (
    <div className='container-fluid pt-5'>
      <div className='text-center mb-4'>
        <h2 className='section-title px-5'>
          <span className='px-2'>{title}</span>
        </h2>
      </div>
      <div className='row px-xl-5 pb-3'>
        {products.map((product) => (
          <div key={product._id} className='col-lg-3 col-md-6 col-sm-12 pb-1'>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
