export function createOnePoke (poke){
  const newPoke = {
    name: poke.name,
    img: poke.img,
    stats: poke.stats,
    types: poke.types,
    id: guid(),
    level: poke.level,
    levelsFrom: poke.levelsFrom,
    evoLine: poke.evoLine,
    ability: poke.ability,
  }
  return newPoke
}

export function levelUpPoke (poke) {
  const leveledUpPoke = {
    name: poke.name,
    img: poke.img,
    stats: poke.stats,
    types: poke.types,
    id: guid(),
    level: poke.level + 1,
    levelsFrom: poke.levelsFrom,
    evoLine: poke.evoLine,
    ability: poke.ability,
  }
  return leveledUpPoke
}

export function evolvePoke (poke, pokeArray) {
  const pokeToEvolveTo = pokeArray.find(pokemon => pokemon.levelsFrom === poke.name)
  if(pokeToEvolveTo){
    const evolvedPoke = {
      name: pokeToEvolveTo.name,
      img: pokeToEvolveTo.img,
      stats: pokeToEvolveTo.stats,
      types: pokeToEvolveTo.types,
      id: guid(),
      level: poke.level + 1,
      levelsFrom: pokeToEvolveTo.levelsFrom,
      evoLine: pokeToEvolveTo.evoLine,
      ability: pokeToEvolveTo.ability,
    }
    return evolvedPoke
  }
}

//###############DO THIS HERE ############################
export function evolveOrLevelUpPoke() {

}





export function getRandomStorePokes (pokeArray, numOfPokes) {
    const randPokeArray = []
    for(let i = 0; i < numOfPokes; i++){
        //const randNum = Math.floor(Math.random()*152)
        const randNum = 0
        const randPoke = createOnePoke(pokeArray[randNum])
        randPokeArray.push(randPoke)
    }
    return randPokeArray
}

export function getDropResults (teamCopy, storeCopy, dragType, hoverType, dragIdx, hoverIdx, pokeArray) {
    //if we are dragging around the store or from team to store we dont want to do nothing
    if(dragType === "store" && hoverType === "store") return;
    if(dragType === "team" && hoverType === "store") return;
    
    //if we are dragging from store to team....
    if(dragType === "store" && hoverType === "team") {
      const storePoke = storeCopy[dragIdx]
      const teamPoke = teamCopy[hoverIdx]

      //if dragging into null position
      if(!teamPoke){
        teamCopy.splice(hoverIdx, 1, storePoke)
        storeCopy.splice(dragIdx, 1)
        return {team: teamCopy, store: storeCopy}
      }
      //if dragging into poke, check same name and then level up or evolve #####################DO THIS##################
      if(storePoke.name === teamPoke.name){
        const evolvedPoke = evolvePoke(storePoke, pokeArray)
        teamCopy.splice(hoverIdx, 1, evolvedPoke)
        storeCopy.splice(dragIdx, 1)
        return {team: teamCopy, store: storeCopy}
      }
      if(teamCopy.length >= 6) return
      /* teamCopy.splice(hoverIdx, 1, pokeContent)
      teamCopy.splice(hoverIdx, 0, draggedOverPokeContent)
      storeCopy.splice(dragIdx, 1)
      return {team: teamCopy, store: storeCopy} */
    }

    //if we are dragging inside the team...
    if(dragType === "team" && hoverType === "team"){
      const pokeContent = teamCopy[dragIdx]
      const draggedOverPokeContent = teamCopy[hoverIdx]
      //if dropping on same slot
      if(dragIdx === hoverIdx) return
      //if dragging into empty slot
      if(!draggedOverPokeContent){
        teamCopy.splice(dragIdx, 1, null)
        teamCopy.splice(hoverIdx, 1, pokeContent)
        return {team: teamCopy, store: storeCopy}
      }
      //if switching positions
      if(pokeContent.name !== draggedOverPokeContent.name){
        teamCopy.splice(dragIdx, 1)
        teamCopy.splice(hoverIdx, 0, pokeContent)
        return {team: teamCopy, store: storeCopy}
      } else {
        //if name is same, check if level up or evolve "########################DO THIS ######################"
        //evolve
        const evolvedPoke = evolvePoke(pokeContent, pokeArray)
        teamCopy.splice(hoverIdx, 1, evolvedPoke)
        teamCopy.splice(dragIdx, 1)
        if(teamCopy.length !== 6){
          teamCopy.push(null)
        }
        return {team: teamCopy, store: storeCopy}
      }
    }  
}

export function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + '-' + s4() + s4()
  }