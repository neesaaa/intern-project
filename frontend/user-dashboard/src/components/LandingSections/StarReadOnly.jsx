import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarReadOnly = ({ rating = 0 }) => {
    return (
        <div className="flex gap-1">
            {Array.from({ length: 5 }, (_, i) => {
                const starNumber = i + 1;

                if (rating >= starNumber) {
                    return <FaStar key={i} className="text-yellow-400 w-6 h-6" />;
                } else if (rating >= starNumber - 0.5) {
                    return <FaStarHalfAlt key={i} className="text-yellow-400 w-6 h-6" />;
                } else {
                    return <FaRegStar key={i} className="text-gray-300 w-6 h-6" />;
                }
            })}
        </div>
    );
};

export default StarReadOnly;
