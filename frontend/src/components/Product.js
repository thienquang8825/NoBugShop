import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { moneyFormat } from '../utils/moneyFormat'

import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' border='primary'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>

      <Card.Body className='text-center'>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>{moneyFormat(product.price)}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
