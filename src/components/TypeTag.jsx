import classNames from "classnames";
import { typeColours } from "../utils/utilities";

function TypeTag({type, className}) {
  return (
    <div className={
       classNames(
        "text-[9px] text-center font-[700] first:rounded-tr-[5px] last:rounded-bl-[5px] text-clip overflow-hidden",
        typeColours[type], 
        className
       )}
    >{type}</div>
  )
}

export default TypeTag