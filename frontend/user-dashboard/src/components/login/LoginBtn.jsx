import { useNavigate } from "react-router-dom"
import arrow from '../../assets/login/Icon.png'

const LoginBtn = ({nav,text}) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate({nav})}
            className="inline-flex self-center md:self-start items-center cursor-pointer gap-6 bg-black text-white rounded-xl px-6 py-2.5 mt-4"
        >
            <span>{text}</span>
            <img src={arrow} />
        </button>
    )
}

export default LoginBtn
