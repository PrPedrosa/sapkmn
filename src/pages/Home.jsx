import { useContext, useState, useEffect } from "react"

function Home({handleStarter, starters, handleHasStarter, roundNum, setRoundNum, gameLevel, setGameLevel, gameLives, setGameLives}) {
  const [start, setStart] = useState(false)
  const [starterChoice, setStarterChoice] = useState("")

  useEffect(() => {
    roundNum !== 1 && setRoundNum(1)
    gameLevel !== 1 && setGameLevel(1)
    gameLives !== 5 && setGameLives(5)
  }, [])

  const handleStarterChoice = (poke) => {    
    handleStarter(poke)
    if(poke.name === "bulbasaur") setStarterChoice("bulba")
    if(poke.name === "squirtle") setStarterChoice("squirtle")
    if(poke.name === "charmander") setStarterChoice("charmander")
  }
  
  return (
    <div className='h-screen bg-home-background bg-cover flex justify-center items-center'>
      {!start && <button onClick={() => setStart(true)}>Start!</button>}
      
      {start &&
      <>
      {starters && 
      <div>
        <img src={starters[0].img} onClick={() =>handleStarterChoice(starters[0])} className={starterChoice === "bulba" ? "border border-black" : "none"}/>
        <img src={starters[1].img} onClick={() =>handleStarterChoice(starters[1])} className={starterChoice === "charmander" ? "border border-black" : "none"}/>
        <img src={starters[2].img} onClick={() =>handleStarterChoice(starters[2])} className={starterChoice === "squirtle" ? "border border-black" : "none"}/>
      </div>}

      <button className='p-[5px] bg-black text-white border border-white  rounded-lg' onClick={() => handleHasStarter(true)}>Start!</button>

      </>}
    </div>
  )
}

export default Home