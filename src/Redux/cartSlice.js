import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { cart: {}, data: [] };
let token = localStorage.getItem("userToken");

export let addToCart = createAsyncThunk("cart/add", async (id) => {
  let { data } = await axios.post(
    `https://route-ecommerce-app.vercel.app/api/v1/cart`,
    {
      productId: id,
    },
    {
      headers: {
        token,
      },
    }
  );

  return data;
});
export let getFromCart = createAsyncThunk("cart/get", async () => {
  let { data } = await axios.get(
    `https://route-ecommerce-app.vercel.app/api/v1/cart`,
    {
      headers: {
        token,
      },
    }
  );

  return data.data;
});

let cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (bulider) => {
    bulider.addCase(addToCart.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
    bulider.addCase(getFromCart.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export let cartReducer = cartSlice.reducer;
