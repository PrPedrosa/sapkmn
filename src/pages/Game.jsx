import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../contexts/game.context'
import { Fight } from '../classes/Fight'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Game() {
  const {currentTeam, enemyTeam} = useContext(GameContext)

  const [fight, setFight] = useState(null)
  const [fightStatus, setFightStatus] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [damagesModifier, setDamagesModifier] = useState(null)
  const [isFighting, setIsFighting] = useState(false)
  const [debug, setDebug] = useState(false)
  
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const startTime = useRef()

  const navigate = useNavigate()

  //################## create and set the canvas with currentTeam from context ############
  useEffect(() => {
    if(currentTeam && enemyTeam){
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      setFight(new Fight(ctx, canvas.width, canvas.height, currentTeam, enemyTeam))
    }
  }, [currentTeam, enemyTeam])

  //################## animation logic ######################
  const animate = time => {
    if(startTime.current === undefined){
      startTime.current = time
    }
    if (previousTimeRef.current !== undefined) {
      //const deltaTime = time - previousTimeRef.current; //time between animate calls if needed
    }
    const updatedFight = fight.update(startTime.current, time)
    setFight(updatedFight)
    setFightStatus((prevStatus) => prevStatus = fight.fightStatus)
    setDamagesModifier((prev) => prev = fight.damages)
    setDebug((prev) => prev = fight.debug)
    setIsFighting((prev) => prev = fight.fighting)

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
    if(fight.fightStatus === "win" || fight.fightStatus === "lose" || fight.fightStatus == "draw"){
      handleAnimation()
    }
  }

  //################### start and stop animation ##################
  useEffect(() => {
    if(fight && !isAnimating){
      setIsAnimating(true)
      requestRef.current = requestAnimationFrame(animate);
    }
  }, [fight])

  const handleAnimation = () => {
    cancelAnimationFrame(requestRef.current)
    navigate("/store")
  }

  return (
    <div className='h-screen bg-game-background bg-[length:100vw_100vh] bg-no-repeat' id='canvasContainer' ref={containerRef}>
      <button className='absolute top-0 right-0' onClick={handleAnimation}>STOP</button>
      {fight && <div className='absolute border border-black z-10'>{fightStatus}</div>}
      {debug && <div className='absolute border top-0 left-1/2'>HELLOOOO</div>}
      <div className='absolute top-[30%] left-[40%] grid grid-cols-[150px_150px] gap-[10px] border h-[50px] text-center'>
        {damagesModifier && isFighting && damagesModifier.reverse().map((dmg, i) => {
          if(dmg === 0.5 || dmg === 0.25){
            return <div key={i} className="border">Not very effective!</div>
          }
          if(dmg === 2 || dmg === 4){
            return <div key={i} className="border">Super effective!</div>
          }
          else return <div className="border">Normal</div>
        })}
      </div>
      <canvas width={1536} height={714} className={"w-full h-full"} ref={canvasRef}/>
    </div>
  )
}

export default Game