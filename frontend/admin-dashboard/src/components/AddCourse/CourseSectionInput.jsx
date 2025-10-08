import InputField from "./InputField";
import { FiTrash2 } from "react-icons/fi";

const CourseSectionInput = ({ index, section, onRemove, onSectionChange }) => {
  
  const handleFieldChange = (field, value) => {
    onSectionChange({
      ...section,
      [field]: value
    });
  };

  return (
    <div className="flex flex-col bg-gray-50 p-4 rounded-lg gap-3">
      <div className="flex flex-col gap-4">
        <InputField 
          name={`Sections[${index}].Name`} 
          label="Name" 
          value={section.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
        />
        <div className="flex w-full gap-4 ">
          <InputField
            type="number"
            name={`Sections[${index}].LecturesNumber`}
            label="Lectures Number"
            value={section.lecturesNumber}
            onChange={(e) => handleFieldChange('lecturesNumber', parseInt(e.target.value) || 0)}
          />
          <InputField
            type="number"
            name={`Sections[${index}].TotalHours`}
            label="Time"
            step="0.1"
            value={section.totalHours}
            onChange={(e) => handleFieldChange('totalHours', parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="flex">
        <button
          type="button"
          onClick={onRemove}
          className="bg-red-50 p-4 rounded-lg hover:bg-white"
        >
          <FiTrash2 className="text-red-800" />
        </button>
      </div>
    </div>
  );
};

export default CourseSectionInput;