import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { GameContext } from "../contexts/game.context"

function Home() {
  const {handleStarter, pokeArray} = useContext(GameContext)
  const [start, setStart] = useState(false)
  const [starterChoice, setStarterChoice] = useState("")

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
      {pokeArray && 
      <div>
        <img src={pokeArray[0].img} onClick={() =>handleStarterChoice(pokeArray[0])} className={starterChoice === "bulba" ? "border border-black" : "none"}/>
        <img src={pokeArray[3].img} onClick={() =>handleStarterChoice(pokeArray[3])} className={starterChoice === "charmander" ? "border border-black" : "none"}/>
        <img src={pokeArray[6].img} onClick={() =>handleStarterChoice(pokeArray[6])} className={starterChoice === "squirtle" ? "border border-black" : "none"}/>
      </div>}

      <Link to={"/store"} className='p-[5px] bg-black text-white border border-white  rounded-lg'>Start!</Link>

      </>}
    </div>
  )
}

export default Home