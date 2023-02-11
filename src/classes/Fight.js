import { allPokemon } from "../db";
import { PokeTeam } from "./PokeTeam";
import { Pokemon } from "./Poke";
import { typeChart } from "../utils/type-chart";

export class Fight {
    constructor(ctx, canvasW, canvasH, playerTeam, enemyTeam){
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
        this.enemyTeam = new PokeTeam(this.ctx, this.canvasW, this.canvasH, true, this.enemyStartPosX, this.enemyStartPosY, this.parseEnemyTeam(enemyTeam))

        this.fightIterations = 0;
        this.enemyFightIterations = 0;
        this.damages = []

        this.animating = false
        this.fighting = false
        this.fightStatus = "running"

        this.showNewState = false
        this.stateShownTimer = 0
        this.endstateShownTimer = 0
        this.showStats = false

        this.gameOver = false

    }

    parseTeam(team){
        const filteredTeam = team.filter(poke => poke)
        return filteredTeam.map(poke => new Pokemon(this.ctx, JSON.parse(JSON.stringify(poke)), this.startPosX, this.startPosY, this.canvasW))
    }
    parseEnemyTeam(team){
        const filteredTeam = team.filter(poke => poke)
        return filteredTeam.map(poke => new Pokemon(this.ctx, JSON.parse(JSON.stringify(poke)), this.enemyStartPosX, this.enemyStartPosY, this.canvasW))
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

    getTypesModifier(poke, enemyPoke){
        let typeModifier, enemyTypeModifier
        if(enemyPoke.types.length === 2){
            typeModifier = typeChart[enemyPoke.types[0]][poke.types[0]] * typeChart[enemyPoke.types[1]][poke.types[0]]
        } else {
            typeModifier = typeChart[enemyPoke.types[0]][poke.types[0]]
        }

        if(poke.types.length === 2){
            enemyTypeModifier = typeChart[poke.types[0]][enemyPoke.types[0]] * typeChart[poke.types[1]][enemyPoke.types[0]]
        } else {
            enemyTypeModifier = typeChart[poke.types[0]][enemyPoke.types[0]]
        }
        return [typeModifier, enemyTypeModifier]
    }

    fight(){
        const frontPoke = this.team.team[0].pokemon
        const enemyFrontPoke = this.enemyTeam.team[0].pokemon
        this.damages = this.getTypesModifier(frontPoke, enemyFrontPoke)
        //check if using ATT or SPATT
        if(frontPoke.stats.att >= frontPoke.stats.spAtt && enemyFrontPoke.stats.att >= enemyFrontPoke.stats.spAtt){
            this.fightAttVsAtt(frontPoke, enemyFrontPoke)
        }
        if(frontPoke.stats.att >= frontPoke.stats.spAtt && enemyFrontPoke.stats.att < enemyFrontPoke.stats.spAtt){
            this.fightAttVsSpAtt(frontPoke, enemyFrontPoke)
        }
        if(frontPoke.stats.att < frontPoke.stats.spAtt && enemyFrontPoke.stats.att >= enemyFrontPoke.stats.spAtt){
            this.fightSpAttVsAtt(frontPoke, enemyFrontPoke)
        }
        if(frontPoke.stats.att < frontPoke.stats.spAtt && enemyFrontPoke.stats.att < enemyFrontPoke.stats.spAtt){
            this.fightSpAttVsSpAtt(frontPoke, enemyFrontPoke)
        }
    }

    fightAttVsAtt(poke, enemyPoke){
        if(this.fightIterations < enemyPoke.stats.att){
            poke.stats.hp -= this.damages[1]
            this.fightIterations++
        }
        if(this.enemyFightIterations < poke.stats.att){
            enemyPoke.stats.hp -= this.damages[0]
            this.enemyFightIterations++
        }
        if(this.fightIterations === enemyPoke.stats.att && this.enemyFightIterations === poke.stats.att){
            if(this.stateShownTimer === 0){
                this.showNewState = true
            }
            this.startShowNewState()
            
           if(!this.showNewState){
               if(enemyPoke.stats.hp <= 0){
                   this.enemyTeam.team.shift()
               }
               if(poke.stats.hp <= 0){
                   this.team.team.shift()
               }
               this.fightIterations = 0;
               this.enemyFightIterations = 0;
               this.fighting = false;
               this.animating = true
            }
        
        }
    }

    fightAttVsSpAtt(poke, enemyPoke){
        if(this.fightIterations < enemyPoke.stats.spAtt){
            poke.stats.hp -= this.damages[1]
            this.fightIterations++
        }
        if(this.enemyFightIterations < poke.stats.att){
            enemyPoke.stats.hp -= this.damages[0]
            this.enemyFightIterations++
        }
        if(this.fightIterations === enemyPoke.stats.spAtt && this.enemyFightIterations === poke.stats.att){
            if(this.stateShownTimer === 0){
                this.showNewState = true
            }
            this.startShowNewState()

            if(!this.showNewState){
                if(enemyPoke.stats.hp <= 0){
                    this.enemyTeam.team.shift()
                }
                if(poke.stats.hp <= 0){
                    this.team.team.shift()
                }
                this.fightIterations = 0;
                this.enemyFightIterations = 0;
                this.fighting = false;
                this.animating = true
            }

        }
    }

    fightSpAttVsAtt(poke, enemyPoke){
        if(this.fightIterations < enemyPoke.stats.att){
            poke.stats.hp -= this.damages[1]
            this.fightIterations++
        }
        if(this.enemyFightIterations < poke.stats.spAtt){
            enemyPoke.stats.hp -= this.damages[0]
            this.enemyFightIterations++
        }
        if(this.fightIterations === enemyPoke.stats.att && this.enemyFightIterations === poke.stats.spAtt){
            if(this.stateShownTimer === 0){
                this.showNewState = true
            }
            this.startShowNewState()


            if(!this.showNewState){
                if(enemyPoke.stats.hp <= 0){
                    this.enemyTeam.team.shift()
                }
                if(poke.stats.hp <= 0){
                    this.team.team.shift()
                }
                this.fightIterations = 0;
                this.enemyFightIterations = 0;
                this.fighting = false;
                this.animating = true
            }
        }
    }

    fightSpAttVsSpAtt(poke, enemyPoke){
        if(this.fightIterations < enemyPoke.stats.spAtt){
            poke.stats.hp -= this.damages[1]
            this.fightIterations++
        }
        if(this.enemyFightIterations < poke.stats.spAtt){
            enemyPoke.stats.hp -= this.damages[0]
            this.enemyFightIterations++
        }
        if(this.fightIterations === enemyPoke.stats.spAtt && this.enemyFightIterations === poke.stats.spAtt){
            if(this.stateShownTimer === 0){
                this.showNewState = true
            }
            this.startShowNewState()


            if(!this.showNewState){
                if(enemyPoke.stats.hp <= 0){
                    this.enemyTeam.team.shift()
                }
                if(poke.stats.hp <= 0){
                    this.team.team.shift()
                }
                this.fightIterations = 0;
                this.enemyFightIterations = 0;
                this.fighting = false;
                this.animating = true
            }
        }
    }


    startShowNewState(){
        if(this.stateShownTimer === 0) {
            this.stateShownTimer = this.elapsedTime
            this.endstateShownTimer = this.stateShownTimer +  80//frames to continue with below animation
        }
        
        if(this.stateShownTimer === this.endstateShownTimer){
            this.stateShownTimer = 0
            this.endstateShownTimer = 0
            this.showNewState = false
            this.showStats = false
        } else {
            this.animateStatsState()
            this.stateShownTimer ++
        }
    }

    animateStatsState(){
        this.showStats = true
    }

    drawMiddleLine(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvasW/2, 0)
        this.ctx.lineTo(this.canvasW/2, this.canvasH);
        this.ctx.stroke()
        this.ctx.closePath();
    }

    update = (startTime, time) => {
        //check game over
        if(this.team.team.length === 0 || this.enemyTeam.team.length === 0){
            if(this.team.team.length === 0 && this.enemyTeam.team.length !== 0){
                this.fightStatus = "lost"
            }
            if(this.team.team.length !== 0 && this.enemyTeam.team.length === 0){
                this.fightStatus = "won"
            }
            if(this.team.team.length === 0 && this.enemyTeam.team.length === 0){
                this.fightStatus = "draw"
            }
            this.gameOver = true
        }

        this.elapsedTime = +((time - startTime)*0.001).toFixed(1) // time in seconds (0.0s)
        this.ctx.clearRect(0, 0, this.canvasW, this.canvasH)
        this.drawMiddleLine()
        
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