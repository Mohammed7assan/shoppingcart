import axios from "axios";
import { createContext, useState } from "react";


export const ProductContext = createContext(null)

export function ProductContextProvider({children})
{
    let[myData,setData] = useState({})

    async function getDataFromProductStre(id)
    {
        let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
        setData(data.data)
        return data
    }
    


    return <ProductContext.Provider value={{getDataFromProductStre,myData}}>
        {children}
    </ProductContext.Provider>
}