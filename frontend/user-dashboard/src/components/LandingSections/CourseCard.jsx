import { Link } from 'react-router-dom'
import img from '../../assets/HeroSection/6ed60c2c1404cd23c41a9abe4a27d97b90bf3e50.jpg'
import StarReadOnly from './StarReadOnly'
const CourseCard = ({ Name, InstructorName,Rate,TotalLectures,TotalHours,Cost,ImageUrl,Id  }) => {
        return (
            <Link to={`/courses/${Id}`} >
                <div className='flex flex-col  border cursor-pointer border-border_color p-4 gap-3 text-black rounded-xl shadow-[0_0_8px_0_rgba(0,0,0,0.12)] min-w-50 md:min-w-75 scrollbar-hide'>
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
                </div>
            </Link>
        )
    }

export default CourseCard
