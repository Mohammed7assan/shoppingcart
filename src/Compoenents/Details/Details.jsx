import React from 'react'
import  axios  from 'axios';
import { useEffect, useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from './../../Context/CartStore';
import toast from 'react-hot-toast';
import { ProductContext } from '../../Context/ProducStore.js';
export default function Details() {
const {addToCart} = useContext(CartContext)

let { id } = useParams();

let {getDataFromProductStre,myData} = useContext(ProductContext)

 useEffect(()=>{
  getDataFromProductStre(id)
 },[])

//add to cart

async function addToCartFun(id) { 
 let res =  await addToCart(id)
 if(res.status === 'success')
 toast.success(res.message);
}


  return (
    <>
    <div className="row align-items-center">
        <div className="col-md-3">
            <img src={myData?.imageCover} className="w-100" alt="" />
        </div>
        <div className="col-md-9">
            <p>{myData?.title}</p>
            <p className='text-muted'>{myData?.description}</p>
            <b>{myData?.price} EG</b>
           
             <button className='btn btn-success form-control my-4' onClick={()=>{addToCartFun(myData._id)}}>+Add</button>
        </div>
    </div>
    </>
  )
}
