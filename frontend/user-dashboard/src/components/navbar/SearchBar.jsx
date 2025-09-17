import searchIcon from '../../assets/navbar/heroicons_magnifying-glass-20-solid.png'
const SearchBar = () => {
    return (
        <div className='flex  items-center gap-6 w-full'>
            <div className="flex border border-border_color rounded-xl items-center gap-2 p-2 grow ">
                <img src={searchIcon} alt="search icon" className='w-4' />
                <form className=''>
                    <input type='text' name='search' placeholder='Search Courses' className='text-gray-800 outline-none border-none  ' />
                </form>
            </div>
            <h2 className='text-gray-800 font-medium hidden lg:block '>
                Courses
            </h2>
        </div>
    )
}

export default SearchBar
