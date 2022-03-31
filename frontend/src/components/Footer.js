import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='bg-primary text-white'>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; NoBug Shop</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
