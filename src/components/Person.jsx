import React, { useState } from "react";
import Details from "./Details";

export default function Person(input) {
    const [hideDetails, setHideDetails ]= useState(true);
    return(
        <>
        <button key={input.data.id} className="personButton" onClick={()=>setHideDetails(hideDetails?false:true)}>
            <span>{input.data.id}</span>
            <span>{input.data.Name}</span>
           
        </button>

        {!hideDetails?<div className="details">
                {<Details input={input.data} value={input.data }handlePersons = {input.handlePersons.bind(this)}/>}
        </div>:null}
        </>
    )
  }
  

