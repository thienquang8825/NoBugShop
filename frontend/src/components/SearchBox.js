import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex ms-auto'>
      <Form.Control
        type='text'
        name='searchBox'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Tìm kiếm...'
      ></Form.Control>
      <Button type='submit' variant='secondary' className='p-2 ms-1'>
        <i className='fas fa-search'></i>
      </Button>
    </Form>
  )
}

export default SearchBox
