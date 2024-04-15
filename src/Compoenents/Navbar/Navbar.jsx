import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../finalProject assets/finalProject assets/freshcart-logo.svg";

import { CartContext } from './../../Context/CartStore';
export default function Navbar({ data ,logout}) {
   let {getData} = useContext(CartContext)
   const [cartDetails, setCartDeatils] = useState({});
   async function getDataFun() {
    let res = await getData();
    if (res.status === "success") {
      setCartDeatils(res);
    }
  }

  useEffect(()=>{getDataFun()},[cartDetails])
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="products">
                products
              </Link>
            </li>
            {data ? (
              <li className="nav-item">
                <Link className="nav-link d-flex" to="cart">
                  <p>cart </p>
                  <p><i class="fa-solid fa-cart-shopping text-success position-relative"></i>
                  <span className="position-absolute top-0 start-25"></span>  
                  {cartDetails.numOfCartItems}
                  </p>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                <i className="fab fa-google"></i>
              </a>
            </li>
            {data ? (
              <li className="nav-item">
                <p className="nav-link" onClick={logout}>LogOut</p>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
