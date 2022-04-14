import React from 'react'
// import PropTypes from 'prop-types'

const Rating = ({ value, numReviews }) => {
  return (
    <div className='d-flex my-1'>
      <div className='text-primary mr-2'>
        <span>
          <i
            className={
              value >= 1
                ? 'fas fa-star'
                : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 2
                ? 'fas fa-star'
                : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 3
                ? 'fas fa-star'
                : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 4
                ? 'fas fa-star'
                : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            className={
              value >= 5
                ? 'fas fa-star'
                : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>{' '}
        <span>
          {(numReviews || numReviews === 0) && `(${numReviews} đánh giá)`}
        </span>
      </div>
    </div>
  )
}

// Rating.defaultProps = {
//   color: '#f8e825',
// }

// Rating.propTypes = {
//   value: PropTypes.number,
//   numReviews: PropTypes.number,
//   color: PropTypes.string,
// }

export default Rating
