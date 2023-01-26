import {useContext, useState, useEffect, useRef} from 'react'
import Pokemon from '../components/Pokemon';
import { GameContext } from "../contexts/game.context"
import { getRandomStorePokes } from '../utils/utilities';


function Store() {
  const {starter, pokeArray} = useContext(GameContext)

  const [team, setTeam] = useState(null)
  const [storePokes, setStorePokes] = useState(null)
  const dragPoke = useRef(null)
  const draggingOverPoke = useRef(null)


  //set initial team
  useEffect(() => {
    let teamCopy = [starter, pokeArray[0]]
    setTeam(teamCopy)
  }, [starter])

  //set rand store pokes
  useEffect(() => {
    //setStorePokes(getRandomStorePokes(pokeArray, 15))
    setStorePokes([pokeArray[3],pokeArray[4],pokeArray[0],pokeArray[1],])
  }, [])

  const handleDragStart = (e, position, pokeType) => {
    dragPoke.current = {
      idx:position,
      type:pokeType
    }
  }

  const handleDragEnter = (e, position, pokeType) => {
    draggingOverPoke.current = {
      idx:position,
      type:pokeType
    }
   //do logic to rearrange team when hovering over here, maybe dont need to do logic on handle drop if done right here
  }

  const handleDrop = (e, pokeType) => {
    const teamCopy = [...team]
    const storeCopy = [...storePokes]
    const dragType = dragPoke.current.type
    const hoverType = draggingOverPoke.current.type
    const dragIdx = dragPoke.current.idx
    const hoverIdx = draggingOverPoke.current.idx

    //if we are dragging around the store or from team to store we dont want to do nothing
    if(dragType === "store" && hoverType === "store") return;
    if(dragType === "team" && hoverType === "store") return;
    
    //if we are dragging from store to team....
    if(dragType === "store" && hoverType === "team") {
      const pokeContent = storeCopy[dragIdx]
      const draggedOverPokeContent = teamCopy[hoverIdx]
      
      if(team.length >=6) return
      teamCopy.splice(hoverIdx, 1, pokeContent)
      teamCopy.splice(hoverIdx, 0, draggedOverPokeContent)
      storeCopy.splice(dragIdx, 1)
      setTeam(teamCopy)
      setStorePokes(storeCopy)
    }

    //if we are dragging inside the team...
    if(dragType === "team" && hoverType === "team"){
      const pokeContent = teamCopy[dragIdx]
      const draggedOverPokeContent = teamCopy[hoverIdx]
      if(pokeContent.name !== draggedOverPokeContent.name){
        teamCopy.splice(dragIdx, 1)
        teamCopy.splice(hoverIdx, 0, pokeContent)
        setTeam(teamCopy)
      } else {
        //evolve
        const evolvedPoke = pokeArray.find(poke => poke.levelsFrom === pokeContent.name)
        pokeContent.evolving = true
        draggedOverPokeContent.evolving = true
        teamCopy.splice(hoverIdx, 0, evolvedPoke)
        const newTeam = teamCopy.filter(poke => !poke.evolving)
        setTeam(newTeam)
      }
    }
    //reset refs
    dragPoke.current = null;
    draggingOverPoke.current = null;
  }

  return(
    <div className='h-screen flex flex-col justify-around bg-slate-500'>
      <div className='border-2 border-red-800 rounded-[5px] p-5 flex w-fit self-center gap-[5px]'>
          {team && team.map((poke, i) => <Pokemon pokemon={poke} key={i} dragStart={handleDragStart} dragEnter={handleDragEnter} pokeIdx={i} pokeType={"team"} drop={handleDrop}/>)}
      </div>
      <div className='border-2 border-red-800 rounded-[5px] p-5 flex w-fit gap-[5px]'>
        {storePokes && storePokes.map((poke, i) => <Pokemon pokemon={poke} key={i} dragStart={handleDragStart} dragEnter={handleDragEnter} pokeIdx={i} pokeType={"store"} drop={handleDrop}/>)}
      </div>
    </div>
  )
}

export default Store