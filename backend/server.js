import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/mongoose.js'
import morgan from 'morgan'
import colors from 'colors'
import { ErrorMiddleware } from './middleware/error.middleware.js'

import productRoutes from './routes/product.route.js'
import userRoutes from './routes/user.route.js'
import orderRoutes from './routes/order.route.js'

dotenv.config()

connectDB()

const app = express()

//allow to accept JSON data in the body of request
app.use(express.json())

//use morgan (show api in console)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(ErrorMiddleware.notFoundUrl)

app.use(ErrorMiddleware.errorHandle)

const PORT = process.env.PORT || 8888

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
)
