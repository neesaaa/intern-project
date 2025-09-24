import img from '../../assets/HeroSection/6ed60c2c1404cd23c41a9abe4a27d97b90bf3e50.jpg'
import StarReadOnly from './StarReadOnly'
const CourseCard = ({ imge, price }) => {
    return (
        <div className='flex flex-col  border border-border_color p-4 gap-3 text-black rounded-xl shadow-[0_0_8px_0_rgba(0,0,0,0.12)] min-w-50 md:min-w-75 scrollbar-hide'>
            <img src={img} alt="" className='w-full rounded-lg h-40 object-cover' />
            <div className='flex flex-col gap-3 '>
                <div className='flex flex-col gap-3 '>
                    <div className='flex flex-col gap-3'>
                        <h5 className='font-semibold text-lg leading-relaxed'>Beginner’s Guide to Design</h5>
                        <h6 className='leading-1.5 text-sm'>By Ronald Richards</h6>
                    </div>
                    <StarReadOnly rating={3.5} />
                    <h5 className='text-sm'>22 Total Hours. 155 Lectures. Beginner</h5>
                </div>
                <h4 className='font-semibold leading-1.5'>${price}</h4>
            </div>

        </div>
    )
}

export default CourseCard
