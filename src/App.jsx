import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Store from './pages/Store';
import { useContext } from 'react';
import { GameContext } from './contexts/game.context';
import { useState } from 'react';

function App() {
  const [hasStarter, setHasStarter] = useState(false)
  const [isInFight, setIsInFight] = useState(false)
  //TODO==> just pass all context here as a state object and pass it down to store and game//take out all usenavigates
  const handleHasStarter = (bool) => setHasStarter(bool)
  const handleIsInFight = (bool) => setIsInFight(bool)
  const {
    handleStarter, 
    pokeArray, 
    starter, 
    handleCurrentTeam, 
    currentTeam, 
    roundNum, 
    increaseRound, 
    enemyTeam, 
    handleEnemyTeam, 
    gameLevel, 
    increaseGameLevel, 
    gameLives, 
    setRoundNum,
    setGameLives,
    setGameLevel} = useContext(GameContext)
  return (
    <>
      {!hasStarter &&
      <Home 
        handleStarter={handleStarter} 
        starters={[pokeArray[0], pokeArray[3], pokeArray[6]]} 
        handleHasStarter={handleHasStarter}
        roundNum={roundNum}
        setRoundNum={setRoundNum}
        gameLevel={gameLevel}
        setGameLevel={setGameLevel}
        gameLives={gameLives}
        setGameLives={setGameLives}
      />}

      {hasStarter && !isInFight && 
      <Store 
        handleCurrentTeam={handleCurrentTeam} 
        currentTeam={currentTeam} 
        roundNum={roundNum} 
        handleEnemyTeam={handleEnemyTeam} 
        gameLives={gameLives} 
        handleIsInFight={handleIsInFight}
      />}

      {isInFight && 
      <Game 
        currentTeam={currentTeam} 
        enemyTeam={enemyTeam} 
        handleIsInFight={handleIsInFight} 
        handleHasStarter={handleHasStarter}
      />}
    </>
  )
}

export default App
