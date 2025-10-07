import Header from "../components/Dash/Header";
import SearchBar from "../components/navbar/SearchBar";
import { MdOutlineFilterList } from "react-icons/md";
import InstructorsTable from "../components/InstructorsPage.jsx/InstructorsTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import ModalAddorUpdate from "../components/InstructorsPage.jsx/ModalAddorUpdate";
import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/authAtom";
import { toast } from "react-toastify";

const Instructorspage = () => {
  const queryClient = useQueryClient();
  const [search, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalopen] = useState(false);
  const [token,_]=useAtom(tokenAtom)
  const { data, isLoading, error } = useQuery({
    queryKey: ["instructors", currentPage, search],
    queryFn: async () => {
      const res = await fetch(
        `https://localhost:7031/api/Course/Instructors?IsPagingEnabled=true&Skip=${currentPage}&Take=7&Filter=${search}`
      );
      if (!res.ok) throw new Error("Failed to fetch instructors");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });


  const UpdateOrAddMutation=useMutation({
    mutationKey:['instructors'],
    mutationFn:async(instructor)=>{
        const res=await fetch(`https://localhost:7031/api/Course/Instructor/AddOrUpdate`,{
          method:'post',
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body:JSON.stringify(instructor)
        });
        if(!res.ok)
            throw new Error;
        return res.json(); ;
    },
    onError:()=>{
      toast.error('Failed to update or add')
    },
    onSuccess:(instructor)=>{
        if (instructor.Id !== null) toast.success("Instructor updated successfully!");
        else toast.success("Instructor added successfully!"); 
        queryClient.invalidateQueries(["instructors"]); 
    }
  })

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const instructors = data.items ?? [];
  const totalPages = Math.ceil(data.totalCount / data.pageSize);
  console.log(data);
  return (
    <div className="text-black flex flex-col py-8 px-10 bg-[#FCFCFC] h-full shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] gap-4 ">
      <Header h1={"Instructors"} />
      <div className="flex flex-col bg-white justify-between rounded-lg gap-6 ">
        <div className="flex  justify-between items-start px-6 py-8 ">
          <div className="flex gap-2 items-center">
            <h1 className="font-medium text-[24px] leading-[30px]">
              Instructors
            </h1>
            <div className=" rounded-xl py-1 px-3 bg-[#EEF0F3]">
              <span className="font-medium text-[16px] text-[#7E8CA0] leading-[100%]">
                200
              </span>
            </div>
          </div>

          <div className="flex justify-between gap-2 w-1/2">
            <button
              onClick={() => setModalopen(true)}
              className="bg-black rounded-lg w-full text-white px-6 py-2 max-w-40 cursor-pointer "
            >
              Add Instructor
            </button>
            <SearchBar
              value={search}
              SetSerchWord={setSearchWord}
              withCourses={false}
              classes="flex-grow shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] rounded-xl"
            />
            <button className="p-3 roundex-lg shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)]">
              <MdOutlineFilterList className="text-gray-500 " />
            </button>
            <ModalAddorUpdate
              isOpen={modalOpen}
              onClose={() => setModalopen(false)}
              editMutation={UpdateOrAddMutation}
            />
          </div>
        </div>
        <InstructorsTable instructors={instructors} mutation={UpdateOrAddMutation}/>

        {/* pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-9 w-9 rounded ${
                  currentPage === page
                    ? "bg-gray-500 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Instructorspage;
