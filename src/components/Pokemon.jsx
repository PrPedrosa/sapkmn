import classNames from "classnames"
import { useState } from "react"
import Tag from "./Tag"
import TypeTag from "./TypeTag"
import LevelTag from "./LevelTag"
import PokeImageWithName from "./PokeImageWithName"
import { getTypeColoursGradient } from "../utils/utilities"

function Pokemon({pokemon, dragStart, pokeIdx, dragEnter, drop, pokeType, handleSelect}) {
  const [isDragging, setIsDragging] = useState(false)
  const [isBeingDraggedOver, setIsBeingDraggedOver] = useState(false)

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
    className={classNames("rounded-[5px] relative cursor-pointer", getTypeColoursGradient(pokemon.types), {
      "border-[3px] border-green-800 opacity-[0.5]": isDragging,
      "border-[3px] border-red-800": isBeingDraggedOver,
      "border-[3px] border-black": !isDragging && !isBeingDraggedOver,
      "border-[3px] border-blue-600 shadow-2xl": pokemon.isSelected,
    })}
    >
      <LevelTag level={pokemon.level}/>
      <div className="absolute w-[32%] right-0 border rounded-tr-[5px] rounded-bl-[5px]">
        {pokemon.types.map((type, i) => <TypeTag key={i} type={type}/>)}
      </div>
      <PokeImageWithName img={pokemon.img} name={pokemon.name}/>
      <div className='flex justify-evenly' draggable="false">
        {pokemon.stats.att >= pokemon.stats.spAtt 
        ? <Tag text={pokemon.stats.att} className='bg-black px-1 mb-[2px]'/>
        : <Tag text={pokemon.stats.spAtt} className='bg-violet-800 px-1 mb-[2px]'/>
        }
        <Tag text={pokemon.stats.hp} className='bg-red-500 px-1 mb-[2px]'/>
      </div>
    </div>
    : 
    <PokemonPlaceholder
      dragEnter={dragEnter} 
      idx={pokeIdx} 
      type={pokeType} 
      isDraggedOver={isBeingDraggedOver} 
      handleDragOver={(bool) => setIsBeingDraggedOver(bool)}
    />
    }
    </>
  )
}

function PokemonPlaceholder ({dragEnter, idx, type, isDraggedOver, handleDragOver}) {
  return (
    <div 
    draggable = "false" 
    onDragEnter={(e) => dragEnter(e, idx, type)}
    onDragOver={() => !isDraggedOver && handleDragOver(true)}
    onDragLeave={() => handleDragOver(false)}
    className={classNames("rounded-[5px] text-center pt-[30%] text-[20px] min-w-[60px] min-h-[60px] text-white bg-slate-500", {
      "border-2 border-blue-700": isDraggedOver,
      "border-2 border-black": !isDraggedOver
    })}
    >
      {idx === 0 ? 6 : idx === 1 ? 5 : idx === 2 ? 4 : idx === 3 ? 3 : idx === 4 ? 2 : idx === 5 ? 1 : "nope"}
    </div>
  )
}

export default Pokemon