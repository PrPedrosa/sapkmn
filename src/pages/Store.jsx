import {useContext, useState, useEffect, useRef} from 'react'
import Button from '../components/Button';
import Pokemon from '../components/Pokemon';
import { GameContext } from "../contexts/game.context"
import { getDropResults, getRandomStorePokes } from '../utils/utilities';


function Store() {
  const {starter, pokeArray} = useContext(GameContext)

  const [team, setTeam] = useState(null)
  const [storePokes, setStorePokes] = useState(null)
  const dragPoke = useRef(null)
  const draggingOverPoke = useRef(null)


  //set initial team
  useEffect(() => {
    let teamCopy = [starter, pokeArray[40], null, null, null, null]
    setTeam(teamCopy)
    console.log(starter)
  }, [starter])

  //set rand store pokes
  useEffect(() => {
    const newPokeArr = []
    for(let i = 0; i < pokeArray.length; i++){
      newPokeArr.push({
        name: pokeArray[i].name,
        img: pokeArray[i].img,
        stats: pokeArray[i].stats,
        types: pokeArray[i].types,
        levelsFrom: pokeArray[i].levelsFrom,
        ability: pokeArray[i].ability,
        fromStore: true
      })
    }
    //setStorePokes(getRandomStorePokes(pokeArray, 15))
    setStorePokes([newPokeArr[3],newPokeArr[4],newPokeArr[0],newPokeArr[1],])
  }, [pokeArray])

  const handleDragStart = (e, position, pokeType) => {
    dragPoke.current = {
      idx: position,
      type: pokeType
    }
  }

  const handleDragEnter = (e, position, pokeType) => {
    draggingOverPoke.current = {
      idx: position,
      type: pokeType
    }
  }

  const handleDrop = (e, pokeType) => {
    const teamCopy = [...team]
    const storeCopy = [...storePokes]
    const dragType = dragPoke.current.type
    const hoverType = draggingOverPoke.current.type
    const dragIdx = dragPoke.current.idx
    const hoverIdx = draggingOverPoke.current.idx

    const dropResults = getDropResults(teamCopy, storeCopy, dragType, hoverType, dragIdx, hoverIdx, pokeArray)
    if(!dropResults) return
    setTeam(dropResults.team)
    setStorePokes(dropResults.store)
    //reset refs
    dragPoke.current = null;
    draggingOverPoke.current = null;
  }

  const handleSell = () => {
    const teamCopy = [...team]
    const newTeam = teamCopy.filter(poke => !poke || !poke.isSelected)
    setTeam(newTeam)
    console.log(newTeam)
  }

  const handleSelect = (pokeIdx, pokemon) => {
    //if clicking on store, team pokes get highlighted fml, solve pls (add a prop named type that says if it is from store or from team)
    const teamCopy = [...team]
    const pokeToSelect = teamCopy[pokeIdx]
    if(pokeToSelect.isSelected === true){
      pokeToSelect.isSelected = false
      if(pokeToSelect.fromStore){
        pokeToSelect.fromStore = false
      }
      setTeam(teamCopy)
      return
    }
    teamCopy.forEach(poke => {
      if(poke && poke.isSelected){
        poke.isSelected = false
      }
    })
    if(pokeToSelect.fromStore){
      pokeToSelect.fromStore = false
    }
    pokeToSelect.isSelected = true
    setTeam(teamCopy)
  }

  return(
    <div className='h-screen flex flex-col justify-around bg-slate-500'>
      <Button text="Sell" onClick={handleSell}/>
      <div className='border-2 border-red-800 rounded-[5px] p-5 grid grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr] self-center gap-[5px]'>
          {team && team.map((poke, i) => 
          <Pokemon pokemon={poke} key={i} dragStart={handleDragStart} dragEnter={handleDragEnter} pokeIdx={i} pokeType={"team"} drop={handleDrop} handleSelect={handleSelect}/>
          )}
      </div>
      <div className='border-2 border-red-800 rounded-[5px] p-5 flex w-fit gap-[5px]'>
        {storePokes && storePokes.map((poke, i) => 
        <Pokemon pokemon={poke} key={i} dragStart={handleDragStart} dragEnter={handleDragEnter} pokeIdx={i} pokeType={"store"} drop={handleDrop} handleSelect={handleSelect}/>
        )}
      </div>
    </div>
  )
}

export default Store