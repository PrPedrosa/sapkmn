import {useContext, useState, useEffect, useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Money from '../components/Money';
import Pokemon from '../components/Pokemon';
import { GameContext } from "../contexts/game.context"
import { getDropResults, getRandomPokes} from '../utils/utilities';


function Store() {
  const {handleCurrentTeam, currentTeam, roundNum, increaseRound} = useContext(GameContext)

  const [team, setTeam] = useState(null)
  const [storePokes, setStorePokes] = useState(null)
  const [money, setMoney] = useState(10)

  const dragPoke = useRef(null)
  const draggingOverPoke = useRef(null)


  //set initial team
  useEffect(() => {
    if(currentTeam){
      setTeam(currentTeam)
    } else {
      setTeam([null, null, null, null, null, null])
    }
  }, [currentTeam])

  //set rand store pokes
  useEffect(() => {
      setStorePokes((prev) => prev = getRandomPokes(8, roundNum))
  }, [])

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

    const dropResults = getDropResults(teamCopy, storeCopy, dragType, hoverType, dragIdx, hoverIdx)
    if(!dropResults) return
    setTeam(dropResults.team)
    
    //check to see if poke bought
    if(storePokes.length !== dropResults.store.length){
      setMoney(money => money -=3)
    }
    setStorePokes(dropResults.store)

    //reset refs
    dragPoke.current = null;
    draggingOverPoke.current = null;
  }

  const handleSell = () => {
    const teamCopy = [...team]
    if(teamCopy.filter(poke => poke).length === 1) return
    const pokeToSell = teamCopy.find(poke => poke && poke.isSelected)
    if(!pokeToSell) return
    const index = teamCopy.indexOf(pokeToSell)
    teamCopy.splice(index, 1, null)
    setTeam(teamCopy)
    setMoney((money => money +=1))
  }

  const handleSelect = (pokemon) => {
    const teamCopy = [...team]
    if(pokemon.isSelected === true){
      pokemon.isSelected = false
      setTeam(teamCopy)
      return
    }
    teamCopy.forEach(poke => {
      if(poke && poke.isSelected){
        poke.isSelected = false
      }
    })
    pokemon.isSelected = true
    setTeam(teamCopy)
  }

  const navigate = useNavigate()
  const startFight = () => {
    handleCurrentTeam(team)
    increaseRound()
    navigate("/game")
  }

  return(
    <div className='h-screen flex flex-col justify-around bg-slate-500'>
      <Money amount={money}/>
      <div className='absolute top-0 left-[50px]'>Round: {roundNum}</div>
      <button onClick={startFight} className="absolute top-0 right-0 p-[3px] text-white bg-red-800 border-2 border-black">Fight!</button>
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