

const ImgCard = ({ full, clipped, className, bg ,clippedPos, clippedExists }) => {
    return (
        <div className={`absolute ${className}`}>
            <div className={`w-60 h-60 overflow-hidden rounded-full ${bg} flex items-center justify-center`}>
                <img
                    src={full}
                    alt="clipped"
                    className="w-60"
                />
            </div>
            {clippedExists && <img
                src={clipped}
                alt="top"
                className={`absolute ${clippedPos} w-60`}
            />}
        </div>
    )
}

export default ImgCard
