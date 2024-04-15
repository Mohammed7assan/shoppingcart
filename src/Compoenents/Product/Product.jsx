import React, { useContext } from "react";
import { CounterContext } from "../../Context/CounterStore.js";
import { PizzaContext } from "../../Context/PizzaStore.js";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrease,
  increase,
  increaseByAmout,
} from "../../Redux/counterSlice.js";
import { getPasta, getPizza } from "./../../Redux/pizzaSlice";
import { Helmet } from "react-helmet";
import { useProduct } from "../../hooks/featuredProductHook.js";
import { Link } from "react-router-dom";
export default function Product() {
  let counter = useSelector((state) => state.counter.counter);

  let dispatch = useDispatch();
  const { count, name } = useContext(CounterContext);
  const [arr, setArr] = useState([]);
  const [arr2, setArr2] = useState([]);
  let allProduct = useProduct(`https://route-ecommerce.onrender.com/api/v1/products`)
  //  const {getPizza} =  useContext(PizzaContext)

  //  async function  getPizzaFun() {
  //   let {recipes} = await getPizza()
  //   setArr(recipes)
  //  }

  useEffect(() => {
    getPizzaFun();
    getPastaFun();
  }, []);

  async function getPizzaFun() {
    let res = await dispatch(getPizza());
    setArr(res.payload.recipes);
  }
  async function getPastaFun() {
    let res = await dispatch(getPasta());
    setArr2(res.payload.recipes);
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>products</title>
      </Helmet>
     <div className="row">
     {allProduct.map((ele) => (
          <div className="col-md-2" key={ele._id}>
            <Link to={`products/${ele.id}`}>
              {" "}
              <img src={ele.imageCover} className="w-100" alt="" />
            </Link>
            <p className="text-mainColor fw-bold">{ele.category.name}</p>
            <p>{ele.title.split(" ").slice(0, 2).join(" ")}</p>
            <div className="box d-flex justify-content-between">
              <span>{ele.price} EGP</span>
              <span>
                {ele.ratingsAverage}{" "}
                <i className="fas fa-star text-warning"></i>
              </span>
            </div>
          </div>
        ))}
     </div>
      Product
      <h1>counter {counter}</h1>
      <button
        onClick={() => {
          dispatch(increase());
        }}
      >
        incresae
      </button>
      <button
        onClick={() => {
          dispatch(decrease());
        }}
      ></button>
      <button
        onClick={() => {
          dispatch(increaseByAmout(10));
        }}
      >
        incrasByamout
      </button>
      <p>{count}</p>
      <p>{name}</p>
      {/* <button onClick={increase}></button> */}
      <div className="row">
        {arr2.length > 0
          ? arr2.map((ele, index) => (
              <div key={index} className="col-md-3">
                <p>{ele.title}</p>
              </div>
            ))
          : "loading!"}
      </div>
    </div>
  );
}
