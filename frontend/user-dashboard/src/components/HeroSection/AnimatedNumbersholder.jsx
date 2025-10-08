import AnimatedNumber from './AnimatedNumber'

const AnimatedNumbersholder = () => {
    return (
        <div className='w-full flex flex-col md:flex-row items-center justify-between bg-slate-50 px-1 py-7 md:px-5 md:py-6 lg:px-20 lg:py-10 text-gray-900 text-xl md:text-3xl mt-20 '>
            <AnimatedNumber h1={250} duration={1} divider />
            <AnimatedNumber h1={1000} duration={1.2} divider />
            <AnimatedNumber h1={15} duration={1.8} divider />
            <AnimatedNumber h1={2400} duration={2.5} />
        </div>
    )
}

export default AnimatedNumbersholder
