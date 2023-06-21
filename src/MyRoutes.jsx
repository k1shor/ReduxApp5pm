import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import ShippingAddress from './pages/ShippingAddress'

const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element = {<Home/>}/>
                <Route path='/product/:id' element = {<ProductDetails/>}/>
                <Route path = 'cart' element = {<Cart/>}/>
                <Route path='checkout' element={<ShippingAddress/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes