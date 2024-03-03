import React, { useState,useContext } from 'react'
import {Link, useNavigate,useLocation} from 'react-router-dom'
import classes from './singup.module.css'
import {auth} from '../../Utility/firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {ClipLoader} from 'react-spinners'
import {DataContext} from '../../components/Dataprovider/Dataprovider'
import { Type } from '../../Utility/action.type'

function Auth() {
  const [email, setEmail]=useState("");
  const [password, setPassword]=useState("");
  const [error, setError]=useState("");
  const [loading,setloading]=useState({
    signIn:false,
    signUp:false
  })
  const[{user},dispatch]=useContext(DataContext)
const navigate=useNavigate()
const navStateData=useLocation()
//  console.log(navStateData)


//  console.log(user)

const authHandler= async (e)=>{
  e.preventDefault()
  // console.log(e.target.name)
  if(e.target.name ==="signIn"){
// firebase auth
setloading({...loading, signIn:true})
signInWithEmailAndPassword(auth,email,password)
.then((userinfo)=>{
  // console.log(userinfo)
 
  dispatch({
    type:Type.SET_USER,
    user:userinfo.user
  });
    
  setloading({...loading, signIn:false})
  navigate(navStateData?.state?.
    redirect
    || "/");
}).catch((err)=>{
  setError(err.message)
  setloading({...loading, signIn:false})
})

  }else{
  setloading({...loading, signUp:true})
 createUserWithEmailAndPassword(auth,email,password)
.then((userinfo)=>{
 
  dispatch({
    type:Type.SET_USER,
    user:userinfo.user
  });
  setloading({...loading, signUp:false})
  navigate(navStateData?.state?.
    redirect
    || "/");
}).catch((err)=>{
  setError(err.message)
  setloading({...loading, signUp:false})
})

  }
};


  // console.log(password,email)
  return (
      <section className={classes.login}>
{/* logo */}
<Link to={'/'}>
<img src='https://pngimg.com/uploads/amazon/amazon_PNG3.png' alt='amazon logo'/>
</Link>
{/* form */}
<div className={classes.login_container}>
<h1>Sign In</h1>
{navStateData?.state?.msg && (
 <small 
 style={{
  padding:"5px",
  textAlign:"center",
  color:"red",
  fontWeight:"bold"
 }}
 >
{navStateData?.state?.msg}
 </small> 
)
}
<form action="">

<div>
  <label htmlFor="email">Email</label>
  <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email'/>
</div>

<div>
  <label htmlFor="password">Password</label>
  <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id='password'/>
</div>
<button name='signIn' type='submit' onClick={authHandler} className={classes.login_signinbutton}> {
   loading.signIn ? <ClipLoader color='#000' size={15}/>:(
    'Sign In'
    )
}
</button>
</form>
 
 {/* agreement */}
 <p>
  By signing-in you agree to the AMAZON FAKE CLONE Conditions of use & sale.Please see our Privacy,Our Cookies Notice and our Interset-Based Ads Notice.
 </p>
{/* create account btn */}
<button name='signUp' type='submit' onClick={authHandler} className={classes.login_registerbutton}>
{
   loading.signUp ? <ClipLoader color='#000' size={15}/>:(
    'Create your Amazon Account'
    )
}
  </button>
{
  error && <small style={{padding:"5px" , color:"red"}}>{error}</small>
}
</div>
      </section>
    
    
  )
}

export default Auth