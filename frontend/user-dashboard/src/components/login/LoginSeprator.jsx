
const LoginSeprator = ({text}) => {
    return (
        <div className="flex items-center w-full mt-2">
            <div className="flex-1 border-t border-border_color"></div>
            <span className="px-4 text-slate-400 font-semibold leading-1.5">{text}</span>
            <div className="flex-1 border-t border-border_color"></div>
        </div>       
    )
}

export default LoginSeprator
