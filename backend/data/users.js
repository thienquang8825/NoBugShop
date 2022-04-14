import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Quang',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Kana Momonogi',
    email: 'kana@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Akari Tsumugi',
    email: 'akari@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
