import express from 'express'
import { UserController } from '../controllers/user.controller.js'
import { AuthMiddleware } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(UserController.registerUser)
  .get(AuthMiddleware.protect, AuthMiddleware.admin, UserController.getUsers)

router.route('/login').post(UserController.authUser)

router
  .route('/profile')
  .get(AuthMiddleware.protect, UserController.getUserProfile)
  .put(AuthMiddleware.protect, UserController.updateUserProfile)

router
  .route('/:id')
  .delete(
    AuthMiddleware.protect,
    AuthMiddleware.admin,
    UserController.deleteUser
  )
  .get(AuthMiddleware.protect, AuthMiddleware.admin, UserController.getUserById)
  .put(AuthMiddleware.protect, AuthMiddleware.admin, UserController.updateUser)

export default router
