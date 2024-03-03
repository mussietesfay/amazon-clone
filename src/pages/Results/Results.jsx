import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endpoints'
import classes from './results.module.css';
import Productcard from '../../components/product/Productcard'

function Results() {
  const[results,setresults]=useState([])
  const {categoryName}=useParams()
  // console.log(categoryName)
  useEffect(()=>{
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((res)=>{
      setresults(res.data)
      console.log(res.data)
     
    }).catch((err)=>{
      console.log(err)
    })

  },[])
  
  
  return (

    <Layout >
      
      <section>
        <h1 style={{padding: "30px"}}>Results</h1>
        <p style={{padding: "30px"}}>Category/ {categoryName}</p>
         <hr/>
         <div  className={classes.products_container}>
         {
          results?.map((product)=>(
            <Productcard
            key={product.id}
            product={product}
            renderadd={true}

            />
          ))
         }
         </div>

      </section>
     
    </ Layout >
    
  )
}

export default Results