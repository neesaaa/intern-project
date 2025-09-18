    import CourseCard from './CourseCard'
    const CourseHolder = () => {
        return (
            <div className="grid grid-cols-2  md:flex justify-between p-4 gap-4  ">
                <CourseCard img={'sd'} price={40} />
                <CourseCard img={'sd'} price={40} />
                <CourseCard img={'sd'} price={40} />
                <CourseCard img={'sd'} price={40} />
            </div>
        )
    }

    export default CourseHolder
