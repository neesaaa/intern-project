import FilterSectionBtn from "./FilterSectionBtn";
const FilterCategory = ({
  toggleSection,
  expandedSections,
  filters,
  handleCategoryChange,
}) => {
  return (
    <div className="w-full">
      <FilterSectionBtn
        toggleSection={toggleSection}
        expandedSections={expandedSections}
        text="Category"
        section="category"
      />
      {expandedSections.category && (
        <div className="space-y-3">
          {[
            { id: 1, label: "Frontend", color: "bg-red-100 text-red-800" },
            { id: 2, label: "Backend", color: "bg-gray-100 text-gray-800" },
            { id: 3, label: "Testing", color: "bg-gray-100 text-gray-800" },
            {
              id: 4,
              label: "UI/UX Design",
              color: "bg-blue-100 text-blue-800",
            },
          ].map((category) => (
            <div
              key={category.id}
              className="flex items-center space-x-2 text-black"
            >
              <input
                type="checkbox"
                className={`peer focus:ring-2 focus:ring-blue-500 accent-blue-600`}
                id={`${category.id}`}
                checked={filters.categories.includes(category.id)}
                onChange={(e) =>
                  handleCategoryChange(category.id, e.target.checked)
                }
              />
              <label
                htmlFor={`${category.id}`}
                className="peer-checked:text-blue-500 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterCategory;
