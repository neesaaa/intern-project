import FilterSectionBtn from "./FilterSectionBtn";
const FilterLectures = ({ toggleSection, expandedSections, filters, handleLectureRangeChange }) => {
  return (
    <div className="w-full">
      <FilterSectionBtn
        toggleSection={toggleSection}
        expandedSections={expandedSections}
        text="Lectures"
        section="lectures"
      />
      {expandedSections.lectures && (
        <div className="space-y-2">
          {[
            { value: "all", label: "All" },
            { value: "1-15", label: "1-15" },
            { value: "31-45", label: "31-45" },
            { value: "more-45", label: "More than 45" },
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded text-black"
            >
              <input
                type="radio"
                name="lectures"
                checked={filters.lectureRange === option.value}
                onChange={() => handleLectureRangeChange(option.value)}
                className="text-blue-600"
              />
              <span className="text-sm">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterLectures;
