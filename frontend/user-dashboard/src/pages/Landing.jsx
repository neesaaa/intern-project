import NavBar from '../components/navbar/NavBar'
const Landing = () => {
    return (
        <div className='flex flex-col min-h-screen '>
            <header className='p-2 md:py-4 md:px-20 border border-border_color'>
                <NavBar />
            </header>
            <main>
                <h1 className='text-gray-800'>Hero Section</h1>
            </main>
        </div>
    )
}

export default Landing
