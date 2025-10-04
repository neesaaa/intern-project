import { FaCheckCircle } from "react-icons/fa";
import {Link} from 'react-router-dom'

const DonePage = () => {
  return (
    <main className="text-black flex flex-1 container mx-auto h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 h-full flex-1">
          <FaCheckCircle className="text-green-700 " size={200}/>
          <div className="flex flex-col gap-2">
            <h1 className="font-inter font-bold text-[40px] leading-[120%] text-center">Purchase Complete</h1>
            <h3 className="font-inter font-semibold text-[24px] leading-[140%] text-center">You Will Receive a confirmation email soon! </h3>
          </div>
          <Link to='/'>
            <button className="min-w-100 px-2 py-4 text-white bg-black rounded-lg cursor-pointer ">
              Back To Home
            </button>
          </Link>
      </div>
    </main>
  );
};

export default DonePage;
