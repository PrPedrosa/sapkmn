import { useContext } from "react"
import { GameContext } from "../contexts/game.context"

function GameOverModal({fightStatus, handleIsInFight, handleHasStarter}) {
  const {increaseRound, increaseGameLevel, gameLives, increaseGameLives} = useContext(GameContext)

  const handleToStore = () => {
    if(fightStatus === "win") increaseGameLevel(1)
    if(fightStatus === "lost" && gameLives > 1) increaseGameLives(-1)
    //go to store or home if lost all lifes
    if(gameLives === 1 && fightStatus === "lost"){
      handleHasStarter(false)
    }
    increaseRound(1)
    handleIsInFight(false)
  }

  return (
    <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] text-center bg-[#1d1d1d] text-white'>
      <div>You {fightStatus.toUpperCase()}!</div>
      <button onClick={handleToStore}>to store</button>
      
    </div>
  )
}

export default GameOverModal