import logo from '../../assets/navbar/logo.png'

const Logo = ({color}) => {
    return (
        <div className='flex gap-1 items-center flex-none cursor-pointer'>
            <img src={logo} alt="logo" className='h-10 ' />
            <h1 className={`text-base font-medium ${color?'text-white':'text-gray-800'}`}>ByWay</h1>
        </div>
    )
}

export default Logo
