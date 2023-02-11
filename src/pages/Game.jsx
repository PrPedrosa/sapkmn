import React from 'react'
import { Fight } from '../classes/Fight'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import DamageDisplay from '../components/DamageDisplay'
import GameOverModal from '../components/GameOverModal'

function Game({currentTeam, enemyTeam, handleIsInFight, handleHasStarter}) {
  //const {currentTeam, enemyTeam} = useContext(GameContext)

  const [fight, setFight] = useState(null)
  const [fightStatus, setFightStatus] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [damagesModifier, setDamagesModifier] = useState(null)
  const [isFighting, setIsFighting] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const startTime = useRef()

  //################## create and set the canvas with currentTeam from context ############
  useEffect(() => {
    if(currentTeam && enemyTeam){
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      setFight(new Fight(ctx, canvas.width, canvas.height, currentTeam, enemyTeam))
    }
  }, [currentTeam, enemyTeam])

  //################## animation logic ######################
  function animate (time) {
    if(startTime.current === undefined){
      startTime.current = time
    }
    /* if (previousTimeRef.current !== undefined) {
      //const deltaTime = time - previousTimeRef.current; //time between animate calls if needed
    } */
    const updatedFight = fight.update(startTime.current, time)
    setFight(updatedFight)
    setFightStatus((prevStatus) => prevStatus = fight.fightStatus)
    setDamagesModifier((prev) => prev = fight.damages)
    setShowStats((prev) => prev = fight.showStats)
    setIsFighting((prev) => prev = fight.fighting)
    setGameOver(prev => prev = fight.gameOver)

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
    if(fight.fightStatus === "won" || fight.fightStatus === "lost" || fight.fightStatus == "draw"){
      cancelAnimation()
    }
  }

  //################### start and stop animation ##################
  useEffect(() => {
    if(fight && !isAnimating){
      setIsAnimating(true)
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [fight])

  const cancelAnimation = () => {
    cancelAnimationFrame(requestRef.current)
  }

  return (
    <div className='h-screen bg-game-background bg-[length:100vw_100vh] bg-no-repeat' id='canvasContainer' ref={containerRef}>
      <button className='absolute top-0 right-0' onClick={cancelAnimation}>STOP</button>
      {fight && <div className='absolute border border-black z-10'>{fightStatus}</div>}
      <DamageDisplay isFighting={isFighting} fight={fight} damagesModifier={damagesModifier} showStats={showStats}/>
      {gameOver && <GameOverModal gameOver={gameOver} fightStatus={fightStatus} handleIsInFight={handleIsInFight} handleHasStarter={handleHasStarter}/>}
      <canvas width={1536} height={714} className={"w-full h-full"} ref={canvasRef}/>
    </div>
  )
}

export default Game