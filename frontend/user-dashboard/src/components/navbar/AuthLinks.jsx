
import { Link } from "react-router-dom";
const baseLink = "rounded-lg p-2 md:px-4 md:py-2  md:text-base font-medium hover:scale-1.1";

const AuthLinks = () => {
    return (
        <div className="flex gap-2 items-center">
            <Link
                to="/login"
                className={`${baseLink} text-gray-800 border border-gray-700`}
            >
                Login
            </Link>

            <Link
                to="/signup"
                className={`${baseLink} bg-gray-700 text-white`}
            >
                Signup
            </Link>
        </div>
    )
}

export default AuthLinks
