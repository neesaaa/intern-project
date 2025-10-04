import icon from "../../assets/CoursesPage/Icon.png";
import arrowDown from "../../assets/CoursesPage/arrowdown.png";
import { useState } from "react";
const FilterSelection = ({ setFilters, sort, setter }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between item-center w-full">
      <div className="px-6 py-2 ">
        <button className="cursor-pointer text-black flex items-center gap-1.5 indent-1.6 border border-gray-900 rounded-lg px-4 py-2 hover:shadow-md hover:scale-110">
          <img
            src={icon}
            alt="Filter Icon"
            className="w-6 h-6 object-contain"
          />
          Filter
        </button>
      </div>

      <div className="px-6 py-2 flex text-black items-center">
        <p>Sort By</p>
        <div className="px-6 py-2 ">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`cursor-pointer text-black flex items-center gap-1.5 indent-1.6 border border-gray-900 rounded-lg px-4 py-2 hover:shadow-md ${
              !open ? "hover:scale-110" : ""
            }`}
          >
            <img
              src={arrowDown}
              alt="Arrow Down"
              className="w-3  object-contain"
            />
            {sort}
          </button>
          {open && (
            <div className="absolute bg-white border border-border_color p-2 rounded-lg shadow-lg text-black ">
              <ul className="flex flex-col gap-3 hover:cursor-pointer">
                <li
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer rounded-md"
                  onClick={() => {
                    setter("Highest Price");
                    setFilters((prev) => ({
                      ...prev,
                      orderbyDesc: "Price",
                      orderby: "",
                    }));
                  }}
                >
                  Highest Price
                </li>
                <li
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer rounded-md"
                  onClick={() => {
                    setter("Lowest Price");
                    setFilters((prev) => ({
                      ...prev,
                      orderby: "Price",
                      orderbyDesc: "",
                    }));
                  }}
                >
                  Lowest Price
                </li>
                <li
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer rounded-md"
                  onClick={() => {
                    setter("Latest");
                    setFilters((prev) => ({
                      ...prev,
                      orderbyDesc: "CreatedAt",
                      orderby: "",
                    }));
                  }}
                >
                  The Latest
                </li>
                <li
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer rounded-md"
                  onClick={() => {
                    setter("Oldest");
                    setFilters((prev) => ({
                      ...prev,
                      orderby: "CreatedAt",
                      orderbyDesc: "",
                    }));
                  }}
                >
                  The Oldest
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSelection;
