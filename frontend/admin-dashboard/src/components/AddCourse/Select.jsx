import { useState, useEffect } from "react";

export default function Select({ label, options, value, onChange, name }) {
  const [selectedValue, setSelectedValue] = useState(
    value !== undefined && value !== null ? String(value) : "-1"
  );

  useEffect(() => {
    setSelectedValue(
      value !== undefined && value !== null ? String(value) : "-1"
    );
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full text-black">
      <label className="font-medium text-[14px] leading-[100%] tracking-[0.02em]">
        {label}
      </label>
      <select
        name={name}
        value={selectedValue}
        onChange={handleChange}
        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4318FF] bg-white"
      >
        <option value="-1">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
