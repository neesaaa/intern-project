import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Footer from "./pages/Footer";

const MainLayout = () => {
  const location = useLocation();
  const authPage =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/done";
  return (
    <div
      className={`flex flex-col min-h-screen ${
        authPage ? "min-h-screen" : ""
      } w-full md:overflow-hidden`}
    >
      <header className="p-2 md:py-4 md:px-20 border border-border_color">
        <NavBar />
      </header>
        <Outlet />
        <Footer />
    </div>
  );
};

export default MainLayout;
