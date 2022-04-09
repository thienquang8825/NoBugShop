import express from 'express'
import { AuthMiddleware } from '../middleware/auth.middleware.js'
import { OrderController } from '../controllers/order.controller.js'

const router = express.Router()

router
  .route('/')
  .post(AuthMiddleware.protect, OrderController.create)
  .get(AuthMiddleware.protect, AuthMiddleware.admin, OrderController.getOrders)

router
  .route('/myorders')
  .get(AuthMiddleware.protect, OrderController.getMyOrders)

router.route('/:id').get(AuthMiddleware.protect, OrderController.getOrderById)

router.route('/:id/pay').put(AuthMiddleware.protect, OrderController.updatePaid)

router
  .route('/:id/deliver')
  .put(
    AuthMiddleware.protect,
    AuthMiddleware.admin,
    OrderController.updateDelivered
  )

export default router
