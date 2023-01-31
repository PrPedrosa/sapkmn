import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../contexts/game.context'
import { Fight } from '../classes/Fight'
import { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Game() {
  const {currentTeam} = useContext(GameContext)

  const [fight, setFight] = useState(null)
  const [fightStatus, setFightStatus] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const startTime = useRef()

  const navigate = useNavigate()

  //################## create and set the canvas with currentTeam from context ############
  useEffect(() => {
    if(currentTeam){
      const canvas = canvasRef.current
      //canvas.width = window.innerWidth;
      //canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d')
      setFight(new Fight(ctx, canvas.width, canvas.height, currentTeam))
    }
  }, [currentTeam])

  //################## animation logic ######################
  const animate = time => {
    if(startTime.current === undefined){
      startTime.current = time
    }
    if (previousTimeRef.current !== undefined) {
      //const deltaTime = time - previousTimeRef.current; //time between animate calls if needed
      const updatedFight = fight.update(startTime.current, time)
      setFight(updatedFight)
      setFightStatus((prevStatus) => prevStatus = fight.fightStatus)
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
    if(fight.fightStatus === "win" || fight.fightStatus === "lose"){
      handleAnimation()
    }
  }

  //################### start animation ##################
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
      <canvas width={1536} height={714} className={"w-full h-full"} ref={canvasRef}/>
    </div>
  )
}

export default Game