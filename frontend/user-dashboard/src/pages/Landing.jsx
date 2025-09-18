import NavBar from '../components/navbar/NavBar'
import Herotext from '../components/HeroSection/Herotext'
import HeroImagesHolder from '../components/HeroSection/HeroImagesHolder'
import AnimatedNumbersholder from '../components/HeroSection/AnimatedNumbersholder'

const Landing = () => {
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
            </main>
        </div>
    )
}

export default Landing
