import StarsRander from "./StarsRander";
import FilterSectionBtn from "./FilterSectionBtn";
const FilterRating = ({toggleSection,expandedSections,filters,handleRatingChange}) => {
  return (
        <div className="w-full">
          <FilterSectionBtn
            toggleSection={toggleSection}
            expandedSections={expandedSections}
            text="Rating"
            section="rating"
          />
          {expandedSections.rating && (
            <div className="space-y-3 text-black">
              <div className="p-3 border rounded-lg">
                <div className="text-sm text-muted-foreground mb-2">
                  {filters.rating > 0
                    ? `${filters.rating} stars & up`
                    : "Select minimum rating"}
                </div>
                <StarsRander rating={filters.rating} handleRatingChange={handleRatingChange} />
              </div>
            </div>
          )}
        </div>
  )
}

export default FilterRating
