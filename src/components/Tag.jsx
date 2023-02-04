import classNames from "classnames"

function Tag({text, className}) {
  return (
    <div 
    className={
    classNames("text-white rounded-lg", className)
    }
    draggable="false"
    >{text}</div>
  )
}

export default Tag