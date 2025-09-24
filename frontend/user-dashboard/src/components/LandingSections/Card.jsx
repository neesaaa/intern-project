
const Card = ({ img, h4, p }) => {
    return (
        <div className="px-17 md:px-[96px] flex-shrink-0  py-6 flex flex-col items-center shadow-[0_0_8px_0_rgba(0,0,0,0.12)] rounded-xl text-black text-center gap-3">
            <div className="bg-sky-100 flex items-center rounded-full justify-center p-6">
                <img src={img} className="" />
            </div>
            <h4 className="font-bold">{h4}</h4>
            <p>{p} Courses</p>
        </div>
    )
}

export default Card
