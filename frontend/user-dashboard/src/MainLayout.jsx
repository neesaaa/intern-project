import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Logo from './components/navbar/Logo'


const MainLayout = () => {
  const location = useLocation();
  const authPage =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div
      className={`flex flex-col ${
        authPage ? "h-screen" : ""
      } w-full md:overflow-hidden`}
    >
      <header className="p-2 md:py-4 md:px-20 border border-border_color">
        <NavBar />
      </header>
      <Outlet />
      <footer>
        <div className="bg-gray-800 p-20 gap-10">
          <div className="container mx-auto flex flex-col gap-5 md:flex-row justify-between">
            <div className="flex flex-col  gap-2">
              <Logo color />
              <p className="text-sm laeding-1.5 max-w-75">
                Empowering learners through accessible and engaging online
                education. Byway is a leading online learning platform dedicated
                to providing high-quality, flexible, and affordable educational
                experiences.{" "}
              </p>
            </div>
            <div className="text-sm  leading-1.6 flex flex-col items-start gap-2">
              <h5 className="font-semibold text-xl">Getting help</h5>
              <button>Contact Us</button>
              <button>Latest Articles</button>
              <button>FAQ</button>
            </div>
            <div className="text-sm  leading-1.6 flex flex-col items-start gap-2">
              <h5 className="font-semibold text-xl">Programs</h5>
              <button>Art & Design </button>
              <button>Business</button>
              <button>IT & Software</button>
              <button>Languages</button>
              <button>Programming</button>
            </div>
            <div className="text-sm  leading-1.6 flex flex-col items-start gap-2">
              <h5 className="font-semibold text-xl">Contact Us</h5>
              <p>Address: 123 Main Street, Anytown, CA 12345</p>
              <p>Tel: +(123) 456-7890</p>
              <p>Mail: bywayedu@webkul.in</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
