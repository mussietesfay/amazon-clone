
import { useContext, useEffect } from 'react';
import './App.css';
import Routing from './Router';
import { DataContext } from './components/Dataprovider/Dataprovider';
import {Type} from './Utility/action.type'
import {auth} from './Utility/firebase'
// import Header from './components/Header/Header';
// import Carousel from './components/Carousel/CarouselEffect';
// import Category from './components/Categories/Category';



function App() {
const [{user},dipatch]=useContext(DataContext)
useEffect(()=>{
auth.onAuthStateChanged((authUser)=>{
  if(authUser){
    // console.log(authUser);
    dipatch({
      type:Type.SET_USER,
      user:authUser
    })
  }else{
    dipatch({
      type:Type.SET_USER,
      user:null
    })
  }
})

},[])


  return (
    <>
    <Routing/>
    {/* <Header />
    <Carousel/>
    <Category/> */}
    </>
  );
}

export default App;
