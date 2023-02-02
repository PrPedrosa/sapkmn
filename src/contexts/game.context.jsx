import { useState, useEffect, createContext } from 'react';
import { allPokemon } from '../db';
import { guid } from '../utils/utilities';

const GameContext = createContext()

function GameProviderWrapper(props) {
  const [pokeArray, setPokeArray] = useState([...allPokemon])
  const [starter, setStarter] = useState(null)
  const [currentTeam, setCurrentTeam] = useState(null)
  const [enemyTeam, setEnemyTeam] = useState(null)
  const [roundNum, setRoundNum] = useState(1)

  const handleStarter = (poke) => {
    poke.id = guid()
    setStarter(poke)
    setCurrentTeam([poke, null, null, null, null, null])
  }

  const handleCurrentTeam = (currentTeam) => {
    setCurrentTeam(currentTeam)
  }
  const handleEnemyTeam = (enemyTeam) => {
    setEnemyTeam(enemyTeam)
  }

  const increaseRound = () => setRoundNum(prevNum => prevNum +1)

  return(
    <GameContext.Provider value={{handleStarter, pokeArray, starter, handleCurrentTeam, currentTeam, roundNum, increaseRound, enemyTeam, handleEnemyTeam}}>
        {props.children}
    </GameContext.Provider>
  )
}

export {GameContext, GameProviderWrapper}