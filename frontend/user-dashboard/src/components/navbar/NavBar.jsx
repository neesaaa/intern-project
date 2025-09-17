import logo from '../../assets/navbar/logo.png'
import SearchBar from './SearchBar'
import AuthLinks from './AuthLinks'
import LoginedNav from './LoginedNav'
import { useAtom } from 'jotai'
import { tokenAtom } from '../../atoms/authAtom';
const NavBar = () => {
    const [token] = useAtom(tokenAtom);


    return (
        <div className='flex justify-between'>
            <div className='flex w-[15vw] sm:w-[40vw] md:w-[55vw] gap-6 md:gap-[40px]'>
                <div className='flex gap-1 items-center flex-none cursor-pointer'>
                    <img src={logo} alt="logo" className='h-10 ' />
                    <h1 className='text-base font-medium text-gray-800'>ByWay</h1>
                </div>
                <SearchBar />
            </div>
            {token ? <LoginedNav /> : <AuthLinks />}
        </div>
    )
}

export default NavBar
