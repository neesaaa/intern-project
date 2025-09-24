import SearchBar from './SearchBar'
import AuthLinks from './AuthLinks'
import LoginedNav from './LoginedNav'
import { useAtom } from 'jotai'
import { tokenValidAtom } from '../../atoms/authAtom';
import Logo from './Logo'
const NavBar = () => {
    const [isTokenValid] = useAtom(tokenValidAtom);


    return (
        <div className='flex justify-between gap-2'>
            <div className='flex md:w-[55vw] gap-2 md:gap-[40px]'>
                <Logo />
                <SearchBar />
            </div>
            {isTokenValid ? <LoginedNav /> : <AuthLinks />}
        </div>
    )
}

export default NavBar
