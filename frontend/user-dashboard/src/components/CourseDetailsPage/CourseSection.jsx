
const CourseSection = ({lecs,hrs,main}) => {
  return (
    <div className='flex items-center p-6 justify-between border border-gray-200'>
      <h5 className='font-semibold text-lg leading-[160%]'>{main}</h5>
      <div className='flex gap-4 items-center text-sm leading-[150%] align-middle'>
        <span >{lecs} Lectures</span>
        <span>{hrs} Hours</span>
      </div>
    </div>
  )
}

export default CourseSection
