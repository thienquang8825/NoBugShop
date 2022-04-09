import asyncHandler from 'express-async-handler'
import Category from '../models/category.model.js'

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({})

  res.json(categories)
})

export const CategoryController = { getCategories }
