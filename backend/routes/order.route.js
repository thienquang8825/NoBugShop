import express from 'express'
import { AuthMiddleware } from '../middleware/auth.middleware.js'
import { OrderController } from '../controllers/order.controller.js'

const router = express.Router()

router.route('/').post(AuthMiddleware.protect, OrderController.createNewOrder)

export default router
