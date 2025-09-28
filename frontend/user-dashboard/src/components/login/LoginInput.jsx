

const LoginInput = ({ name, placeholder, labelText, NoLabel, flex1,type="text"  }) => {
    return (
        <>
            {!NoLabel && <label htmlFor={name} className="font-semibold leading-1.6 text-lg text-left ">{labelText}</label>}
            <input type={type} id={name} name={name} placeholder={placeholder} className={`border ${flex1} border-border_color rounded-md  px-4 py-4  md:max-w-none md:w-full`} />
        </>
    )
}

export default LoginInput
