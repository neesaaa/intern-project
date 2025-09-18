import commentsIcon from '../../assets/HeroSection/Vector.png'
import image from '../../assets/HeroSection/7fb0cfc10e87bd1e664d7d447307e274003434cd.jpg'
const CommentCard = () => {
    return (
        <div className="flex flex-col gap-3 p-6 border border-border_color shadow-[0_0_8px_0_rgba(0,0,0,0.12)] rounded-xl text-black min-w-80 ">
            <img src={commentsIcon} alt="" className='w-12' />
            <p>"Byway's tech courses
                are top-notch! As someone who's always looking
                to stay ahead in the rapidly evolving tech world,
                I appreciate the up-to-date content and engaging
                multimedia. </p>
            <div className='flex gap-2  '>
                <img src={image} alt="" className='w-15 h-15 object-cover rounded-full' />
                <div>
                    <h5 className='leading-1.6 text-lg font-semibold'>John Doe</h5>
                    <p> Designer    </p>
                </div>

            </div>
        </div>
    )
}

export default CommentCard
