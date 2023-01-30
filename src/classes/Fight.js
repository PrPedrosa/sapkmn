import { allPokemon } from "../db";
import { PokeTeam } from "./PokeTeam";
import { Pokemon } from "./Poke";

export class Fight {
    constructor(ctx, canvasW, canvasH, playerTeam){
        this.startTime;
        this.elapsedTime = 0;
        this.animationId;
        this.frames = 0;
        this.ctx = ctx;       
        this.canvasW = canvasW;
        this.canvasH = canvasH;
        //starting positions for the teams in canvas
        this.startPosX = this.canvasW/2 -10
        this.startPosY = this.canvasH/2 - this.canvasW/15
        this.enemyStartPosX = this.canvasW/2 +10
        this.enemyStartPosY = this.canvasH/2 - this.canvasW/15

        this.team = new PokeTeam(this.ctx, this.canvasW, this.canvasH, false, this.startPosX, this.startPosY, this.parseTeam(playerTeam).reverse())
        this.enemyTeam = new PokeTeam(this.ctx, this.canvasW, this.canvasH, true, this.enemyStartPosX, this.enemyStartPosY)

        this.fightIterations = 0;
        this.enemyFightIterations = 0;

        this.animating = false
        this.fighting = false
        this.fightStatus = "running"
    }

    parseTeam(team){
        const filteredTeam = team.filter(poke => poke)
        return filteredTeam.map(poke => new Pokemon(this.ctx, JSON.parse(JSON.stringify(poke)), this.startPosX, this.startPosY, this.canvasW))
    }

    battleAnimation = () => {
        if(this.animating === true){
            this.team.team[0].battleAnimation(this.frames, false)
            this.enemyTeam.team[0].battleAnimation(this.frames, true)
        }
        if(this.frames % 60 === 0 && this.frames !== 0){
            this.animating = false
            this.fighting = true
        }
    }

    fight(){
        const frontPoke = this.team.team[0].pokemon
        const enemyFrontPoke = this.enemyTeam.team[0].pokemon

        if(this.fightIterations < enemyFrontPoke.stats.att){
            frontPoke.stats.hp -= 1
            this.fightIterations++
        }
        if(this.enemyFightIterations < frontPoke.stats.att){
            enemyFrontPoke.stats.hp -= 1
            this.enemyFightIterations++
        }
        if(this.fightIterations === enemyFrontPoke.stats.att && this.enemyFightIterations === frontPoke.stats.att){
            if(enemyFrontPoke.stats.hp <= 0){
                this.enemyTeam.team.shift()
            }
            if(frontPoke.stats.hp <= 0){
                this.team.team.shift()
            }
            this.fightIterations = 0;
            this.enemyFightIterations = 0;
            this.fighting = false;
            this.animating = true
        }
    }

    middleLine(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvasW/2, 0)
        this.ctx.lineTo(this.canvasW/2, this.canvasH);
        this.ctx.stroke()
        this.ctx.closePath();
    }

    update = () => {
        //check game over
        if(this.team.team.length === 0 || this.enemyTeam.team.length === 0){
            if(this.team.team.length === 0 && this.enemyTeam.team.length !== 0){
                this.fightStatus = "lose"
            }
            if(this.team.team.length !== 0 && this.enemyTeam.team.length === 0){
                this.fightStatus = "win"
            }
            if(this.team.team.length === 0 && this.enemyTeam.team.length === 0){
                this.fightStatus = "draw"
            }
            //cancelAnimationFrame(this.animationId)
        }
        //this.elapsedTime = +((timestamp - this.startTime)*0.001).toFixed(1) // time in seconds (0.0s)
        this.elapsedTime ++

        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
        this.middleLine()
        
        this.team.draw()
        this.enemyTeam.draw()
        if(this.elapsedTime === 1){
            this.animating = true
        }
        if(this.elapsedTime > 1 && this.animating && this.team.team.length !== 0 && this.enemyTeam.team.length !== 0){
            this.frames ++
            this.battleAnimation()    
        }
        if(this.fighting){
            this.fight()
            if(this.frames){
                this.frames = 0
            }
        }
        
        return this
        //this.animationId = requestAnimationFrame(this.update)
    }

    start(){
        this.update();

    }
}