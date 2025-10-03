import StarsReadOnly from "../LandingSections/StarReadOnly";
import img from '../../assets/login/a46d07caf0f76651a4f6375cbce96bf6f8f37721.jpg'
const CartCard = ({CourseName,InstructorName,TotalLectures,TotalHours,Cost,Rate  }) => {
  return (
    <div className="flex border rounded-lg border-border_color justify-between items-center p-4">
      <div className="flex gap-1 items-center">
        <img src={img} alt="" className="w-48 max-h-28 object-cover rounded-md" />
        <div className="flex flex-col gap-2 ">
          <h5 className="font-semibold text-[18px] leading-[160%] tracking-normal align-middle">
            {CourseName}
          </h5>
          <p className="text-[14px] leading-[150%] tracking-normal align-middle">
            by {InstructorName}
          </p>
          <div className="flex flex-row items-center gap-1.5 ">
            <div className="flex gap-1 items-center">
              <span className="font-poppins font-medium text-[16px] leading-[120%] text-amber-300">
                {Rate}
              </span>
              <StarsReadOnly rating={Rate} />
            </div>
            <div className="w-1 h-6 rounded-lg bg-gray-700 hidden md:block"></div>
            <span className="text-[8px] md:text-[14px] leading-[150%]">
              {TotalLectures} Total Lectures. {TotalHours} Total Hours. All levels
            </span>
          </div>
            <button className="text-red-600 font-normal text-[14px] leading-[150%] text-start cursor-pointer  ">Remove</button>
        </div>
      </div>
      <p className="font-semibold md:text-xl lg:text-[24px] leading-[120%] tracking-normal text-right self-start px-2">
        {Cost}$
      </p>
    </div>
  );
};

export default CartCard;
