import axios from "axios";
import { createContext, useContext } from "react";
import { ProductContext } from "./ProducStore.js";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
   
  let {getDataFromProductStre}  = useContext(ProductContext)  
  let baseUrl = "https://route-ecommerce-app.vercel.app/api/v1/";
  let token = localStorage.getItem("userToken");
  //add pro to cart

  async function addToCart(productId) {
    try {
      let dataObj = {
        productId: productId,
      };
      const { data } = await axios.post(`${baseUrl}cart`, dataObj, {
        headers: { token },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }



  //get data from cart

  async function getData() {
    try {
     
      const { data } = await axios.get(`${baseUrl}cart`, {
        headers: { token },
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  } 


  //update count

  async function updateCount(count,id) { 
        try {
            let dataObj = {
              count,
            };
            const { data } = await axios.put(`${baseUrl}cart/${id}`, dataObj, {
              headers: { token },
            });
            return data;
          } catch (error) {
            console.log(error);
          }

  }

  //delete

  async function deleteItem(id) { 
    try {
       
        const { data } = await axios.delete(`${baseUrl}cart/${id}`, {
          headers: { token },
        });
        return data;
      } catch (error) {
        console.log(error);
      }

}
  return (
    <CartContext.Provider value={{ addToCart ,getData,updateCount,deleteItem}}>
      {children}
    </CartContext.Provider>
  );
}
