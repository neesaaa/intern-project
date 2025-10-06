
const LoginPlatform = ({ img, text }) => {
    return (
        <div className="flex rounded-lg border border-border_color px-2 py-3 md:px-16 gap-2 mt-5">
            <img src={img} alt={text+'logo'} className="w-6 h-6"  />
            <span>{text}</span>
        </div>
    )
}

export default LoginPlatform
