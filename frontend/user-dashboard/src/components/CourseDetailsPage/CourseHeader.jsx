import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const CourseHeader = ({lecel1="Home",level2="Courses",CourseName}) => {
  return (
    <div className="flex items-center indent-1.5  text-sm font-medium gap-1">
          <p className="">{lecel1}</p>
          <MdOutlineKeyboardArrowRight />
          <p className="">{level2}</p>
          <MdOutlineKeyboardArrowRight />
          <p className="text-blue-500">{CourseName}</p>
    </div>
  )
}

export default CourseHeader
