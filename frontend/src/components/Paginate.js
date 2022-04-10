import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  categoryId = '',
  brandId = '',
  keyword = '',
}) => {
  return (
    pages > 1 && (
      <Pagination className='justify-content-center'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? categoryId
                  ? `/category/${categoryId}/page/${x + 1}`
                  : brandId
                  ? `/brand/${brandId}/page/${x + 1}`
                  : keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate