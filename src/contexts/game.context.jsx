import { useState, useEffect, createContext } from 'react';
import { allPokemon } from '../db';
import { createOnePoke } from '../utils/utilities';

const GameContext = createContext()

function GameProviderWrapper(props) {
  const [pokeArray, setPokeArray] = useState([...allPokemon])
  const [starter, setStarter] = useState(null)
  const [currentTeam, setCurrentTeam] = useState(null)
  const [enemyTeam, setEnemyTeam] = useState(null)
  const [roundNum, setRoundNum] = useState(1)
  const [gameLevel, setGameLevel] = useState(1)
  const [gameLives, setGameLives] = useState(5)

  const handleStarter = (poke) => {
    const starterPoke = createOnePoke(poke)
    setStarter(starterPoke)
    setCurrentTeam([starterPoke, null, null, null, null, null])
  }

  const handleCurrentTeam = (currentTeam) => {
    setCurrentTeam(currentTeam)
  }
  const handleEnemyTeam = (enemyTeam) => {
    setEnemyTeam(enemyTeam)
  }

  const increaseRound = (num) => setRoundNum(prevNum => prevNum + num)
  const increaseGameLevel = (num) => setGameLevel(prevNum => prevNum + num)
  const increaseGameLives = (num) => setGameLives(prevNum => prevNum + num)

  return(
    <GameContext.Provider value={{handleStarter, pokeArray, starter, handleCurrentTeam, currentTeam, roundNum, increaseRound, enemyTeam, handleEnemyTeam, gameLevel, increaseGameLevel, gameLives, increaseGameLives, setRoundNum, setGameLevel, setGameLives}}>
        {props.children}
    </GameContext.Provider>
  )
}

export {GameContext, GameProviderWrapper}