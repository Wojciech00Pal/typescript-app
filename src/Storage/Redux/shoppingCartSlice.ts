import {createSlice} from "@reduxjs/toolkit";
import { shoppingCartModel } from "../../Interfaces";

const initialState : shoppingCartModel = {
    cartItems: [], 
}

export const shoppingCartSlice = createSlice({
    name: "cartItems",
    initialState: initialState,
    reducers:{
        setShoppingCart: (state, action) =>
        {
            state.cartItems = action.payload;
        },

        updateQuantity: (state, action) => {
            // payload = cartItem to update, newquantity
            const cartItems = JSON.stringify(state.cartItems);
            
            state.cartItems = state.cartItems?.map((item)=>{
                if(Reflect.get(item,'id') === action.payload.cartItem.id){
                    item.quantity = action.payload.quantity;
                }
                return item
            });
        },

        removeFromCart: (state, action) => {
            // payload - cartitem to update, newquantity
            //state.cartItems = (state.cartItems || []).filter(item => item.id !== action.payload.cartitem.id);
            state.cartItems = state.cartItems?.filter((item)=>{
                if(Reflect.get(item,'id') === action.payload.cartItem.id){
                  return null;
                }
                return item;
             });
        },
    },
});
    
export const { setShoppingCart, updateQuantity, removeFromCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;