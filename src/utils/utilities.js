import { allPokemon } from "../db"

export function createOnePoke (poke){
  const newStats = {
    hp: Math.ceil(poke.stats.hp /10) + Math.floor(poke.stats.def /20) + Math.floor(poke.stats.spDef /20),
    att: Math.floor(poke.stats.att /10),
    def: Math.floor(poke.stats.def /10),
    spAtt: Math.floor(poke.stats.spAtt /10),
    spDef: Math.floor(poke.stats.spDef /10),
    speed: Math.floor(poke.stats.speed /10),
  }
  const newPoke = {
    name: poke.name,
    img: poke.img,
    stats: newStats,
    types: poke.types,
    id: guid(),
    level: poke.level,
    levelsFrom: poke.levelsFrom,
    evoLine: poke.evoLine,
    ability: poke.ability,
  }
  return newPoke
}

export function getRandomPokes (numOfPokes, roundNum, isEnemyTeam) {
  const pokeArray = isEnemyTeam? enemyPokemonsFilter(roundNum) : storePokemonsFilter(roundNum)
  console.log(pokeArray)
  const randPokeTeam = []
  for(let i = 0; i < numOfPokes; i++){
      const randNum = Math.floor(Math.random()*(pokeArray.length))
      //const randNum =112
      const randPoke = createOnePoke(pokeArray[randNum])
      randPokeTeam.push(randPoke)
  }
  return randPokeTeam
}

export function enemyPokemonsFilter (roundNum) {
  Array.prototype.checkSum = function sumStats (){
    return this[1] >= this[3] ? this[0] + this[1] : this[0] + this[3]
  }
  if (roundNum <= 3){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 4000)
  }
  if (roundNum <= 6){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 110)
  }
  if (roundNum <= 9){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 150)
  }
  if (roundNum <= 12){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 190)
  }
  if (roundNum > 12){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 300)
  }
}

export function storePokemonsFilter (roundNum) {
  Array.prototype.checkSum = function sumStats (){
    return this[1] >= this[3] ? this[0] + this[1] : this[0] + this[3]
  }
  if (roundNum <= 3){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 4000)
  }
  if (roundNum <= 6){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 110)
  }
  if (roundNum <= 9){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 150)
  }
  if (roundNum <= 12){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 190)
  }
  if (roundNum > 12){
    return allPokemon.filter(poke => Object.values(poke.stats).checkSum() <= 300)
  }
}

export function levelUpPoke (poke, levelNum) {
  const newStats = {
    hp: poke.stats.hp + 1,
    att: poke.stats.att + 1,
    def: poke.stats.def + 1,
    spAtt: poke.stats.spAtt + 1,
    spDef: poke.stats.spDef + 1,
    speed: poke.stats.speed + 1,
  }
  const leveledUpPoke = {
    name: poke.name,
    img: poke.img,
    stats: newStats,
    types: poke.types,
    id: guid(),
    level: levelNum,
    levelsFrom: poke.levelsFrom,
    evoLine: poke.evoLine,
    ability: poke.ability,
  }
  return leveledUpPoke
}

export function evolvePoke (poke, levelNum) {
  const pokeToEvolveTo = allPokemon.find(pokemon => pokemon.levelsFrom === poke.name)
  const newStats = {
    hp: poke.stats.hp + 1,
    att: poke.stats.att + 1,
    def: poke.stats.def + 1,
    spAtt: poke.stats.spAtt + 1,
    spDef: poke.stats.spDef + 1,
    speed: poke.stats.speed + 1,
  }
  if(pokeToEvolveTo){
    const evolvedPoke = {
      name: pokeToEvolveTo.name,
      img: pokeToEvolveTo.img,
      stats: newStats,
      types: pokeToEvolveTo.types,
      id: guid(),
      level: levelNum,
      levelsFrom: pokeToEvolveTo.levelsFrom,
      evoLine: pokeToEvolveTo.evoLine,
      ability: pokeToEvolveTo.ability,
    }
    return evolvedPoke
  }
}

export function evolveOrLevelUpPoke(pokeDragging, pokeDraggedOver) {
  if(pokeDraggedOver.level + pokeDragging.level < 5){
    return levelUpPoke(pokeDraggedOver, pokeDraggedOver.level + pokeDragging.level)
  }
  if(pokeDraggedOver.level + pokeDragging.level === 5){
    return evolvePoke(pokeDraggedOver, 1)
  }
  if(pokeDraggedOver.level + pokeDragging.level > 5){
    return evolvePoke(pokeDraggedOver, (pokeDraggedOver.level + pokeDragging.level)-4)
  }
}


