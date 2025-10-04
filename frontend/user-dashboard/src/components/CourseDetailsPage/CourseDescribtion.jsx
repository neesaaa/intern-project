import StarsReadOnly from "../../components/LandingSections/StarReadOnly";
import CodeIcon from "../../assets/CourseDetails/codeIcon.png";

const CourseDescribtion = ({
  name,
  desc,
  rate,
  sections,
  totalHours,
  instructor,
  category,
  ImageUrl
}) => {
  const totalLectures = Array.isArray(sections)
    ? sections.reduce((sum, s) => sum + (s.LecturesNumber || 0), 0)
    : 0;
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="font-bold text-2xl lg:text-[40px]  leading-[140%] tracking-[-0.02em]">
          {name}
        </h1>
        <p className="text-[16px] leading-[160%]">{desc}</p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-3  md:items-center flex-col md:flex-row">
          <div className="flex gap-1    items-center">
            <span className="font-poppins font-medium text-[16px] leading-[120%] text-amber-300">
              {rate}
            </span>
            <StarsReadOnly rating={rate} />
          </div>
          <div className="w-1 h-6 rounded-lg bg-gray-700 hidden md:block"></div>
          <span className="text-[14px] leading-[150%]">
            {totalLectures} Total Lectures. {totalHours} Total Hours. All levels
          </span>
        </div>

        <div className="flex gap-2">
          {instructor.ImageUrl && (
            <img
              src={instructor.ImageUrl}
              alt="Instructor image"
              className="  w-5 rounded-full object-contain"
            />
          )}
          <span className="text-[14px] leading-[150%]">
            created by <span className="text-blue-400">{instructor.Name}</span>
          </span>
        </div>

        <div className="flex gap-3">
          <img src={CodeIcon} alt="" className="w-5 object-contain" />
          <span className="text-[14px] leading-[150%]">{category}</span>
        </div>
      </div>
    </>
  );
};

export default CourseDescribtion;
