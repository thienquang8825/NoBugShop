import express from 'express'
import { ProductController } from '../controllers/product.controller.js'

const router = express.Router()

router.route('/').get(ProductController.getProducts)

router.route('/:id').get(ProductController.getProductById)

export default router
