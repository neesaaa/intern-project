import { useLocation, Link } from "react-router-dom";
import Logo from "../components/navbar/Logo";
import CoursesIconf from "../assets/aside/Courses.png";
import InsIcon from "../assets/aside/ins.png";
import DashIcon from "../assets/aside/Rectangle 74.png";
import Logout from "../assets/navbar/log-out-03.png";
import { tokenAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";

const Sidebtn = ({ imag, text, to, active }) => {
  return (
    <Link
      to={to}
      className={`flex gap-3 items-center py-4 px-2 rounded-lg transition-colors 
        ${active ? " text-[#5879DC]" : "hover:bg-gray-100 text-black"}`}
    >
      <img src={imag} className={`object-contain w-5 h-5 `} alt={text} />
      <p className="font-ibm-plex-arabic font-normal text-[14px] leading-[100%] tracking-[0em]">
        {text}
      </p>
    </Link>
  );
};

const SideBar = () => {
  const location = useLocation();
  const [token, setToken] = useAtom(tokenAtom);

  const links = [
    { to: "/", text: "Dashboard", icon: DashIcon },
    { to: "/instructors", text: "Instructors", icon: InsIcon },
    { to: "/courses", text: "Courses", icon: CoursesIconf },
  ];
  const handleLogout = () => {
    localStorage.removeItem("Admintoken");
    setToken(null);
  };

  return (
    <aside className="flex flex-col px-4 py-4 h-full gap-8 text-black border-r border-gray-200 min-w-[200px] ">
      <Logo />
      <div className="flex flex-col border-b border-gray-200">
        {links.map((link) => (
          <Sidebtn
            key={link.to}
            to={link.to}
            text={link.text}
            imag={link.icon}
            active={location.pathname === link.to}
          />
        ))}
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center font-ibm-plex-arabic font-normal text-[14px] leading-[100%] tracking-[0em] gap-3 px-2 cursor-pointer"
      >
        <img src={Logout} className="object-contain w-5 h-5" alt="" />
        Log Out
      </button>
    </aside>
  );
};

export default SideBar;
