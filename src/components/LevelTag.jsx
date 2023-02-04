import React from 'react' 
import classNames from 'classnames'

function LevelTag ({level, className}) {
  return (
    <div className={classNames("font-bold absolute text-[12px] rounded-tl-[5px] rounded-br-[5px] px-[2px] text-center", className)} draggable="false">
      Lv: <span className='text-white'>{level}</span>
    </div>
  )
}

export default LevelTag