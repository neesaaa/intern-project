import FilterSectionBtn from "./FilterSectionBtn";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterPrice = ({
  toggleSection,
  expandedSections,
  filters,
  handlePriceRangeChange,
}) => {
  return (
    <div className="w-full">
      <FilterSectionBtn
        text="Price"
        section="price"
        toggleSection={toggleSection}
        expandedSections={expandedSections}
      />
      {expandedSections.price && (
        <div className="space-y-4">
          <Slider
            range             
            min={0}
            max={100}
            step={5}
            value={filters.priceRange}
            onChange={handlePriceRangeChange} 
            className="w-full" 
          />
          <div className="flex items-center justify-between text-sm text-black text-muted-foreground">
            <span>${filters.priceRange[0]}</span>
            <span>${filters.priceRange[1]}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPrice;
