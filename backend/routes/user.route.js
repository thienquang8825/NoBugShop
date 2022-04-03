import express from 'express'
import { UserController } from '../controllers/user.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router.route('/').post(UserController.registerUser)

router.route('/login').post(UserController.authUser)

router
  .route('/profile')
  .get(AuthMiddleware.protect, UserController.getUserProfile)

export default router
