import instructorImg from '../../assets/HeroSection/3bc5d9f9ab3038f8d90aa12ffe88c04090262b02.png'
import { FaStar } from "react-icons/fa";
const InstructorCard = ({ Rate, ImageUrl, Name, Title }) => {
    return (
        <div className="flex flex-col items-center gap-4 p-4 min-w-56 md:max-w-57 lg:max-w-67 xl:max-w-77  shadow-[0_0_8px_0_rgba(0,0,0,0.12)] text-black border border-border_color rounded-lg">
            <img src={ImageUrl} alt="" className='w-55 object-cover h-36 object-top rounded-b-lg ' />
            <div className='flex flex-col gap-2 text-center'>
                <h5 className='font-semibold leading-1.6 text-lg'>{Name}</h5>
                <p className='leading-1.4 text-sm '>{Title}</p>
            </div>
            <div className='bg-border_color h-1 w-full rounded-full '></div>
            <div className='flex justify-between w-full'>
                <div className='flex gap-1 items-center'>
                    <FaStar className="text-yellow-400 w-6 h-6" />
                    <p className='font-semibold '>{Rate}</p>
                </div>
                <p className='font-semibold text-sm'>
                    4200 Students
                </p>
            </div>

        </div>
    )
}

export default InstructorCard
