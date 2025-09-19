import { Outlet } from "react-router-dom"
import NavBar from './components/navbar/NavBar'

const MainLayout = () => {
    return (
        <div className='flex flex-col h-screen w-full md:overflow-hidden'>
            <header className='p-2 md:py-4 md:px-20 border border-border_color'>
                <NavBar />
            </header>
            <Outlet />
        </div>
    )
}

export default MainLayout
