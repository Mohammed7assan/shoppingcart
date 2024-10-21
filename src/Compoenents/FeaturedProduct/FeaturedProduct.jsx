import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/featuredProductHook.js";

export default function FeaturedProduct() {
 let allProduct = useProduct(`https://ecommerce.routemisr.com/api/v1/products`)
  return (
    <div>
      <h4 className="my-5">FeaturedProduct</h4>
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
    </div>
  );
}
