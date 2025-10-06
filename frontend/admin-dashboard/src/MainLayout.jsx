import { Outlet, Navigate } from "react-router-dom";
import Footer from "./pages/Footer";
import { tokenValidAtom } from "./atoms/authAtom";
import { useAtom } from "jotai";
import SideBar from "./pages/SideBar";
import { tokenAtom } from "./atoms/authAtom";

const MainLayout = () => {
  const [isAuthenticated] = useAtom(tokenValidAtom);
  const [token] = useAtom(tokenAtom);

  if (token === undefined) {
    return (
      <div className="flex justify-center items-center h-screen text-black ">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <div className="h-screen w-full flex flex-col min-h-screen ">
      <main className="flex h-full w-full flex-1   ">
        <SideBar />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
