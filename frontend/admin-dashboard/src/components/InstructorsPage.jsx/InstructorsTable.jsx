import { toast } from "react-toastify";
import TableHeader from "./TableHeader.jsx";
import TableRow from "./TableRow.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { tokenAtom } from "../../atoms/authAtom.js";
import { useState } from "react";
import ModalAddorUpdate from './ModalAddorUpdate.jsx'

export default function InstructorsTable({ instructors ,mutation }) {
  const queryClient = useQueryClient();
  const [token, _] = useAtom(tokenAtom);
  const [instructorr ,setinstructor]=useState(null);

  const deleteInstructorMutation = useMutation({
    mutationFn: async (id) => {
      mutationKey:['instructors',id]
      const res = await fetch(
        `https://localhost:7031/api/Course/Instructor/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to delete instructor");
      return;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete instructor");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["instructors"]);
      toast.success("deleted successfully");
    },
  });


  const [updatemodal,setUpdatemodal]=useState(false)
  const [viewmodal,setviewmodal]=useState(false)

  const handleDelete = (id) => {
    deleteInstructorMutation.mutate(id);
  };

  const HandleUpdate=(instructor)=>{
    setinstructor(instructor);
    setUpdatemodal(true);

  }
  const ViewUpdate=(instructor)=>{
    setinstructor(instructor);
    setviewmodal(true);

  }

  return (
    <div className="w-full px-6 rounded-t-lg py-2">
      <div className="rounded-t-lg ">
        <table className="w-full rounded-t-2xl ">
          <TableHeader />
          <tbody>
            {instructors.map((instructor) => (
              <TableRow
                key={instructor.Id}
                name={instructor.Name}
                jobTitle={instructor.Title || "N/A"}
                rate={instructor.Rate}
                imageUrl={instructor.ImageUrl}
                onView={() => ViewUpdate(instructor)}
                onEdit={() => HandleUpdate(instructor)}
                onDelete={() => handleDelete(instructor.Id)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {instructorr   &&<ModalAddorUpdate isOpen={updatemodal} isEdit={true}  instructor={instructorr} onClose={()=>setUpdatemodal(false)} editMutation={mutation}/>}
      {instructorr   &&<ModalAddorUpdate isOpen={viewmodal} isView={true}  instructor={instructorr} onClose={()=>setviewmodal(false)}/>}

    </div>
  );
}
