import Header from "../components/CoursesPage/Header.jsx";
import FilterSideBar from "../components/CoursesPage/FilterSideBar.jsx";
import FilterSelection from "../components/CoursesPage/FilterSelection.jsx";
import CourseCard from "../components/LandingSections/CourseCard.jsx";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const buildQueryFromFilters = (filters, index = 1) => {
  const params = new URLSearchParams();

  params.append("IsPagingEnabled", "true");
  params.append("Skip", String(index));
  params.append("Take", "9");
  if (filters.orderby) params.append("OrderBy", filters.orderby);
  if (filters.orderbyDesc) params.append("OrderByDesc", filters.orderbyDesc);

  if (filters.rating && filters.rating > 0)
    params.append("MinRating", String(filters.rating));

  if (filters.lectureRange) {
    params.append("LectureRange", filters.lectureRange);
  }

  if (Array.isArray(filters.priceRange) && filters.priceRange.length === 2) {
    params.append("MinPrice", String(filters.priceRange[0]));
    params.append("MaxPrice", String(filters.priceRange[1]));
  }

  if (Array.isArray(filters.categories)) {
    filters.categories.forEach((catId) =>
      params.append("CategoryIds", String(catId))
    );
  }

  return params.toString();
};

const CoursesPage = () => {
  const [SortBy, setsortby] = useState("Latest");
  const [filters, setFilters] = useState({
    rating: 0,
    lectureRange: "all",
    priceRange: [0, 100],
    categories: [],
    orderby: "",
    orderbyDesc: "",
  });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 400);
    return () => clearTimeout(handler);
  }, [filters]);

  const [expandedSections, setExpandedSections] = useState({
    rating: true,
    lectures: true,
    price: true,
    category: true,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["courses", debouncedFilters],
    queryFn: async () => {
      const qs = buildQueryFromFilters(debouncedFilters);
      const url = `https://nassar1-001-site1.rtempurl.com/api/Course/Courses?${qs}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onError: (err) => console.log(err),
  });
  return (
    <main className="container mx-auto p-4 flex flex-col gap-6">
      <Header />
      <FilterSelection
        setFilters={setFilters}
        sort={SortBy}
        setter={setsortby}
      />
      <section className="flex gap-6">
        <FilterSideBar
          filters={filters}
          setFilters={setFilters}
          expandedSections={expandedSections}
          setExpandedSections={setExpandedSections}
        />
        {isLoading ? (
          <div className="w-12 h-12 self-center mx-auto rounded-full border-4 border-gray-200 border-t-gray-500 animate-spin"></div>
        ) : (
          <div className="flex-grow text-black grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  3xl:grid-cols-4 gap-6">
            {data.items?.map((course) => (
              <CourseCard
                key={course.Id}
                Id={course.Id}
                Name={course.Name}
                InstructorName={course.InstructorName}
                Rate={course.Rate}
                TotalLectures={course.TotalLectures}
                TotalHours={course.TotalHours}
                Cost={course.Cost}
                ImageUrl={course.ImageUrl}
                Category={course.Category}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default CoursesPage;