export function getDropResults (teamCopy, storeCopy, dragType, hoverType, dragIdx, hoverIdx) {
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
      //if dragging into poke, check same name or evo name and then level up or evolve
      if(storePoke.name === teamPoke.name || storePoke.name === teamPoke.levelsFrom){
        //check if last stage or no evolution poke so it can go to level 5 and stop
        if(teamPoke.level >= 4 && teamPoke.evoLine.stage === teamPoke.evoLine.stages){
          if(teamPoke.level >= 5) return
          else {
            const strongPoke = levelUpPoke(teamPoke, 5)
            teamCopy.splice(hoverIdx, 1, strongPoke)
            storeCopy.splice(dragIdx, 1)
            return {team: teamCopy, store: storeCopy}
          }
        }
        const strongPoke = evolveOrLevelUpPoke(storePoke, teamPoke)
        teamCopy.splice(hoverIdx, 1, strongPoke)
        storeCopy.splice(dragIdx, 1)
        return {team: teamCopy, store: storeCopy}
      }
      if(teamCopy.length >= 6) return
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
      if (pokeContent.name === draggedOverPokeContent.name || pokeContent.name === draggedOverPokeContent.levelsFrom) {
        //check if last stage or no evolution poke so it can go to level 5 and stop
        if(draggedOverPokeContent.level >= 4 && draggedOverPokeContent.evoLine.stage === draggedOverPokeContent.evoLine.stages){
          if(draggedOverPokeContent.level >= 5) {
            //just switch positions
            teamCopy.splice(dragIdx, 1)
            teamCopy.splice(hoverIdx, 0, pokeContent)
            return {team: teamCopy, store: storeCopy}
          } else {
            const strongPoke = levelUpPoke(draggedOverPokeContent, 5)
            teamCopy.splice(hoverIdx, 1, strongPoke)
            teamCopy.splice(dragIdx, 1)
            if(teamCopy.length !== 6){
              teamCopy.push(null)
            }
            return {team: teamCopy, store: storeCopy}
          }
        }
        //if name is same or is a evo, check if level up or evolve 
        const strongPoke = evolveOrLevelUpPoke(pokeContent, draggedOverPokeContent)
        teamCopy.splice(hoverIdx, 1, strongPoke)
        teamCopy.splice(dragIdx, 1)
        if(teamCopy.length !== 6){
          teamCopy.push(null)
        }
        return {team: teamCopy, store: storeCopy}
      }


      //base case: switching positions
      teamCopy.splice(dragIdx, 1)
      teamCopy.splice(hoverIdx, 0, pokeContent)
      return {team: teamCopy, store: storeCopy}
      
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

export function capitalize (str) {
  return str[0].toUpperCase() + str.slice(1)
}

export const typeColours = {
	normal: 'bg-[#A8A77A]',
	fire: 'bg-[#EE8130]',
	water: 'bg-[#6390F0]',
	electric: 'bg-[#F7D02C]',
	grass: 'bg-[#7AC74C]',
	ice: 'bg-[#96D9D6]',
	fighting: 'bg-[#C22E28]',
	poison: 'bg-[#A33EA1]',
	ground: 'bg-[#E2BF65]',
	flying: 'bg-[#A98FF3]',
	psychic: 'bg-[#F95587]',
	bug: 'bg-[#A6B91A]',
	rock: 'bg-[#B6A136]',
	ghost: 'bg-[#735797]',
	dragon: 'bg-[#6F35FC]',
	dark: 'bg-[#705746]',
	steel: 'bg-[#B7B7CE]',
	fairy: 'bg-[#D685AD]',
};

export function getTypeColoursGradient (types) {
  const colors = {
    normal: '[#A8A77A]',
	  fire: '[#EE8130]',
	  water: '[#6390F0]',
	  electric: '[#F7D02C]',
	  grass: '[#7AC74C]',
	  ice: '[#96D9D6]',
	  fighting: '[#C22E28]',
	  poison: '[#A33EA1]',
	  ground: '[#E2BF65]',
	  flying: '[#A98FF3]',
	  psychic: '[#F95587]',
	  bug: '[#A6B91A]',
	  rock: '[#B6A136]',
	  ghost: '[#735797]',
	  dragon: '[#6F35FC]',
	  dark: '[#705746]',
	  steel: '[#B7B7CE]',
	  fairy: '[#D685AD]',
  }

  const fromColors = {
    normal: 'from-[#A8A77A]',
	  fire: 'from-[#EE8130]',
	  water: 'from-[#6390F0]',
	  electric: 'from-[#F7D02C]',
	  grass: 'from-[#7AC74C]',
	  ice: 'from-[#96D9D6]',
	  fighting: 'from-[#C22E28]',
	  poison: 'from-[#A33EA1]',
	  ground: 'from-[#E2BF65]',
	  flying: 'from-[#A98FF3]',
	  psychic: 'from-[#F95587]',
	  bug: 'from-[#A6B91A]',
	  rock: 'from-[#B6A136]',
	  ghost: 'from-[#735797]',
	  dragon: 'from-[#6F35FC]',
	  dark: 'from-[#705746]',
	  steel: 'from-[#B7B7CE]',
	  fairy: 'from-[#D685AD]',
  }
  const toColors = {
    normal: 'to-[#A8A77A]',
	  fire: 'to-[#EE8130]',
	  water: 'to-[#6390F0]',
	  electric: 'to-[#F7D02C]',
	  grass: 'to-[#7AC74C]',
	  ice: 'to-[#96D9D6]',
	  fighting: 'to-[#C22E28]',
	  poison: 'to-[#A33EA1]',
	  ground: 'to-[#E2BF65]',
	  flying: 'to-[#A98FF3]',
	  psychic: 'to-[#F95587]',
	  bug: 'to-[#A6B91A]',
	  rock: 'to-[#B6A136]',
	  ghost: 'to-[#735797]',
	  dragon: 'to-[#6F35FC]',
	  dark: 'to-[#705746]',
	  steel: 'to-[#B7B7CE]',
	  fairy: 'to-[#D685AD]',
  }
  

  if(types.length === 1) return `bg-${colors[types[0]]}`
  return `bg-gradient-to-b ${fromColors[types[0]]} ${toColors[types[1]]}`
}

