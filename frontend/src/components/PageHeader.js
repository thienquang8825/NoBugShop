import React from 'react'
import { Link } from 'react-router-dom'

const PageHeader = ({ title }) => {
  return (
    // <!-- Page Header Start -->
    <div className='container-fluid bg-secondary mb-5'>
      <div
        className='d-flex flex-column align-items-center justify-content-center'
        style={{ minHeight: '300px' }}
      >
        <h1 className='font-weight-semi-bold text-uppercase mb-3'>{title}</h1>
        <div className='d-inline-flex'>
          <p className='m-0'>
            <Link to='/'>Trang chủ</Link>
          </p>
          <p className='m-0 px-2'>-</p>
          <p className='m-0'>{title}</p>
        </div>
      </div>
    </div>
    // <!-- Page Header End -->
  )
}

export default PageHeader
