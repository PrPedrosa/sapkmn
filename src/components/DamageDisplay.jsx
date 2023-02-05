import React from 'react'

function DamageDisplay({isFighting, showStats, damagesModifier, fight}) {
  return (
    <>
      <div className='absolute top-[25%] left-[40%] grid grid-cols-[150px_150px] gap-[10px] border h-[50px] text-center'>
        {damagesModifier && isFighting && damagesModifier.reverse().map((dmg, i) => {
          if(dmg === 0.5 || dmg === 0.25){
            return <div key={i} className="border">Not very effective!</div>
          }
          if(dmg === 2 || dmg === 4){
            return <div key={i} className="border">Super effective!</div>
          }
          {/* else return <div className="border">Normal</div> */}
        })}
      </div>
      {showStats && damagesModifier &&
      <div className='absolute top-[30%] left-[40%] grid grid-cols-[8.20vw_8.20vw] gap-[6vw] border h-[50px]'>
       <div className='border text-right'>- {Math.floor(fight.enemyTeam.team[0].pokemon.stats.att >= fight.enemyTeam.team[0].pokemon.stats.spAtt ? fight.enemyTeam.team[0].pokemon.stats.att * damagesModifier[0] : fight.enemyTeam.team[0].pokemon.stats.spAtt * damagesModifier[0])}</div>   
       <div className='border text-left'>- {Math.floor(fight.team.team[0].pokemon.stats.att >= fight.team.team[0].pokemon.stats.spAtt ? fight.team.team[0].pokemon.stats.att * damagesModifier[1] : fight.team.team[0].pokemon.stats.spAtt * damagesModifier[1])}</div> 
      </div>}

    </>
  )
}

export default DamageDisplay