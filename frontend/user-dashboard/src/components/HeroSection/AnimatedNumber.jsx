import { useEffect, useState } from "react";
import { animate } from "framer-motion";
const AnimatedNumber = ({ h1, divider, duration }) => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, h1, {
            duration,
            ease: "easeOut",
            onUpdate: (v) => setValue(Math.floor(v)),
        });

        return () => controls.stop();
    }, [h1, duration]);
    return (
        <>
            <div className='flex flex-col leading-[130%] items-center w-full justify-around  gap-2'>
                <h1 className='font-semibold'>{value}+</h1>
                <h2 className='text-sm text-center md:text-base leading-[150%] inline'>Courses by our best mentors</h2>
            </div>
            {divider && <div className="hidden md:block w-4 h-10 bg-gray-300 rounded-full  mx-1 md:mx-2  "></div>}
        </>
    )
}

export default AnimatedNumber
