
const Herotext = ({allowExpand , style,buttonText ,buttonStyle ,h1 ,h2}) => {
    return (
        <div className={`flex flex-col items-center md:items-start ${allowExpand ? 'flex-1':''} gap-6 ${style}`}>
            <h1 className='text-black font-bold text-xl text-[40px] leading-[1.2]'>{h1}</h1>
            <h2 className='text-black '>{h2} </h2>
            <button className={`px-6 py-2 rounded-xl max-w-80 font-bold cursor-pointer text-white ${buttonStyle}`}>{buttonText}</button>
        </div>
    )
}

export default Herotext
