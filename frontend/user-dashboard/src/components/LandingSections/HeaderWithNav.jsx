import right from '../../assets/HeroSection/right.png'
import left from '../../assets/HeroSection/left.png'
const HeaderWithNav = ({ h1, scrollRef }) => {
    const scroll = (offset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: offset,
                behavior: 'smooth'
            });
        }
    };
    return (
        <div className='flex text-black leading-1.4 font-semibold text-2xl px-2 items-center justify-between'>
            <h1 className='max-w-50 md:max-w-80 '>{h1} </h1>
            <div className='flex items-center gap-6'>
                <button className='bg-slate-400  rounded-lg px-4 py-2' onClick={()=> scroll(-1*window.innerWidth)}><img src={left} alt="left arrow icon" /></button>
                <button className='bg-slate-400 rounded-lg px-4 py-2' onClick={()=> scroll(window.innerWidth)}><img src={right} alt="right arrow icon" /></button>
            </div>
        </div>
    )
}

export default HeaderWithNav
