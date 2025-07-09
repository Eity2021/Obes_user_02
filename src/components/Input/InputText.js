import { useState } from "react"


function InputText({containerStyle}){


    return(
        <div className={`form-control w-full ${containerStyle}`}>
            {/* <label className="label">
                <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
            </label> */}
            <input className="input  input-bordered w-full " />
        </div>
    )
}


export default InputText