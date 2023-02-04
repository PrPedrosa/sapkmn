import { capitalize } from '../utils/utilities'

function PokeImageWithName({img, name}) {
  return (
    <div className="relative">
        <img src={img} draggable="false" className="px-[0.8vw] pb-[10px]"/>
        <p className="text-center text-[14px] absolute bottom-0 w-[100%] font-[500]">{capitalize(name)}</p>
    </div>
  )
}

export default PokeImageWithName