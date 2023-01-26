/**
 * @param {pokemon[]} pokeArray 
 * @param {number} numOfPokes 
 * @returns Array of random pokemon of length `numOfPokes`
 */
export function getRandomStorePokes (pokeArray, numOfPokes) {
    const randPokeArray = []
    for(let i = 0; i < numOfPokes; i++){
        let randPoke = pokeArray[Math.floor(Math.random()*152)]
        randPokeArray.push(randPoke)
    }
    return randPokeArray
}