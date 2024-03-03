import React, { useContext } from 'react'
// import Rating from '@mui/material/Rating'
import Currencyformat from '../Currencyformat/Currencyformat'
import classes from './product.module.css'
import {Link} from 'react-router-dom'
import { DataContext } from '../Dataprovider/Dataprovider'
import {Type} from '../../Utility/action.type'

function Productcard({product ,felx,  renderdesc,renderadd}) {
  // console.log(product)
  const { image,title,id,rating,price,description}=product;

  const [state,dispatch]=useContext(DataContext)
  // console.log(state)
  const addToCart=()=>{
   dispatch({
      type:Type.ADD_TO_BASKET,
      item:{
        image,title,id,rating,price,description
      }
   })
  }


  return (
    <div className={`${classes.card_container} ${felx?classes.product_flexed:''}`}>
    <Link to={`/products/${id}`}>
    <img src={image} alt=''/>
    </Link>
    <div>
         <h3>{ title}</h3>
         { renderdesc && <div style={{maxWidth:'750px'}}>{description}</div>}
         <div className={classes.rating}>
        
            {/* rating */}
            {/* <Rating value={rating.rate} precision={0.1}/> */}
            
            {/* count */}
            {/* <small>{rating.count}</small> */}
         </div>
         <div>
            {/* price */}
            <Currencyformat amount={price}/>

            
         </div>
         {
          renderadd && <button className={classes.button} onClick={addToCart}> Add to cart</button>
         }
         
    </div>
    </div>
  )
}

export default Productcard