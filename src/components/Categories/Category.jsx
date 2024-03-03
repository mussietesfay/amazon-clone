import React from 'react'
import {categoryinfos} from "./Categoryfullinfo"
import Categorycard from './Categorycard'
import classes from "./category.module.css"

function Category() {
  return (
    <section className={classes.category_container}>
  {
    categoryinfos.map((infos)=>{
        return <Categorycard data={infos} key={infos.id}/>
    })
  }

    </section>
    
  )
}


export default Category