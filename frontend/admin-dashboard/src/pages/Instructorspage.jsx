import Header from "../components/Dash/Header";
import InstructorsTable from "../components/InstructorsPage/InstructorsTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/authAtom";
import { toast } from "react-toastify";
import InstructorSearchBarRow from "../components/InstructorsPage/InstructorSearchBarRow";

const Instructorspage = () => {
  const queryClient = useQueryClient();
  const [search, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalopen] = useState(false);
  const [token, _] = useAtom(tokenAtom);
  const { data, isLoading, error } = useQuery({
    queryKey: ["instructors", currentPage, search],
    queryFn: async () => {
      const res = await fetch(
        `http://nassar1-001-site1.rtempurl.com/api/Course/Instructors?IsPagingEnabled=true&Skip=${currentPage}&Take=7&Filter=${search}`
      );
      if (!res.ok) throw new Error("Failed to fetch instructors");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });

  const UpdateOrAddMutation = useMutation({
    mutationKey: ["instructors"],
    mutationFn: async (instructor) => {
      const res = await fetch(
        `http://nassar1-001-site1.rtempurl.com/api/Course/Instructor/AddOrUpdate`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(instructor),
        }
      );
      if (!res.ok) throw new Error();
      return res.json();
    },
    onError: () => {
      toast.error("Failed to update or add");
    },
    onSuccess: (instructor) => {
      if (instructor.Id !== null)
        toast.success("Instructor updated successfully!");
      else toast.success("Instructor added successfully!");
      queryClient.invalidateQueries(["instructors"]);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const instructors = data.items ?? [];
  const totalPages = Math.ceil(data.totalCount / data.pageSize);
  return (
    <div className="text-black flex flex-col py-8 px-10 bg-[#FCFCFC] h-full shadow-[0px_4px_14px_0px_rgba(167,167,167,0.12)] gap-4 ">
      <Header h1={"Instructors"} />
      <div className="flex flex-col bg-white justify-between rounded-lg gap-6 ">
        <InstructorSearchBarRow
          setModalopen={setModalopen}
          addWhat={"Add Instructos"}
          total={data.totalCount}
          search={search}
          setSearchWord={setSearchWord}
          modalOpen={modalOpen}
          UpdateOrAddMutation={UpdateOrAddMutation}
        />
        <InstructorsTable
          setCurrentPage={setCurrentPage}
          instructors={instructors}
          mutation={UpdateOrAddMutation}
        />

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
