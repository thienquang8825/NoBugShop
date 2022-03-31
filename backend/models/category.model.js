import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

const Cateogry = mongoose.model('Cateogry', categorySchema)

export default Cateogry
