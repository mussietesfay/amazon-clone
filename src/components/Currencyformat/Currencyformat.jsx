import React from "react";
import numeral from 'numeral'

const Currencyformat=({amount})=>{
    const formatamaount=numeral(amount).format ('$0,0.00')
    return <div> {formatamaount}</div>
}
export default Currencyformat