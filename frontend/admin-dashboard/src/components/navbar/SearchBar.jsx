import searchIcon from '../../assets/navbar/heroicons_magnifying-glass-20-solid.png'
import { Link } from 'react-router-dom'
const SearchBar = () => {
    return (
        <div className='flex  items-center gap-2 md:gap-6 min-w-0 md:w-full'>
            <div className="flex border border-border_color rounded-xl items-center gap-2 p-2 grow min-w-0 ">
                <img src={searchIcon} alt="search icon" className='w-4' />
                <form className=''>
                    <input type='text' name='search' placeholder='Search Courses' className='text-gray-800 outline-none border-none  ' />
                </form>
            </div>
            <Link to='/courses' className='text-gray-800 font-medium hidden lg:block '>
                Courses
            </Link>
        </div>
    )
}

export default SearchBar
