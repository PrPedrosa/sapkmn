import { useState, useEffect, createContext } from 'react';
import { allPokemon } from '../db';
import { guid } from '../utils/utilities';

const GameContext = createContext()

function GameProviderWrapper(props) {
  const [starter, setStarter] = useState(null)
  const [team, setTeam] = useState(null)
  const [pokeArray, setPokeArray] = useState([...allPokemon])

  const handleStarter = (poke) => {
    poke.id = guid()
    setStarter(poke)
  }

  const handleTeam = (team) => {
    setTeam(team)
  }

  return(
    <GameContext.Provider value={{handleStarter, pokeArray, starter, handleTeam, team}}>
        {props.children}
    </GameContext.Provider>
  )
}

export {GameContext, GameProviderWrapper}