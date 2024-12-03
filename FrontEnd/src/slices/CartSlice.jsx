import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    products : [],
    totalQuantity: 0,
    totalPrice : 0
}

const CartSlice =createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart(state, action){
            const newItem = action.payload;
            const itemIndex = state.products.find((item) => item.id === newItem.id)
            if(itemIndex){
                itemIndex.quantity++;
                itemIndex.totalPrice += newItem.price
                console.log(itemIndex.totalPrice)
            }
            else{
                state.products.push({
                    id: newItem.id,
                    name: newItem.name,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    image: newItem.image

                })
            }
            state.totalPrice += newItem.price;
            state.totalQuantity++;
        },
        removeFromCart(state, action){
            const id = action.payload;
            const findItem = state.products.find((item) => item.id === id)
            if(findItem){
                state.totalPrice -= findItem.totalPrice
                state.totalQuantity -= findItem.quantity
                state.products = state.products.filter(item => item.id !== id)

            }
        }
        },
})

export const {addToCart, removeFromCart} = CartSlice.actions;
export default CartSlice.reducer;