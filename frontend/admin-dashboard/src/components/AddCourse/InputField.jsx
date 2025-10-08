export default function InputField({ 
  label, 
  type = "text", 
  name, 
  value, 
  onChange, 
  placeholder = "Write here", 
  ...props 
}) {
  return (
    <div className="flex flex-col gap-2 w-full text-black">
      <label
        htmlFor={name}
        className="font-medium text-[14px] leading-[100%] tracking-[0.02em]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4318FF]"
        {...props}
      />
    </div>
  );
}