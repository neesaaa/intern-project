import InstructorCard from './InstructorCard'

const InstructorCardHolder = ({ref}) => {
    return (
        <div className='flex justify-between overflow-x-auto p-4 scrollbar-hide scroll-smooth  gap-2' ref={ref} >
            <InstructorCard />
            <InstructorCard />
            <InstructorCard />
            <InstructorCard />
            <InstructorCard />
        </div>
    )
}

export default InstructorCardHolder
