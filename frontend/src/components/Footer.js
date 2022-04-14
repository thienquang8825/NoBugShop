import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-primary text-white'>
      {/* <!-- Footer Start --> */}
      <div className='container-fluid bg-secondary text-dark mt-5 pt-4 pb-3'>
        <div className='row px-xl-5 pt-5'>
          <div className='col mb-5 pr-3 pr-xl-5 text-center'>
            <h1 className='display-5 font-weight-semi-bold '>
              <span className='text-primary font-weight-bold border border-white px-3 mr-1'>
                NoBug
              </span>
              Shop
            </h1>
            <div>&copy;2022 - NoBug Team</div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End --> */}
    </footer>
  )
}

export default Footer
