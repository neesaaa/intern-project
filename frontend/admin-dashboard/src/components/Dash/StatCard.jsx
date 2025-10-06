
const StatCard = ({text,icon,number}) => {
  return (
    <div className='flex flex-col justify-between p-4 bg-white rounded-lg w-full shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)]'>
      <div className='flex  justify-between'>
        <p className='font-medium text-[32px] leading-[1]'>{number}</p>
        <div className=" p-2 bg-[#58A8DC1F] rounded-lg flex items-center justify-center  ">
          <img src={icon} alt=""  className="w-4 h-4   "/>
        </div>
      </div>
      <div className='font-medium '>{text}</div>
    </div>
  )
}

export default StatCard
