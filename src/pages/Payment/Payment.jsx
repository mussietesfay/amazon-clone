import React,{useContext,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import classes from './payment.module.css'
import { DataContext} from '../../components/Dataprovider/Dataprovider'
import Productcard from '../../components/product/Productcard'
import {useStripe, useElements,CardElement} from '@stripe/react-stripe-js';
import Currencyformat from '../../components/Currencyformat/Currencyformat'
import { axiosInstance } from '../../Api/axios';
import { ClipLoader } from 'react-spinners'
import {db} from '../../Utility/firebase'
import { useNavigate } from 'react-router-dom'
import { Type } from '../../Utility/action.type'

 function Payment() {
  const [{user,basket}, dispatch]=useContext(DataContext);
// console.log(user)
  const totalitem=basket?.reduce((amount,item)=>{
    return item.amount + amount
},0)

const total=basket.reduce((amount,item)=>{
  return item.price * item.amount + amount
},0)

const[cardError, setcardError]=useState(null)
const [processing, setProcessing]=useState(false)

const stripe = useStripe();
const elements = useElements();
const navigate=useNavigate();
  
const handleChange=(e)=>{
  // console.log(e)
  e?.error?.message? setcardError( e?.error?.message):setcardError("")
};  
 
const handlepayment= async(e)=>{
  e.preventDefault();


try {
  setProcessing(true)
  // step-1  bsckend || fuctions ----> contact to client
  const response= await axiosInstance({
    method:"POST",
    url:`/payment/create?total=${total*100}`,
  });
  // console.log(response.data)
  const clientSecret = response.data?.clientSecret;
  
  // step-2  react side confirmation
  const {paymentIntent} = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method:{
        card:elements.getElement(CardElement)
      }
    }
   
  )

// console.log(paymentIntent);
//  step-3 order database save  and clear basket
await db
  .collection("users")
  .doc(user.uid)
  .collection("orders")
  .doc(paymentIntent.id)
  .set({
    basket: basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created,
  });
// empty the basket

dispatch({type:Type.EMPITY_BASKET});

setProcessing(false)
navigate("/orders", {state:{msg:"you have placed new orders"}})
} catch (error) {
  console.log(error)
  setProcessing(false)
  
} 

}











  return (
    <Layout> 
      {/* header */}
      <div className={classes.payment_header}>Checkout ({totalitem}) itmes </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
      <div className={classes.flex}>
     <h3>Delivery Address</h3>
     <div>
      <div>{user?.email}</div>
      <div>123 React St</div>
      <div>San Francisco,CA</div>
     </div>
        </div> 
        <hr/>
        {/* product */}
        <div className={classes.flex}>
        <h3>Review items and delivery</h3>
        <div>
          {
            basket?.map((item,i)=><Productcard product={item} felx={true} key={i}/>)
          }
        </div>
        </div>
        <hr/>
        {/* card form */}
        <div className={classes.flex}>
       <h3>Payment methods</h3>
       <div className={classes.payemnt_card_container}>
        <div className={classes.payment_details}>
          <form onSubmit={handlepayment}>
            {/* erroe */}
            {cardError && <small style={{color:"red"}}>{cardError}</small>}
            {/* card element */}
          <CardElement onChange={handleChange}/>

          {/* price */}
          <div className={classes.payment__price}>
          <div>
        <span style={{display:"flex", gap:"10px"}}> 
          <p>Total Order</p> <Currencyformat amount={total}/>
        </span>
          </div>
          <button type="submit">
            {
               processing?(
                 <div className={classes.loading}>
                  <ClipLoader color='gray' size={12}/>
                  <p>Please Wait...</p>
                 </div>
               ):" Pay Now"
            }
           
          </button>
          </div>
          </form>
        </div>
       </div>
        </div>
      </section>
    </Layout>
    
  )
}

export default Payment