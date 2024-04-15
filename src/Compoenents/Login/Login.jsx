import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Login({saveCurrentUser}) {

  const [err, setError] = useState("");

  const navigate =   useNavigate()
  const schema = Yup.object({
  
    email: Yup.string().required("email is required").email("not valid"),
    password: Yup.string()
      .required("pass is req")
      .matches(/^[A-Z][a-z]{3,10}@[0-9]{2,5}$/),
   
  });

  async function submitLogin(values) {
    try {
      const { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/auth/signin`,
        values
      );
      if (data.message === "success") {
        //login
        localStorage.setItem('userToken',data.token)
        saveCurrentUser()
        navigate('/cart')
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError(
        error.response.data.message
      );
    }
  }

 

  const formik = useFormik({
    initialValues: {
      
      email: "",
      password: "",
     
    },
    validationSchema: schema,
    onSubmit: submitLogin,
  });

  return (
    <form className="my-5" onSubmit={formik.handleSubmit}>
     
      <label htmlFor="name">email:</label>
      <input
        type="text"
        value={formik.values.email}
        name="email"
        onChange={formik.handleChange}
        className="form-control my-2"
        onBlur={formik.handleBlur}
      />

      {formik.errors.email ? (
        <p className="alert alert-danger">{formik.errors.email}</p>
      ) : (
        ""
      )}
      {err ? <p className="alert alert-danger">{err}</p> : ""}
      <label htmlFor="name">password:</label>
      <input
        type="password"
        value={formik.values.password}
        name="password"
        onChange={formik.handleChange}
        className="form-control my-2"
      />
      {formik.errors.password ? (
        <p className="alert alert-danger">{formik.errors.password}</p>
      ) : (
        ""
      )}
      
      <button type="submit" className="btn btn-success my-2">
        Login
      </button>
    </form>
  );
}
