import classNames from "classnames"
import { useState } from "react"

function Button({onClick, className, text}) {


  return (
    <div 
    className={
        classNames(
            "absolute top-[10%] left-[5%] w-fit px-[15px] py-[8px] rounded-full border-2 border-black bg-violet-800 text-black text-center font-bold cursor-pointer shadow-lg shadow-black",
            "hover:px-[18px] hover:py-[10px] hover:border-[4px]",
            "active:text-gray-700 active:border-gray-700",
            className
        )
    }
    onClick={onClick}
    >{text}</div>
  )
}

export default Button