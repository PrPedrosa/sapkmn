import classNames from "classnames"

function GameInfo({money, round, lifes, className}) {
  return (
    <div className={classNames("flex border border-white bg-gray-400 p-[4px] gap-[5px] rounded-[5px]", className)}>
        {round && <InfoTag info={round} label={"⏳"}/>}
        {lifes && <InfoTag info={lifes} label={"❤️"}/>}
        {money && <InfoTag info={money} label={"💰"}/>}
    </div>
  )
}

function InfoTag({info, label}) {
  return(
    <div className="bg-black rounded-[5px] p-[4px]">
      <span className="text-[20px]">{label}</span>
      <span className="font-bold text-yellow-500 text-[20px] tracking-tight">{info}</span>
    </div>
  )
}

export default GameInfo