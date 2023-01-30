import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../contexts/game.context'
import { Fight } from '../classes/Fight'
import { useRef, useState } from 'react'
import { useEffect } from 'react'

function Game() {
  const {team} = useContext(GameContext)
  const canvasRef = useRef(null)
  const [fight, setFight] = useState(null)
  const [fightStatus, setFightStatus] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)

  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      const newFight = fight.update()
      setFight(newFight)
      setFightStatus(fight.fightStatus)
      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }


  //let fight = null
  useEffect(() => {
    if(team){
      const canvas = canvasRef.current
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext('2d')
      //fight = new Fight(ctx, canvas.width, canvas.height, team)
      setFight(new Fight(ctx, canvas.width, canvas.height, team))
    }
  }, [team])



  useEffect(() => {
    if(fight && !isAnimating){
      setIsAnimating(true)
      requestRef.current = requestAnimationFrame(animate);
      //return () => cancelAnimationFrame(requestRef.current);
      //maybe do entire update function here???????
      //cancelAnimationFrame(fight.animationId)
    }
  }, [fight])

  const handleAnimation = () => {
    cancelAnimationFrame(requestRef.current)
  }



  return (
    <div className='h-screen bg-game-background bg-[length:100vw_100vh] bg-no-repeat'>
    <button onClick={handleAnimation}>STOP</button>
      {fight && <div className='absolute border border-black z-10'>{fightStatus}</div>}
      <canvas ref={canvasRef}/>
    </div>
  )
}

export default Game