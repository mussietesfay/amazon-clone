import React,{useContext,useEffect,useState} from 'react'
import Layout from '../../components/Layout/Layout'
import classes from './orders.module.css';
import { db } from '../../Utility/firebase'
import { DataContext } from '../../components/Dataprovider/Dataprovider'
import Productcard from '../../components/product/Productcard';
function Orders() {

  const [{user},dispatch]=useContext(DataContext)
  const [orders,setorders]= useState([])
   useEffect (()=>{
    if(user){
    db.collection("users").doc(user.uid).collection("orders").orderBy
    ("created","desc").onSnapshot((snapshot)=>{
       console.log(snapshot)

       setorders(
        snapshot.docs.map((doc)=>({
          id:doc.id,
          data:doc.data()
        }))
       )
    })

    }else{
    setorders([])
    }
     
   },[])
  return (
    <Layout> 
      <section className={classes.container}>
        <div className={classes.Orders__container}>
          <h2>Your Orders</h2>
          {
            orders?.length== 0 && <div style={{padding:"20px"}}>
              you don't have orders yet.
            </div>
          }
          {/* ordered items  */}
          <div>
            {
            orders?.map((eachorders,i)=>{
              return(
               <div key={i}>
                <hr/>
                <p>Order ID: {eachorders?.id}</p>
                {
                  eachorders?.data?.basket?.map((order)=>{
                   return( <Productcard
                    felx={true}
                    product={order}
                    key={order.id}
                    
                    />);
                  })
                }
               </div>


              )
            })
            }
          </div>
        </div>
      </section>
    </Layout>
    
  )
}

export default Orders