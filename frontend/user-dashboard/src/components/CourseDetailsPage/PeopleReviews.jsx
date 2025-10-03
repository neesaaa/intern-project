import img from "../../assets/CourseDetails/markdoe.png";
import { FaStar } from "react-icons/fa";
const Comb = () => {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border_color p-6 flex-grow  w-full shadow shadow-border_color gap-2 lg:gap-30">
      <div className="flex flex-col lg:flex-row w-full gap-3 self-start">
        <img src={img} alt="" className="w-15 h-15 rounded-full" />
        <h5 className="font-semibold text-lg leading-[160%]  self-start lg:self-center ">
          Markk Doe
        </h5>
      </div>
      <div className="flex  flex-col gap-1.5">
        <div className="flex items-center gap-7">
          <div className="flex gap-1 items-center">
          <FaStar className="w-5 text-amber-300" />
          <span className="font-semibold text-lg leading-[160%] ">5</span>
          </div>
          <p className="text-sm leading-[150%] text-right">Reviewed on 22nd March, 2024</p>
        </div>
        <p className="leading-[1.6]">I was initially apprehensive, having no prior design experience. But the instructor, John Doe, did an amazing job of breaking down complex concepts into easily digestible modules. The video lectures were engaging, and the real-world examples really helped solidify my understanding.</p>
      </div>
    </div>
  );
};
const PeopleReviews = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <Comb />
      <Comb />
      <Comb />
      <button className="border border-black cursor-pointer py-2 px-6 w-50 rounded-lg text-sm leading-[1.6]">View more Reviews</button>
    </div>
  );
};

export default PeopleReviews;
