import axios from "axios";
import { useEffect, useState } from "react";


export function useProduct(url)
{
    let [allProduct, setProduct] = useState([]);
 

    useEffect(() => {
      getData();
    }, []);
  
    async function getData() {
      let { data } = await axios.get(url);
      console.log(data.data);
      setProduct(data.data);
    }
  
    return allProduct
}