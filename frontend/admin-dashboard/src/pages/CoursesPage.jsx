import CourseCard from "../components/Courses/CourseCard";
import Header from "../components/Dash/Header";
import InstructorSearchBarRow from "../components/InstructorsPage/InstructorSearchBarRow";
import { useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { tokenAtom } from "../atoms/authAtom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CoursesPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [token, _] = useAtom(tokenAtom);
  const navigation = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Courses", currentPage, search],
    queryFn: async () => {
      const res = await fetch(
        `http://nassar1-001-site1.rtempurl.com/api/Course/Courses?IsPagingEnabled=true&Skip=${currentPage}&Take=6&Filter=${search}`
      );
      if (!res.ok) throw new Error("Failed to fetch Courses");
      return res.json();
    },
    refetchOnWindowFocus: false,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const courses = data.items ?? [];
  const totalPages = Math.ceil(data.totalCount / data.pageSize);

  return (
    <div className="text-black flex flex-col py-8 px-10 bg-[#FCFCFC] h-full gap-4">
      <Header h1={"Courses"} />
      <div className="flex flex-col bg-white rounded-xl gap-6">
        <div className="flex flex-col bg-white justify-between rounded-lg gap-6 ">
          <InstructorSearchBarRow
            text="Courses"
            total={data.totalCount}
            course={true}
            nav={() => navigation("/add")}
            setModalopen={() => console.log("sd")}
            addWhat={"Add Course"}
            search={search}
            setSearchWord={setSearchWord}
          />
          <div className="grid grid-cols-3 px-6 gap-6">
            {courses &&
              courses.map((course) => (
                <CourseCard {...course} key={course.Id} />
              ))}
          </div>
        </div>

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

export default CoursesPage;
