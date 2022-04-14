import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ShoppingScreen from './screens/ShoppingScreen'
import CheckoutScreen from './screens/CheckoutScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/page/:pageNumber' element={<ShoppingScreen />} />
          <Route path='/product/:id' element={<ProductScreen />} />
          <Route path='/cart' element={<CartScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/checkout' element={<CheckoutScreen />} />
          <Route path='/placeorder' element={<PlaceOrderScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />

          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route
            path='/admin/productlist/:pageNumber'
            element={<ProductListScreen />}
          />
          <Route
            path='/admin/product/:id/edit'
            element={<ProductEditScreen />}
          />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/search/:keyword' element={<ShoppingScreen />} />
          <Route
            path='/search/:keyword/page/:pageNumber'
            element={<ShoppingScreen />}
          />
          <Route path='/brand/:brandId' element={<ShoppingScreen />} />
          <Route
            path='/brand/:brandId/page/:pageNumber'
            element={<ShoppingScreen />}
          />
          <Route path='/category/:categoryId' element={<ShoppingScreen />} />
          <Route
            path='/category/:categoryId/page/:pageNumber'
            element={<ShoppingScreen />}
          />
          <Route path='/shopping' element={<ShoppingScreen />} />
          <Route
            path='/shopping/page/:pageNumber'
            element={<ShoppingScreen />}
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App
