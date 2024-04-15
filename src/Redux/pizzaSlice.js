import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {pizzaArr:[],pastaArr:[]}


export let getPizza =createAsyncThunk('pizza/getPizaa',async ()=>{
   let {data} =  await axios.get(`https://forkify-api.herokuapp.com/api/search?q=pizza`)
   return data
})
export let getPasta =createAsyncThunk('pasta/getPasta',async ()=>{
   let {data} =  await axios.get(`https://forkify-api.herokuapp.com/api/search?q=pasta`)
   return data
})


 let pizzaSlice = createSlice({
    name:"pizza",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
     builder.addCase(getPizza.fulfilled,(state,action)=>{
        state.pizzaArr = action.payload
     })
     builder.addCase(getPasta.fulfilled,(state,action)=>{
        state.pastaArr = action.payload
     })
    }
    
})

export let pizzaReducer  = pizzaSlice.reducer