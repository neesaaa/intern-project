import InstructorCard from "./InstructorCard";
import { useQuery } from "@tanstack/react-query";

const fetchInstructors = async () => {
  const data = await fetch(
    "http://nassar1-001-site1.rtempurl.com/api/Course/Instructors"
  );
  if (!data.ok) throw new Error("Failed to fetch courses");
  return data.json();
};
const InstructorCardHolder = ({ ref }) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["instructor"],
    queryFn: fetchInstructors,
  });
  if (isLoading)
    return (
      <div className="p-4 text-black">
        <h1>Loading...</h1>
      </div>
    );
  if (error)
    return (
      <div className=" p-4 text-black">
        <h1>Error: {error.message}</h1>
      </div>
    );
  const Instructors = data?.items || [];
  return (
    <div
      className="flex justify-between overflow-x-auto p-4 scrollbar-hide scroll-smooth  gap-2"
      ref={ref}
    >
      {Instructors.map((item, i) => (
        <InstructorCard {...item} key={i} />
      ))}
    </div>
  );
};

export default InstructorCardHolder;
