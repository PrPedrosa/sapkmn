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

export function getDropResults (teamCopy, storeCopy, dragType, hoverType, dragIdx, hoverIdx, pokeArray) {
    //if we are dragging around the store or from team to store we dont want to do nothing
    if(dragType === "store" && hoverType === "store") return;
    if(dragType === "team" && hoverType === "store") return;
    
    //if we are dragging from store to team....
    if(dragType === "store" && hoverType === "team") {
      const pokeContent = storeCopy[dragIdx]
      const draggedOverPokeContent = teamCopy[hoverIdx]

      if(!draggedOverPokeContent){
        teamCopy.splice(hoverIdx, 1, pokeContent)
        storeCopy.splice(dragIdx, 1)
        return {team: teamCopy, store: storeCopy}
      }
      
      if(teamCopy.length >=6) return
      teamCopy.splice(hoverIdx, 1, pokeContent)
      teamCopy.splice(hoverIdx, 0, draggedOverPokeContent)
      storeCopy.splice(dragIdx, 1)
      return {team: teamCopy, store: storeCopy}
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
      if(pokeContent.name !== draggedOverPokeContent.name){
        teamCopy.splice(dragIdx, 1)
        teamCopy.splice(hoverIdx, 0, pokeContent)
        return {team: teamCopy, store: storeCopy}
      } else {
        //evolve
        const evolvedPoke = pokeArray.find(poke => poke.levelsFrom === pokeContent.name)
        pokeContent.evolving = true
        draggedOverPokeContent.evolving = true
        teamCopy.splice(hoverIdx, 0, evolvedPoke)
        const newTeam = teamCopy.filter(poke => !poke || !poke.evolving)
        if(newTeam.length !== 6){
          newTeam.push(null)
        }
        return {team: newTeam, store: storeCopy}
      }
    }  
}

//in case something gets fucked, here is the code for handledrop before shifting login in this file

/* //if we are dragging around the store or from team to store we dont want to do nothing
    if(dragType === "store" && hoverType === "store") return;
    if(dragType === "team" && hoverType === "store") return;
    
    //if we are dragging from store to team....
    if(dragType === "store" && hoverType === "team") {
      const pokeContent = storeCopy[dragIdx]
      const draggedOverPokeContent = teamCopy[hoverIdx]

      if(!draggedOverPokeContent){
        teamCopy.splice(hoverIdx, 1, pokeContent)
        storeCopy.splice(dragIdx, 1)
        setTeam(teamCopy)
        setStorePokes(storeCopy)
        return
      }
      
      if(team.length >=6) return
      teamCopy.splice(hoverIdx, 1, pokeContent)
      teamCopy.splice(hoverIdx, 0, draggedOverPokeContent)
      storeCopy.splice(dragIdx, 1)
      setTeam(teamCopy)
      setStorePokes(storeCopy)
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
        setTeam(teamCopy)
        return
      }
      if(pokeContent.name !== draggedOverPokeContent.name){
        teamCopy.splice(dragIdx, 1)
        teamCopy.splice(hoverIdx, 0, pokeContent)
        setTeam(teamCopy)
        return
      } else {
        //evolve
        const evolvedPoke = pokeArray.find(poke => poke.levelsFrom === pokeContent.name)
        pokeContent.evolving = true
        draggedOverPokeContent.evolving = true
        teamCopy.splice(hoverIdx, 0, evolvedPoke)
        const newTeam = teamCopy.filter(poke => !poke || !poke.evolving)
        if(newTeam.length !== 6){
          newTeam.push(null)
        }
        setTeam(newTeam)
        return
      }
    } */