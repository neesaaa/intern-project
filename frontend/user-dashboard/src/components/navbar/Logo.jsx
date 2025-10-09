import logo from "../../assets/navbar/logo.png";
import { Link } from "react-router-dom";
const Logo = ({ color }) => {
  return (
    <Link to="/">
      <div className="flex gap-1 items-center flex-none cursor-pointer">
        <img src={logo} alt="logo" className="h-10 " />
        <h1
          className={`text-base font-medium ${
            color ? "text-white" : "text-gray-800"
          }`}
        >
          ByWay
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
