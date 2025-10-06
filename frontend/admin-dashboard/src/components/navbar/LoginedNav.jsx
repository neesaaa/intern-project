import logOut from '../../assets/navbar/log-out-03.png'
import { useAtom } from 'jotai'
import { tokenAtom } from '../../atoms/authAtom'
import ShoppingCartIcon from './ShoppingCartIcon'
const LoginedNav = () => {
    const [_, setToken] = useAtom(tokenAtom);

    const logoutHandle = () => {
        localStorage.setItem('token', null);
        setToken(null);
    }
    return (
        <div className='flex items-center gap-2 md:gap-4 '>
            <ShoppingCartIcon />
            <button onClick={logoutHandle} className='hover:scale-110 rounded-full  cursor-pointer'>
                <img src={logOut} alt='log out icon' />
            </button>
            <div className='rounded-full bg-gray-800 w-10 h-10 flex items-center justify-center cursor-pointer hover:scale-110'>
                J
            </div>
        </div>
    )
}

export default LoginedNav
