import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
// import classes from './productdetails.module.css';
import {useParams} from 'react-router-dom'
import { productUrl } from '../../Api/endpoints'
import Productcard from '../../components/product/Productcard'
import Loader from '../../components/Loader/Loader'

function Productdetails() {
  const {productid} = useParams()
  const [product,setproduct]=useState({})
  const [isloading, setisloading]=useState(false)
  useEffect (()=>{
    setisloading(true)
    axios.get(`${productUrl}/products/${productid}`)
    .then((res)=>{
      setproduct(res.data);
      // console.log(res.data)
      setisloading(false)
    }).catch((err)=>{
      console.log(err)
      setisloading(false)
    })

  },[])
  return (
    <Layout>
      
      <Productcard 
        product={product}
        felx={true}
        renderdesc={true}
        renderadd={true}
        />
     
      
      
      
      
    </Layout>
    
    
  )
}

export default Productdetails