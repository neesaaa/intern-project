import CourseCard from "./CourseCard";
import { useQuery } from "@tanstack/react-query";
const fetchTop4 = async () => {
  const res = await fetch(
    "http://nassar1-001-site1.rtempurl.com/api/Course/Courses?OrderByDesc=Rate&IsPagingEnabled=true&Take=4"
  );
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
};
const CourseHolder = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["Courses"],
    queryFn: fetchTop4,
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

  const courses = data?.items || [];
  return (
    <div className="grid grid-cols-2  md:flex justify-between p-4 gap-4  ">
      {courses.map((item, i) => (
        <CourseCard {...item} key={i} style={"h-full"} />
      ))}
    </div>
  );
};

export default CourseHolder;
