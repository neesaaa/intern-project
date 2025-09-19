

const LoginInput = ({name ,placeholder ,labelText , NoLabel ,flex1}) => {
    return (
        <>
        {!NoLabel && <label htmlFor={name} className="font-semibold leading-1.6 text-lg text-left self-start    ">{labelText}</label>}
        <input type="text" id={name} name={name} placeholder={placeholder} className={`border ${flex1} border-border_color rounded-md  px-4 py-1 max-w-sm md:max-w-none md:w-full`} />
    </>
    )
}

export default LoginInput
