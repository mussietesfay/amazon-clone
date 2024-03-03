import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Productcard from './Productcard'
import classes from './product.module.css'
// import Loader from '../Loader/Loader'
function Product() {
const [products,setproducts]=useState([])
const [isloading,setisloading]=useState(false)
useEffect(()=>{
  setisloading(true)
axios.get('https://fakestoreapi.com/products')
.then((res)=>{
   setproducts(res.data)
  //  console.log(res.data)
   setisloading (false)
}).catch((err)=>{
    console.log(err)
    setisloading(false)
})

},[])

  return (
    
    
     <section className={classes.product_container}>
      {
      products?.map((singleproduct)=>{
         return <Productcard  renderadd={true} product={singleproduct} key={singleproduct.id}/>
        })  
      }
       </section>
    
    
    
    
    
  )
}

export default Product