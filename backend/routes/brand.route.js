import express from 'express'
import { BrandController } from '../controllers/brand.controller.js'

const router = express.Router()

router.get('/', BrandController.getBrands)

export default router
