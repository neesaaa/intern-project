import  FilterRating from "./FilterRating";
import { useState } from "react";
import FilterLectures from "./FilterLectures";
import FilterPrice from "./FilterPrice";
import FilterCategory from "./FilterCategory";




const FilterSideBar = ({setFilters,setExpandedSections,filters,expandedSections}) => {
    
  const handleCategoryChange = (categoryValue, isChecked) => {
  setFilters((prev) => {
    if (isChecked) {
      return {
        ...prev,
        categories: [...prev.categories, categoryValue],
      };
    } else {
      return {
        ...prev,
        categories: prev.categories.filter((c) => c !== categoryValue),
      };
    }
  });
};

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({ ...prev, rating }));
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col p-4 items-center gap-6">
        <FilterRating
          toggleSection={toggleSection}
          expandedSections={expandedSections}
          filters={filters}
          handleRatingChange={handleRatingChange}
        />
        <FilterLectures
          toggleSection={toggleSection}
          expandedSections={expandedSections}
          filters={filters}
          handleLectureRangeChange={(lectureRange) =>
            setFilters((prev) => ({ ...prev, lectureRange }))
          }
        />
        <FilterPrice toggleSection={toggleSection} expandedSections={expandedSections} filters={filters} handlePriceRangeChange={(priceRange) =>
            setFilters((prev) => ({ ...prev, priceRange }))
          }
        />
        <FilterCategory
          toggleSection={toggleSection}
          expandedSections={expandedSections}
          filters={filters}
          handleCategoryChange={handleCategoryChange}
          />
      </div>
    </div>
  );
};

export default FilterSideBar;
