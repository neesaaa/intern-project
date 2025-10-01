import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const CourseHeader = ({CourseName}) => {
  return (
    <div className="flex items-center indent-1.5  text-sm font-medium gap-1">
          <p className="">Home</p>
          <MdOutlineKeyboardArrowRight />
          <p className="">Courses</p>
          <MdOutlineKeyboardArrowRight />
          <p className="text-blue-500">{CourseName}</p>
    </div>
  )
}

export default CourseHeader
