import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import brands from './data/brands.js'
import categories from './data/categories.js'
import products from './data/products.js'
import User from './models/user.model.js'
import Brand from './models/brand.model.js'
import Category from './models/category.model.js'
import Product from './models/product.model.js'
import Order from './models/order.model.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Category.deleteMany()
    await Brand.deleteMany()
    await User.deleteMany()

    const createUsers = await User.insertMany(users)

    const adminUser = createUsers[0]._id

    //insert userId field into all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    await Brand.insertMany(brands)

    await Category.insertMany(categories)

    console.log('Data imported!!!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Category.deleteMany()
    await Brand.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed!!!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
