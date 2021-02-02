const initialState={
    cart:{}
}

 

    export default function RootReducer(state=initialState , action){

    switch(action.type)
    {
        case 'Add Cart' :
          state.cart[action.payload[0]] = action.payload[1]
          console.log("CART Is Hear:- ",state.cart)
          return {cart:state.cart} 
        
          case 'Remove_item':
              delete state.cart[action.payload[0]]

              return {cart :state.cart}         ////   No need to use breake; after return ///
         default:
             return state
    }
}






