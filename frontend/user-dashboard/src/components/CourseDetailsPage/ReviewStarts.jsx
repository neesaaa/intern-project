import StarReadOnly from "../LandingSections/StarReadOnly";
import { FaStar } from "react-icons/fa";
const Comp = ({ rate, precentage }) => {
  return (
    <div className="flex items-center gap-2">
      <StarReadOnly rating={rate} />
      <span className="font-poppins font-normal text-sm leading-[120%] align-middle text-gray-700">
        {precentage}
      </span>
    </div>
  );
};
const ReviewStarts = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex gap-2 items-center">
        <FaStar className="w-5 text-amber-300" />
        <h2 className="font-semibold text-xl leading-[140%]">4.6</h2>
        <span className="text-sm leading-5 align-middle self-end">
          146,951 reviews
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <Comp rate={5} precentage={"80%"} />
        <Comp rate={4} precentage={"10%"} />
        <Comp rate={3} precentage={"5%"} />
        <Comp rate={2} precentage={"3%"} />
        <Comp rate={1} precentage={"2%"} />
      </div>
    </div>
  );
};

export default ReviewStarts;
