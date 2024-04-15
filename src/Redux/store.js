import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice.js";
import { pizzaReducer } from "./pizzaSlice.js";
import { cartReducer } from "./cartSlice.js";


export let store =configureStore({
    reducer:{
      counter : counterReducer,
      pizza:pizzaReducer,
      cart:cartReducer
    }
})