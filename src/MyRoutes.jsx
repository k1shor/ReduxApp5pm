import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import ShippingAddress from './pages/ShippingAddress'
import CheckoutForm from './Checkout'
import Payment from './Payment'
import PaymentSuccess from './pages/PaymentSuccess'

const MyRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element = {<Home/>}/>
                <Route path='/product/:id' element = {<ProductDetails/>}/>
                <Route path = 'cart' element = {<Cart/>}/>
                {/* <Route path='checkout' element={<ShippingAddress/>}/> */}
                <Route path='checkout' element={<Payment/>}/>
                <Route path='paymentsuccess' element = {<PaymentSuccess/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default MyRoutes