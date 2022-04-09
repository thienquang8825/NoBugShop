import asyncHandler from 'express-async-handler'
import Brand from '../models/brand.model.js'

// @desc    Fetch all brands
// @route   GET /api/brands
// @access  Public
const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({})

  res.json(brands)
})

export const BrandController = { getBrands }
