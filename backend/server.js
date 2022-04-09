import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/mongoose.js'
import morgan from 'morgan'
import path from 'path'
import colors from 'colors'
import { ErrorMiddleware } from './middleware/error.middleware.js'

import brandRoutes from './routes/brand.route.js'
import categoryRoutes from './routes/category.route.js'
import productRoutes from './routes/product.route.js'
import userRoutes from './routes/user.route.js'
import orderRoutes from './routes/order.route.js'
import uploadRoutes from './routes/upload.route.js'

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

app.use('/api/brands', brandRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

//uploads folder is not going to be accessible by deafult
//need to point to that this is a static folder, in order to accessable
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(ErrorMiddleware.notFoundUrl)
app.use(ErrorMiddleware.errorHandle)

const PORT = process.env.PORT || 8888

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
)
