import { useState, useEffect, createContext } from 'react';
import { allPokemon } from '../db';
import { guid } from '../utils/utilities';

const GameContext = createContext()

function GameProviderWrapper(props) {
  const [starter, setStarter] = useState({})
  const pokeArray = [...allPokemon]

  const handleStarter = (poke) => {
    poke.id = guid()
    setStarter(poke)
  }

  return(
    <GameContext.Provider value={{handleStarter, pokeArray, starter}}>
        {props.children}
    </GameContext.Provider>
  )
}

export {GameContext, GameProviderWrapper}