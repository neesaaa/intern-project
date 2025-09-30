import { FaStar } from "react-icons/fa6";

const StarsRander = ({ rating, handleRatingChange }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleRatingChange(star)}
          className={`text-2xl transition-colors hover:text-yellow-400 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          <FaStar />
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-muted-foreground">& up</span>
      )}
      {rating > 0 && (
        <button
          onClick={() => handleRatingChange(0)}
          className="ml-2 text-xs text-black hover:scale-110 underline"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default StarsRander;
