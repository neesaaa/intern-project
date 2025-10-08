import { Link } from 'react-router-dom'
import StarReadOnly from './StarReadOnly'
const CourseCard = ({ Name, InstructorName,Rate,TotalLectures,TotalHours,Cost,ImageUrl,Id,style,Category  }) => {
        return (
            <Link to={`/courses/${Id}`} >
                <div className={`flex flex-col ${style} relative  border cursor-pointer border-border_color p-4 gap-3 lg:gap-5 text-black rounded-xl shadow-[0_0_8px_0_rgba(0,0,0,0.12)] min-w-40 md:min-w-75 scrollbar-hide`}>
                    {ImageUrl && <img src={ImageUrl  } alt="" className='w-full rounded-lg h-40 object-cover' />}
                    <div className='flex flex-col gap-3 '>
                        <div className='flex flex-col gap-3 '>
                            <div className='flex flex-col gap-3'>
                                <h5 className='font-semibold text-lg leading-relaxed'>{Name}</h5>
                                <h6 className='leading-1.5 text-sm'>By {InstructorName}</h6>
                            </div>
                            <StarReadOnly rating={Rate} />
                            <h5 className='text-sm'>{TotalHours} Total Hours. {TotalLectures} Lectures. Beginner</h5>
                        </div>
                        <h4 className='font-semibold leading-1.5'>${Cost}</h4>
                    </div>
                    <div className='absolute top-5 left-5 px-4 py-2  z-50 bg-[#EEF2FF] rounded-lg  md:hidden lg:flex items-center justify-center'>
                        <span className='font-medium text-[14px] leading-[14px] text-[#5879DC]'>{Category}    </span>
                    </div>
                </div>
            </Link>
        )
    }

export default CourseCard
