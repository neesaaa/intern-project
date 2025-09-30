import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
const FilterSectionBtn = ({ toggleSection, expandedSections,text,section }) => {
  return (
    <button
      onClick={() => toggleSection(section)}
      className="text-black flex items-center justify-between w-full text-left font-medium mb-3 "
    >
      {text}
      {expandedSections[section] ? (
        <IoIosArrowDown className="h-4 w-4 " />
      ) : (
        <IoIosArrowUp className="h-4 w-4" />
      )}
    </button>
  );
};

export default FilterSectionBtn;
