import {Type} from './action.type'

export const initialState={
    basket:[],
    user:null

}
 

export const reducer=(state,action)=>{
    switch (action.type) {
        case Type.ADD_TO_BASKET:
            //  check if the item exists
const existingitem=state.basket.find((item)=>item.id===action.item.id)
     if(!existingitem){
        return {
          ...state,
          basket:[...state.basket,{...action.item, amount:1}]
        }
    }else{
        const updatedbasket=state.basket.map((item)=>{
           return item.id===action.item.id? {...item,amount:item.amount+1} :item
        })
        return {
            ...state,
            basket:updatedbasket
        }
    }
    case Type.REMOVE_FROM_BASKET:
        const index=state.basket.findIndex(item=> item.id===action.id)
        let newbasket=[...state.basket]
if(index>=0){
    if(newbasket[index].amount>1){
        newbasket[index]={...newbasket[index],amount:newbasket[index].amount-1}
    }else{
        newbasket.splice(index,1)
    }
}
return {
    ...state,
    basket:newbasket
}
 case Type.EMPITY_BASKET:
    return{
       ...state,
       basket:[]

    }


case Type.SET_USER:
    return{
    ...state,
    user:action.user,
    }
        default:
            return state;
            
    }

}





// const [satet, dispatch]=useReducer(Reducer,initialState)