

const ImgCard = ({ full, clipped, className, bg ,clippedPos, clippedExists }) => {
    return (
        <div className={`absolute z-10 ${className}`}>
            <div className={`w-60 h-60 overflow-hidden rounded-full ${bg} flex items-center justify-center`}>
                <img
                    src={full}
                    alt="clipped"
                    className="w-60"
                />

                <div
                className="absolute inset-0 rounded-full z-10 scale-110"
                style={{
                    background: "conic-gradient(transparent 0deg 30deg, #CBD5E1 30deg 120deg, transparent 120deg 360deg)",
                    mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black 0)",
                    WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black 0)"
                }}
                ></div>
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
