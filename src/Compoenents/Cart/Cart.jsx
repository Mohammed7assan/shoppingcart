import React, { useContext, useEffect, useState } from "react";
import { CounterContext } from "../../Context/CounterStore.js";
import { CartContext } from "../../Context/CartStore.js";
import { ProductContext } from "../../Context/ProducStore.js";
import { toast } from "react-hot-toast";
import Loading from "../Loading.jsx";
import { useDispatch } from "react-redux";
import { addToCart, getFromCart } from "../../Redux/cartSlice.js";

export default function Cart() {
  const { count, name } = useContext(CounterContext);
  const { getData, updateCount ,deleteItem} = useContext(CartContext);

    let dispatch=useDispatch()
  const { getDataFromProductStre } = useContext(ProductContext);
  const [cartDetails, setCartDeatils] = useState({});
  const [products, setProduct] = useState([]);

  async function getDataFun() {
    let res = await getData();
    if (res.status === "success") {
      setProduct(res.data.products);
      setCartDeatils(res);
    }
  }
  async function deleteItemFun(id) {
    let res = await deleteItem(id);
    if (res.status === "success") {
      setProduct(res.data.products);
      setCartDeatils(res);
    }
  }

  async function updateCountFun(e, id) {
    let res = await getDataFromProductStre(id);
    if (res.data.quantity > Number(e.target.value)) finalEdit();
    else toast.success("not available");

    async function finalEdit() {
      let res = await updateCount(e.target.value, id);
      if (res.status === "success") {
        setProduct(res.data.products);
        setCartDeatils(res);
      }
    }
  }

  async function addTocartFun(id)
  {
   let res = await dispatch(addToCart(id))
   console.log(res);
  }
  async function getFromCartFun()
  {
   let res = await dispatch(getFromCart())
   console.log(res);
  }

  useEffect(() => {
    getDataFun();
    getFromCartFun()
  }, []);

  return (
    <div>
      <h2>Cart</h2>
      <button className="btn btn-success" onClick={()=>{addTocartFun('6428eb43dc1175abc65ca0b3')}}>addtocart dispatch</button>
      <h3>
        {" "}
        cart Items has{" "}
        <span className="text-danger">{cartDetails.numOfCartItems}</span>
      </h3>
      <div className="row">
        {products.length > 0
          ? products.map((ele, index) => (
              <div className="col-md-3" key={index}>
                <img src={ele.product.imageCover} className="w-100" alt="" />
                <p>{ele.product.title}</p>
                <div className="box d-flex align-items-center justify-content-between">
                  <p>count:{ele.count}</p>
                  <select
                    name=""
                    id=""
                    onChange={(e) => {
                      updateCountFun(e, ele.product._id);
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="30000">30000</option>
                  </select>
                </div>
                <p>{ele.price} Eg</p>
                <button className="btn btn-danger" onClick={()=>{deleteItemFun(ele.product._id)}}>remove</button>
              </div>
            ))
          : <Loading></Loading>}
      </div>

      <h1>
        total price{" "}
        <p className="text-denger">{cartDetails.data?.totalCartPrice} </p>
      </h1>
    </div>
  );
}
