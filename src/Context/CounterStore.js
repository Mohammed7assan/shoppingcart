import { createContext, useState } from "react";

export const CounterContext = createContext(0)

export function CounterContextProvider({children})
{
 
    const [count,setCount] =  useState(0)
    const [name] =  useState("ali")
   
    function increase()
    {
        setCount(count+1)
    }

    return <CounterContext.Provider value={{count,name,increase}}>
           {children}
    </CounterContext.Provider>
}
