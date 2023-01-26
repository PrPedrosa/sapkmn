import {useEffect, useState} from 'react'
import Pokemon from './Pokemon'
//do this on Store cuz i need a state there with the store pokes to compare the drags
function RandomStorePokemons({pokeArray, numOfPokes, dragStart, dragEnter, drop}) {
    const [pokes, setPokes] = useState(null)

    useEffect(() => {
        const randPokeArray = []
        for(let i = 0; i < numOfPokes; i++){
            let randPoke = pokeArray[Math.floor(Math.random()*152)]
            randPokeArray.push(randPoke)
        }
        setPokes(randPokeArray)
    }, [])


  return (
    <>
        {pokes && pokes.map((poke, i) => <Pokemon pokemon={poke} key={i} dragStart={dragStart} dragEnter={dragEnter} pokeIdx={i} drop={drop}/>)}
    </>
  )
}

export default RandomStorePokemons