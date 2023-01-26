import { useState, useEffect, createContext } from 'react';
import { allPokemon } from '../db';

const GameContext = createContext()

function GameProviderWrapper(props) {
  const [starter, setStarter] = useState({})
  const pokeArray = [...allPokemon]

  const handleStarter = (poke) => {
    setStarter(poke)
  }

  return(
    <GameContext.Provider value={{handleStarter, pokeArray, starter}}>
        {props.children}
    </GameContext.Provider>
  )
}

export {GameContext, GameProviderWrapper}