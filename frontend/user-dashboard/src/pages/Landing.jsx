import NavBar from '../components/navbar/NavBar'
import Herotext from '../components/HeroSection/Herotext'
import HeroImagesHolder from '../components/HeroSection/HeroImagesHolder'
import AnimatedNumbersholder from '../components/HeroSection/AnimatedNumbersholder'
import HeaderWithNav from '../components/LandingSections/HeaderWithNav'
import CardHolder from '../components/LandingSections/CardHolder'
import CourseHolder from '../components/LandingSections/CourseHolder'
import InstructorCardHolder from '../components/LandingSections/InstructorCardHolder'
import CommentsHolder from '../components/LandingSections/CommentsHolder'
import womanImg from './../assets/HeroSection/woman_purple.png'
import blueman from '../assets/HeroSection/blue_man.png'
import Logo from '../components/navbar/Logo'
import { useRef } from 'react'
const Landing = () => {
    const scrollableCategory = useRef();
    const ScrollableInstructor = useRef();
    const ScrollableComments = useRef();
    return (
            <main className='flex flex-col gap-15'>
                <section>
                    <div className='container mx-auto p-4 flex flex-col lg:flex-row mt-3 md:mt-50 gap-20'>
                        <Herotext allowExpand buttonText={"start you Jounrney"} buttonStyle={'bg-blue-500'} h1={'Unlock Your Potential with Byway'} h2={'Welcome to Byway, \
                                where learning knows no bounds. We believe that education is the key to personal and\
                                professional growth, and we\'re here to guide you on your journey to success. '} />
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
                    <div className='bg-slate-50 p-20'>
                        <div className='container mx-auto flex flex-col gap-6'>
                            <HeaderWithNav h1={'What Our Customer Say About Us'} scrollRef={ScrollableComments} />
                            <CommentsHolder ref={ScrollableComments} />
                        </div>
                    </div>
                </section>
                <section>
                    <div className='container mx-auto flex flex-col gap-15'>
                        <div className='flex flex-col md:flex-row justify-between items-center'>
                            <img src={womanImg} alt="" className='max-w-100' />
                            <Herotext style={'max-w-150 text-center md:text-start'} buttonText={"Start you Instructor Journey"} buttonStyle={'bg-black'} h1={'Become an Instructor'} h2={'Instructors from around the world teach\
                                    millions of students on Byway. We provide the tools and skills to teach\
                                    what you love.'} />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between items-center'>
                            <Herotext style={'max-w-150 text-center md:text-start'} buttonText={"Start you Instructor Journey"} buttonStyle={'bg-black'} h1={'Transform your life through education'} h2={'Learners around the world are launching new careers, advancing in their fields, and enriching their lives.'} />
                            <img src={blueman} alt="" />
                        </div>
                    </div>
                </section>
                <footer>
                    <div className='bg-gray-800 p-20 gap-10'>
                        <div className='container mx-auto flex flex-col gap-5 md:flex-row justify-between'>
                            <div className='flex flex-col  gap-2'>
                                <Logo color />
                                <p className='text-sm laeding-1.5 max-w-75'>Empowering learners through accessible and engaging online education.
                                    Byway is a leading online learning platform dedicated to providing high-quality, flexible, and affordable educational experiences. </p>
                            </div>
                            <div className='text-sm  leading-1.6 flex flex-col items-start gap-2'>
                                <h5 className='font-semibold text-xl'>Getting help</h5>
                                <button >Contact Us</button>
                                <button>Latest Articles</button>
                                <button>FAQ</button>
                            </div>
                            <div className='text-sm  leading-1.6 flex flex-col items-start gap-2'>
                                <h5 className='font-semibold text-xl'>Programs</h5>
                                <button >Art & Design </button>
                                <button>Business</button>
                                <button>IT & Software</button>
                                <button>Languages</button>
                                <button>Programming</button>
                            </div>
                            <div className='text-sm  leading-1.6 flex flex-col items-start gap-2'>
                                <h5 className='font-semibold text-xl'>Contact Us</h5>
                                <p >Address: 123 Main Street, Anytown, CA 12345</p>
                                <p>Tel: +(123) 456-7890</p>
                                <p>Mail: bywayedu@webkul.in</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
    )
}

export default Landing
