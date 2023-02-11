import React from 'react'

function DamageDisplay({isFighting, showStats, damagesModifier, fight}) {
  return (
    <>
      <div className='absolute top-[25%] left-[40%] grid grid-cols-[9.9vw_9.9vw] gap-[1vw] text-center'>
        {damagesModifier && damagesModifier.reverse().map((dmg, i) => {
          if(dmg === 0.5 || dmg === 0.25){
            return <div key={i} className="px-[2px] py-[1px] rounded-lg bg-black text-white">Not very effective!</div>
          }
          if(dmg === 2 || dmg === 4){
            return <div key={i} className="px-[2px] py-[1px] rounded-lg bg-black text-white">Super effective!</div>
          }
          else return <div className="invisible"></div>
        })}
      </div>
      {showStats && damagesModifier &&
      <div className='absolute top-[30%] left-[47%] flex gap-[6vw]'>
       <div className='text-right bg-red-500 px-[2px] py-[1px] rounded-lg'>- {Math.floor(fight.enemyTeam.team[0].pokemon.stats.att >= fight.enemyTeam.team[0].pokemon.stats.spAtt ? fight.enemyTeam.team[0].pokemon.stats.att * damagesModifier[0] : fight.enemyTeam.team[0].pokemon.stats.spAtt * damagesModifier[0])}</div>   
       <div className='text-left bg-red-500 px-[2px] py-[1px] rounded-lg'>- {Math.floor(fight.team.team[0].pokemon.stats.att >= fight.team.team[0].pokemon.stats.spAtt ? fight.team.team[0].pokemon.stats.att * damagesModifier[1] : fight.team.team[0].pokemon.stats.spAtt * damagesModifier[1])}</div> 
      </div>}

    </>
  )
}

export default DamageDisplay