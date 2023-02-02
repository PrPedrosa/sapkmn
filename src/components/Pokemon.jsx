import classNames from "classnames"
import { useState } from "react"
import Tag from "./Tag"
import TypeTag from "./TypeTag"
import LevelTag from "./LevelTag"
import { typeColours } from "../utils/utilities"

function Pokemon({pokemon, dragStart, pokeIdx, dragEnter, drop, pokeType, handleSelect}) {
  const [isDragging, setIsDragging] = useState(false)
  const [isBeingDraggedOver, setIsBeingDraggedOver] = useState(false)
  function capitalize (str) {
    return str[0].toUpperCase() + str.slice(1)
  }

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
    onClick={(e) => handleSelect(pokemon)}
    className={classNames("rounded-[5px] relative bg-gray-500", {
      "border-2 border-red-800 opacity-[0.5]": isDragging,
      "border-2 border-blue-700": isBeingDraggedOver,
      "border-2 border-black": !isDragging && !isBeingDraggedOver,
      "border-2 border-green-800": pokemon.isSelected
    })}
    >
      <LevelTag level={pokemon.level}/>
      <div className="absolute w-[32%] right-0">
        {pokemon.types.map((type, i) => <TypeTag key={i} type={type}/>)}
      </div>
      <div className="relative">
        <img src={pokemon.img} draggable="false" className="px-[0.8vw] pb-[5px]"/>
        <p className="text-center text-[14px] absolute bottom-0 w-[100%]">{capitalize(pokemon.name)}</p>
      </div>
      <div className='flex justify-evenly' draggable="false">
        {pokemon.stats.att >= pokemon.stats.spAtt 
        ? <Tag text={pokemon.stats.att} style='bg-black px-1 mb-[2px]'/>
        : <Tag text={pokemon.stats.spAtt} style='bg-violet-800 px-1 mb-[2px]'/>
        }
        <Tag text={pokemon.stats.hp} style='bg-red-700 px-1 mb-[2px]'/>
      </div>
    </div>

    : 
    <div 
    draggable = "false" 
    onDragEnter={(e) => dragEnter(e, pokeIdx, pokeType)}
    onDragOver={() => !isBeingDraggedOver && setIsBeingDraggedOver(true)}
    onDragLeave={(e) => setIsBeingDraggedOver(false)}
    className={classNames("rounded-[5px] text-center pt-[30%] text-[20px]", {
      "border-2 border-blue-700": isBeingDraggedOver,
      "border-2 border-black": !isDragging && !isBeingDraggedOver
    })}
    >
    {pokeIdx === 0 ? 6 : pokeIdx === 1 ? 5 : pokeIdx === 2 ? 4 : pokeIdx === 3 ? 3 : pokeIdx === 4 ? 2 : pokeIdx === 5 ? 1 : "nope"}</div>
    }
    </>
  )
}

export default Pokemon