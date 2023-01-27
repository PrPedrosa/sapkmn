import classNames from "classnames"
import { useState } from "react"
function Pokemon({pokemon, dragStart, pokeIdx, dragEnter, drop, pokeType, handleSelect}) {
  const [isDragging, setIsDragging] = useState(false)
  const [isBeingDraggedOver, setIsBeingDraggedOver] = useState(false)
  const [isSelected, setIsSelected] = useState(false)

  return (
    <>
    {pokemon ? 
    <div 
    draggable
    onDragStart={(e) => {dragStart(e, pokeIdx, pokeType); setIsDragging(true)}} 
    onDragEnter={(e) => dragEnter(e, pokeIdx, pokeType)}
    onDragOver={() => !isBeingDraggedOver && setIsBeingDraggedOver(true)}
    onDragLeave={(e) => setIsBeingDraggedOver(false)}
    onDragEnd={(e) => {drop(e, pokeType); setIsDragging(false); setIsBeingDraggedOver(false)}}
    onClick={(e) => handleSelect(pokeIdx, pokemon)}
    className={classNames("rounded-[5px]", {
      "border-2 border-red-800 opacity-[0.5]": isDragging,
      "border-2 border-blue-700": isBeingDraggedOver,
      "border-2 border-black": !isDragging && !isBeingDraggedOver,
      "border-2 border-green-800": pokemon.isSelected
    })}
    >
      <img src={pokemon.img} draggable="false"/>
      <div className='flex justify-evenly' draggable="false">
        <div className='text-white bg-black rounded-lg px-1' draggable="false">{pokemon.stats.att}</div>
        <div className='text-white bg-red-700 rounded-lg px-1' draggable="false">{pokemon.stats.hp}</div>
      </div>
    </div>

    : 
    <div 
    draggable = "false" 
    onDragEnter={(e) => dragEnter(e, pokeIdx, pokeType)}
    onDragOver={() => !isBeingDraggedOver && setIsBeingDraggedOver(true)}
    onDragLeave={(e) => setIsBeingDraggedOver(false)}
    className={classNames("rounded-[5px]", {
      "border-2 border-blue-700": isBeingDraggedOver,
      "border-2 border-black": !isDragging && !isBeingDraggedOver
    })}
    >
    nope</div>
    }
    </>
  )
}

export default Pokemon