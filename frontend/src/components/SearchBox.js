import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const searchHandler = (e) => {
    //prevent situation when input press enter will reload page
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  const onKeyPressHandler = (e) => {
    if (e.key === 'Enter') {
      searchHandler(e)
    }
  }

  return (
    <div className='col-lg-6 col-6 text-left'>
      <form action=''>
        <div className='input-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Tìm kiếm sản phẩm'
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={onKeyPressHandler}
          />
          <div className='input-group-append' onClick={searchHandler}>
            <span className='input-group-text bg-transparent text-primary'>
              <i className='fa fa-search'></i>
            </span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SearchBox
