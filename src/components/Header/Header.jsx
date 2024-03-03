import React,{useContext} from 'react'
import { BsCart2 } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import classes from "./Header.module.css"
import Lowerheader from './Lowerheader';
import {Link} from 'react-router-dom'
// import { useContext } from 'react';
import { DataContext } from '../Dataprovider/Dataprovider';
import {auth} from '../../Utility/firebase'


function Header() {
  
    const [{user,basket},dispatch]=useContext(DataContext)
    const totalitem=basket?.reduce((amount,item)=>{
        return item.amount + amount
    },0)


  return (
    <section className={ classes.fexed}>
   <section> 
    <div className={classes.header_container}>
        <div className={classes.logo_container}>
            {/* logo */}
            <Link to='/'> 
            <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt='amazon-logo'/>
            </Link>
            
            {/* delivery */}
            <div className={classes.delivery}>
            <span>
                {/* icon */}
                <IoLocationOutline />
            </span>
            <div>
                <p> Deliver to</p>
                <span>United State</span>
            </div>
            </div>
        </div>
    {/* search */}
    
        <div className={classes.search}> 
            <select name="" id="">
                <option value="">All</option>
            </select>
            <input type="text" name='' id='' placeholder='search product' />
            {/* icon */}
            <IoMdSearch size={38} />
        </div>

        <div className={classes.order_container}>
            <Link to='' className={classes.language}>
               <img src='https://pngimg.com/uploads/flags/flags_PNG14655.png' alt='' />
               <select>
                <option value="">EN</option>
               </select>
            </Link>
            {/* three componenet */}
            <Link to={!user && '/auth'}> 
              <div>
                {
                    user?(
                    <>
                   <p>Hello {user.email?.split('@')[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                   </>
                    ):
                    (
                    <>
                        <p> Hello,Sign In</p>
                        <span> Account & Lists</span>
                        </>
                    )}
             
              </div>
                
           
            </Link>
            {/* order */}
            <Link to='/orders'>
                <p>returns</p>
                <span>& orders</span>
            </Link>
            {/* cart */}
            <Link  to="/carts" className={classes.cart}>
                 {/* icon */}
                 <BsCart2 size={35} />
            <span>{totalitem}</span> 
            </Link>
           
        </div>
    </div>
   </section>
  <Lowerheader/>
   </section>
  )
}

export default Header