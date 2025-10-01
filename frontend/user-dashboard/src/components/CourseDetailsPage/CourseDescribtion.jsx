import StarsReadOnly from "../../components/LandingSections/StarReadOnly";
import CodeIcon from "../../assets/CourseDetails/codeIcon.png";

const CourseDescribtion = () => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="font-bold text-[40px] leading-[140%] tracking-[-0.02em]">
          Intro too snmkdns dskdn skdnsk dskdh
        </h1>
        <p className="text-[16px] leading-[160%]">
          No! All of the paragraphs in the generator are written by humans, not computers. When first building this generator we thought about using computers to generate the paragraphs, but they weren't very good and many times didn't make any sense at all. We therefore took the time to create paragraphs specifically for this generator to make it the best that we could.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex gap-3 items-center">
          <div className="flex gap-1   items-center">
            <span className="font-poppins font-medium text-[16px] leading-[120%] text-amber-300">
              4.5
            </span>
            <StarsReadOnly rating={4.5} />
          </div>
          <div className="w-1 h-6 rounded-lg bg-gray-700"></div>
          <span className="text-[14px] leading-[150%]">
            of the paragraphs in the generator are written by human
          </span>
        </div>
        
        <div className="flex gap-2">
          <img src={CodeIcon} alt="Course Thumbnail w-5 rounded-full object-contain" />
          <span className="text-[14px] leading-[150%]">created by <span className="text-blue-400">sdsdsd</span></span>
        </div>

        <div className="flex gap-3">
          <img src={CodeIcon} alt="" className="w-5 object-contain"/>
          <span className="text-[14px] leading-[150%]">Ui/UX</span>
        </div>
      </div>
    </>
  );
};

export default CourseDescribtion;
