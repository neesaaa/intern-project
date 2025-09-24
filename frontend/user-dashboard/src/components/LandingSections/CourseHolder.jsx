import CourseCard from './CourseCard'
import { useQuery } from '@tanstack/react-query'
const fetchTop4 = async () => {
    const res = await fetch('https://localhost:7031/api/Course/Courses?OrderByDesc=Rate');
    if (!res.ok) throw new Error('Failed to fetch courses');
    return res.json();
};
const CourseHolder = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['Courses'],
        queryFn: fetchTop4
    });
    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.message}</h1>;

    // Safely check data and items
    const courses = data?.items || [];
    console.log(courses)
    return (
        <div className="grid grid-cols-2  md:flex justify-between p-4 gap-4  ">
            {courses.map((item, i) => <CourseCard {...item} key={i} />)}
        </div>
    )
}

export default CourseHolder
