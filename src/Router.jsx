import React from 'react'
import { BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Auth from './pages/Auth/Auth'
import Payment from './pages/Payment/Payment'
import Orders from './pages/Orders/Orders'
import Cart from './pages/Cart/Cart'
import Results from './pages/Results/Results'
import Productdetails from './pages/Productdetails/Productdetails'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
const stripePromise = loadStripe('pk_test_51OmKCqL7FsYcSqtlWpCc1gCP4AYYkkfVYZWDAbXrF7DPe7jLKzSmjAF776v235DlsALCzC1KpdCegXEWn7GlPKRU00U4x7p4o7');

function Routing() {
  return (
    <Router>
     <Routes>
        <Route path='/' element={< Landing/>}/>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/payments' element={
          <ProtectedRoute msg={"you must log in to pay"} redirect={"/payments"}>
         <Elements stripe={stripePromise}>
          <Payment />
          </Elements>
          </ProtectedRoute>
          
          }/>
        <Route path='/orders' element={
        <ProtectedRoute 
        msg={"you must log in to see your orders "} 
        redirect={"/orders"}>
         <Orders/>

        </ProtectedRoute>
        
        
        
        }/>
        <Route path='/category/:categoryName' element={< Results />}/>
        <Route path='/products/:productid' element={<Productdetails/>}/>
        <Route path='/carts' element={<Cart/>}/>
     </Routes>
    </Router>
  )
}

export default Routing