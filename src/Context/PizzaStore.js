import axios from "axios";
import { createContext } from "react";



export const PizzaContext = createContext(null)

export function PizzaContextProvider({children})
{
    async function getPizza()
    {
        let {data} =  await axios.get(`https://forkify-api.herokuapp.com/api/search?q=pizza`)
        return data
    }

    return <PizzaContext.Provider value={{getPizza}}>
       {children}
    </PizzaContext.Provider>
}