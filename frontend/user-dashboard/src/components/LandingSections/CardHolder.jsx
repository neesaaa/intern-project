import Card from './Card'
import tele from '../../assets/HeroSection/telescope.png'

const CardHolder = ({ref}) => {
    return (
        <div className='flex justify-between overflow-x-auto gap-4 py-2 px-4 scrollbar-hide scroll-smooth   ' ref={ref}>
            <Card img={tele} h4={'Fullstack'} p={11} />
            <Card img={tele} h4={'Fullstack'} p={11} />
            <Card img={tele} h4={'Fullstack'} p={11} />
            <Card img={tele} h4={'Fullstack'} p={11} />
        </div>
    )
}

export default CardHolder
