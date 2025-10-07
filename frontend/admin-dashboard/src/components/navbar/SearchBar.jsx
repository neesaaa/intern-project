import searchIcon from "../../assets/navbar/heroicons_magnifying-glass-20-solid.png";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchBar = ({ withCourses = true, classes = "", SetSerchWord ,value}) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (SetSerchWord) SetSerchWord(inputValue);
    }, 700);

    return () => clearTimeout(handler);
  }, [inputValue, SetSerchWord]);
  return (
    <div
      className={`flex  items-center gap-2 md:gap-6 min-w-0 md:w-full ${classes}`}
    >
      <div className="flex border border-border_color rounded-xl items-center gap-2 p-2 grow min-w-0  ">
        <img src={searchIcon} alt="search icon" className="w-4" />
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          name="search"
          placeholder="Search Courses"
          value={inputValue}
          className="text-gray-800 outline-none border-none      "
        />
      </div>
      {withCourses && (
        <Link
          to="/courses"
          className="text-gray-800 font-medium hidden lg:block "
        >
          Courses
        </Link>
      )}
    </div>
  );
};

export default SearchBar;
