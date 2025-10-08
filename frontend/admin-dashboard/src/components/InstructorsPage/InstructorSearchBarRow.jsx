import SearchBar from "../navbar/SearchBar";
import { MdOutlineFilterList } from "react-icons/md";
import ModalAddorUpdate from "../InstructorsPage/ModalAddorUpdate";
const InstructorSearchBarRow = ({text="Instructors",total,addWhat,course=false,nav,setModalopen,search,setSearchWord,modalOpen,UpdateOrAddMutation}) => {
  return (
    <div className="flex  justify-between items-start px-6 py-8 ">
          <div className="flex gap-2 items-center">
            <h1 className="font-medium text-[24px] leading-[30px]">
              {text}
            </h1>
            <div className=" rounded-xl py-1 px-3 bg-[#EEF0F3]">
              <span className="font-medium text-[16px] text-[#7E8CA0] leading-[100%]">
                {total}
              </span>
            </div>
          </div>

          <div className="flex justify-between gap-2 w-1/2 bg-transparent">
            <button
              onClick={() => course?nav():setModalopen(true)}
              className="bg-black rounded-lg w-full text-white px-6 py-2 max-w-40 cursor-pointer "
            >
              {addWhat}
            </button>
            <SearchBar
              value={search}
              SetSerchWord={setSearchWord}
              withCourses={false}
              classes="flex-grow shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] rounded-xl"
            />
            <button className="p-3 rounded-md shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)]">
              <MdOutlineFilterList className="text-gray-500 roundex-xl  " />
            </button>
            {!course&&<ModalAddorUpdate
              isOpen={modalOpen}
              onClose={() => setModalopen(false)}
              editMutation={UpdateOrAddMutation}
            />} 
          </div>
        </div>
  )
}

export default InstructorSearchBarRow
