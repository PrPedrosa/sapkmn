import classNames from "classnames"

function Tag({text, style}) {
  return (
    <div 
    className={
    classNames("text-white rounded-lg", style)
    }
    draggable="false"
    >{text}</div>
  )
}

export default Tag