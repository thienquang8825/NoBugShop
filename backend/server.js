import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.route('/').get((req, res) => {
  res.send('API is running...')
})

app.route('/api/products').get((req, res) => {
  res.json(products)
})

app.route('/api/products/:id').get((req, res) => {
  const product = products.find((p) => p._id == req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 8888

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
