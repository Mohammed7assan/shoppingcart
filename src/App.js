import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Compoenents/Layout.jsx";
import Home from "./Compoenents/Home/Home";
import Product from "./Compoenents/Product/Product";
import Login from "./Compoenents/Login/Login";
import Register from "./Compoenents/Register/Register";
import Notfound from "./Compoenents/Notfound";
import Cart from "./Compoenents/Cart/Cart";
import Details from "./Compoenents/Details/Details";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import { useEffect } from "react";
import ProtectedRouter from "./Compoenents/ProtectedRouter.jsx";
import { CounterContextProvider } from "./Context/CounterStore.js";
import { PizzaContextProvider } from "./Context/PizzaStore.js";
import { CartContextProvider } from "./Context/CartStore.js";
import { Toaster } from "react-hot-toast";
import { ProductContextProvider } from "./Context/ProducStore.js";
import { Provider } from "react-redux";
import { store } from "./Redux/store.js";
import Memotest from "./Compoenents/Memotest.jsx";

export default function App() {
  let [user, setUser] = useState(null);
  function saveCurrentUser() {
    let token = localStorage.getItem("userToken");
    let decoded = jwtDecode(token);
    setUser(decoded);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      saveCurrentUser();
    }
  }, []);
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout data={user} setUser={setUser}></Layout>,
      children: [
        { index: true, element: <Home></Home> },
        { path: "products", element: <Product></Product> },
        { path: "products/:id", element: <Details></Details> },
        {
          path: "cart",
          element: (
            <ProtectedRouter>
              <Cart></Cart>
            </ProtectedRouter>
          ),
        },
        {
          path: "login",
          element: <Login saveCurrentUser={saveCurrentUser}></Login>,
        },
        { path: "register", element: <Register></Register> },
        { path: "memo", element: <Memotest></Memotest> },
        { path: "", element: <Notfound></Notfound> },
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <ProductContextProvider>
        <CartContextProvider>
          <Toaster />
          <PizzaContextProvider>
            <CounterContextProvider>
              <RouterProvider router={routes}></RouterProvider>
            </CounterContextProvider>
          </PizzaContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </Provider>
  );
}
