import { createSlice } from "@reduxjs/toolkit";



let initialState  ={counter:0}
let counterSlice =createSlice({
    name:'ay7aga',
    initialState,
    reducers:{
        increase:(state,action)=>{
            console.log(action);
            state.counter+=1
        },
        decrease:(state,action)=>{
            console.log(action);
            state.counter-=1
        },
        increaseByAmout:(state,action)=>{
             state.counter+=action.payload
        }
    }
})


 export let counterReducer=counterSlice.reducer

 export let { increase,increaseByAmout,decrease } = counterSlice.actions