
function Money({amount}) {
  return (
    <div className="absolute top-[5px] left-[45%] flex items-center bg-black rounded-[10px] pr-[7px] pl-[3px] py-[3px]">
      <div className="text-[20px]">💰</div>
      <div className="font-bold text-yellow-600 text-[20px]">{amount}</div>
    </div>
  )
}

export default Money