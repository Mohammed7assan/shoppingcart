import React, { useMemo, useState } from "react";

export default function Memotest() {
  let [count1, setCount1] = useState(0);
  let [count2, setCount2] = useState(0);
 
  function changeCount1() {
    setCount1(count1 + 1);
  }
  function changeCount2() {
    setCount2(count2 + 1);
  }
  

  let detectcounter2 =useMemo(()=>{
    console.log("counter2");
    return count2 % 2 === 0;
  },[count2])
   
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h1>counter {count1}</h1>
          <button onClick={changeCount1}>couner 1</button>
        </div>
        <div className="col-md-6">
          <h1>counter {count2}</h1>
          <button onClick={changeCount2}>couner 1</button>
          <h2>{detectcounter2 ? "even" : "odd"}</h2>
        </div>
      </div>
    </div>
  );
}
