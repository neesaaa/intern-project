import NavBar from '../components/navbar/NavBar'
import Herotext from '../components/HeroSection/Herotext'
import HeroImagesHolder from '../components/HeroSection/HeroImagesHolder'
import AnimatedNumbersholder from '../components/HeroSection/AnimatedNumbersholder'
import HeaderWithNav from '../components/LandingSections/HeaderWithNav'
import CardHolder from '../components/LandingSections/CardHolder'
import CourseHolder from '../components/LandingSections/CourseHolder'
import InstructorCardHolder from '../components/LandingSections/InstructorCardHolder'
import { useRef } from 'react'
const Landing = () => {
    const scrollableCategory = useRef();
    const ScrollableInstructor= useRef();
    return (
        <div className='flex flex-col min-h-screen  w-full'>
            <header className='p-2 md:py-4 md:px-20 border border-border_color'>
                <NavBar />
            </header>
            <main className='flex flex-col gap-15'>
                <section>
                    <div className='container mx-auto p-4 flex flex-col lg:flex-row mt-3 md:mt-50 gap-20'>
                        <Herotext />
                        <HeroImagesHolder />
                    </div>
                </section>
                <section>
                    <AnimatedNumbersholder />
                </section>
                <section>
                    <div className='container mx-auto flex flex-col gap-6'>
                        <HeaderWithNav h1={'Top Categories'} scrollRef={scrollableCategory} />
                        <CardHolder ref={scrollableCategory} />
                    </div>
                </section>
                <section>
                    <div className='container mx-auto flex flex-col gap-6'>
                        <HeaderWithNav h1={'Top Courses'} />
                        <CourseHolder />
                    </div>
                </section>
                <section>
                    <div className='container mx-auto flex flex-col gap-6'>
                        <HeaderWithNav h1={'Top Instructors'} scrollRef={ScrollableInstructor} />
                        <InstructorCardHolder ref={ScrollableInstructor} />
                    </div>
                </section>
                <section>
                    <div className='h-50'></div>
                </section>
            </main>
        </div>
    )
}

export default Landing
