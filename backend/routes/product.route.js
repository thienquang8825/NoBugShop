import express from 'express'
import { ProductController } from '../controllers/product.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .get(ProductController.getProducts)
  .post(
    AuthMiddleware.protect,
    AuthMiddleware.admin,
    ProductController.createProduct
  )

router
  .route('/:id')
  .get(ProductController.getProductById)
  .put(
    AuthMiddleware.protect,
    AuthMiddleware.admin,
    ProductController.updateProduct
  )
  .delete(
    AuthMiddleware.protect,
    AuthMiddleware.admin,
    ProductController.deleteProduct
  )

export default router
