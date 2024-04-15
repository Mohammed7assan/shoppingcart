import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const [err, setError] = useState("");

  const navigate =   useNavigate()
  const schema = Yup.object({
    name: Yup.string()
      .required("name is required")
      .min(3, "min is 3")
      .max(5, "max is 5 char"),
    email: Yup.string().required("email is required").email("not valid"),
    password: Yup.string()
      .required("pass is req")
      .matches(/^[A-Z][a-z]{3,10}@[0-9]{2,5}$/),
    rePassword: Yup.string()
      .required("repassword is required")
      .oneOf([Yup.ref("password")], "not match password"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(02)?(01)[0-25][0-9]{8}$/, "not valid number"),
  });

  async function submitRegister(values) {
    try {
      const { data } = await axios.post(
        `https://route-ecommerce.onrender.com/api/v1/auth/signup`,
        values
      );
      if (data.message === "success") {
        //login
        navigate('/login')
        setError("");
      }
    } catch (error) {
      setError(
        error.response.data.errors.param + ": " + error.response.data.errors.msg
      );
    }
  }

 

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: schema,
    onSubmit: submitRegister,
  });

  return (
    <form className="my-5" onSubmit={formik.handleSubmit}>
      <label htmlFor="name">name:</label>
      <input
        type="text"
        className="form-control my-2"
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />

      {formik.errors.name ? (
        <p className="alert alert-danger">{formik.errors.name}</p>
      ) : (
        ""
      )}
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
      <label htmlFor="name">rePassword:</label>
      <input
        type="password"
        value={formik.values.rePassword}
        name="rePassword"
        onChange={formik.handleChange}
        className="form-control my-2"
      />
      {formik.errors.rePassword ? (
        <p className="alert alert-danger">{formik.errors.rePassword}</p>
      ) : (
        ""
      )}
      <label htmlFor="name">phone:</label>
      <input
        type="text"
        className="form-control"
        value={formik.values.phone}
        name="phone"
        onChange={formik.handleChange}
      />
      {formik.errors.phone ? (
        <p className="alert alert-danger">{formik.errors.phone}</p>
      ) : (
        ""
      )}
      <button type="submit" className="btn btn-success my-2">
        Register
      </button>
    </form>
  );
}
