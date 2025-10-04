import fullMan from '../../assets/HeroSection/all man.png'
import halfman from '../../assets/HeroSection/halfman.png'
import redwman from '../../assets/HeroSection/red.png'
import kolha from '../../assets/HeroSection/image 7.png'
import yellow from '../../assets/HeroSection/yellow.png'
import ImgCard from './ImgCard'

const HeroImagesHolder = () => {
    return (
        <div className="relative flex-1 min-h-[410px] md:min-h-[600px]">
            <ImgCard full={fullMan} clipped={halfman} className={'right-0 md:right-3 md:-top-10 '} bg={'bg-blue-500'} clippedPos={'-top-9.5 '} clippedExists />
            <ImgCard full={kolha} clipped={redwman} className={'top-45 right-35 md:right-63 md:top-25'} bg={'bg-red-500'} clippedPos={'-top-12.5 '} clippedExists />
            <ImgCard full={yellow} className={'-right-5 top-55 md:-right-5 md:top-60'} bg={'bg-yellow-500'} />
        </div>
    )
}

export default HeroImagesHolder
