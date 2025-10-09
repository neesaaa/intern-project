import StarReadOnly from "../InstructorsPage/StarReadOnly";
import { Eye, Pencil, Trash2, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { DeleteModal } from "../InstructorsPage/DeleteModal";

const CourseCard = ({
  Name,
  InstructorName,
  Rate,
  TotalLectures,
  TotalHours,
  Cost,
  ImageUrl,
  Id,
  style,
  Category,
  deleteMutation
}) => {
  const[openmodal,setOpenModal]=useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={`flex relative flex-col ${style}  border  border-border_color p-4 gap-3 lg:gap-5 text-black rounded-xl shadow-[0_0_8px_0_rgba(0,0,0,0.12)] min-w-40 md:min-w-60 h-full scrollbar-hide`}
    >
      {ImageUrl && (
        <img
          src={ImageUrl}
          alt=""
          className="w-full rounded-lg h-40 object-cover"
        />
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 ">
          <div className="flex flex-col gap-3">
            <h5 className="font-semibold text-lg leading-relaxed">{Name}</h5>
            <h6 className="leading-1.5 text-sm">By {InstructorName}</h6>
          </div>
          <StarReadOnly rating={Rate} />
          <h5 className="text-sm">
            {TotalHours} Total Hours. {TotalLectures} Lectures. Beginner
          </h5>
        </div>
        <h4 className="font-semibold leading-1.5">${Cost}</h4>
      </div>
      <div className="flex items-center gap-2">
        <button className="h-8 w-8 cursor-pointer flex items-center justify-center rounded-md  border border-[#F1F3F9] shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] hover:bg-gray-200 hover:scale-110">
          <Eye className="h-4 w-4 text-blue-500" />
        </button>
        <button
          onClick={() => navigate(`/${Id}/edit`)}
          className="h-8 w-8 cursor-pointer flex items-center justify-center rounded-md  border border-[#F1F3F9] shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] hover:bg-gray-200 hover:scale-110"
        >
          <Pencil className="h-4 w-4 text-blue-500" />
        </button>
        <button className="h-8 w-8 cursor-pointer flex items-center justify-center rounded-md  border border-[#F1F3F9] shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] hover:bg-gray-200 hover:scale-110">
          <Trash2 className="h-4 w-4 text-red-500" onClick={()=>setOpenModal(true)} />
        </button>
      </div>
      <div className="absolute top-5 left-5 px-4 py-2  z-50 bg-[#EEF2FF] rounded-lg md:hidden lg:flex items-center justify-center ">
        <span className="font-medium text-[14px] leading-[14px] text-[#5879DC]">
          {Category}{" "}
        </span>
      </div>
      <DeleteModal key={`Course-${Id}`} isOpen={openmodal} onClose={()=>setOpenModal(false)} onConfirm={()=> deleteMutation.mutate(Id)} type="Course" employeeName={Name} />
    </div>
  );
};

export default CourseCard;
