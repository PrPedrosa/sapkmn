import { allPokemon } from "../db";
import { Pokemon } from "./Poke";

export class PokeTeam {
    constructor(ctx, canvasW, canvasH, isEnemy, startPosX, startPosY, team = []){
        this.pokeArr = [...allPokemon]
        this.ctx = ctx;
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        this.team = team
        this.startPosX = startPosX;
        this.startPosY = startPosY
        this.isEnemy = isEnemy;
        this.team.length === 0 ? this.generateRandomTeam(6) : null
        
    }

    generateRandomTeam(n){
        if(n > 6 || n <= 0) throw new Error("number of Pokemon must be between 0 and 6");
        
        const getRandomPoke = () => JSON.parse(JSON.stringify(this.pokeArr[Math.floor(Math.random()*152)]))

        for(let i = 0; i < n; i++){
            this.team.push(new Pokemon(this.ctx, getRandomPoke(), this.startPosX, this.startPosY, this.canvasW))
        }
    }

    draw(){
        this.team.forEach((poke, i) => {
            if(poke) {
                poke.draw((this.canvasW/15)*(+`${i}.${i}`), this.isEnemy)
            } else return
        })
        this.drawStats()
    }

    drawStats(){
        this.team.forEach((poke, i) => {
            if(poke) {
                if(!this.isEnemy){
                    poke.drawStats((this.canvasW/15)*(+`${i}.${i}`))
                } else {
                    poke.drawStats((-this.canvasW/15)*(+`${i+1}.${i}`))
                }
            } else return
        })
    }
}