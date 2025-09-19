import NavBar from "../components/navbar/NavBar"
import login from '../assets/login/a46d07caf0f76651a4f6375cbce96bf6f8f37721.jpg'
import LoginInput from '../components/login/LoginInput'
import { useNavigate } from "react-router-dom"
import arrow from '../assets/login/Icon.png'
import LoginPlatform from "../components/login/LoginPlatform"
import face from '../assets/login/facebook.png'
import google from '../assets/login/microsoft.png'
import microsoft from '../assets/login/google.png'

const Login = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col w-full max-h-screen md:overflow-hidden   '>
            <header className='p-2 md:py-4 md:px-20 border border-border_color'>
                <NavBar />
            </header>
            <main>
                <section className="flex  ">
                    <img src={login} alt="" className=" hidden lg:block lg:w-[35%] xl:w-[48%] h-screen object-cover  " />
                    <div className="flex flex-col items-center text-center text-black w-full py-10 px-2 md:p-20 md:px-6 lg:px-6 gap-6">
                        <h1 className="leading-1.3 font-semibold text-3xl">Create your Account</h1>
                        <div className="flex flex-col justify-center gap-6 ">
                            <form className="gap-2 flex flex-col max-w-300">
                                <h5 className="font-semibold leading-1.6 text-lg text-left">Full Name</h5>
                                <div className="flex flex-col md:flex-row gap-3 ">
                                    <LoginInput name={"first_name"} placeholder={'First Name'} NoLabel flex1={'flex-1'} />
                                    <LoginInput name={"last_name"} placeholder={'Last Name'} NoLabel flex1={'flex-1'} />
                                </div>
                                <LoginInput name={"user_name"} placeholder={'User Name'} labelText={'User Name'} />
                                <LoginInput name={"email"} placeholder={"Email ID"} labelText={'Email'} />
                                <div className="flex flex-col md:flex-row gap-2 md:gap-3  justify-between">
                                    <div className="flex md:flex-1 flex-col gap-2">
                                        <LoginInput name={"Password"} placeholder={'Enter Password'} labelText={'Password'} />
                                    </div>
                                    <div className="flex md:flex-1 flex-col gap-2">
                                        <LoginInput name={"ConfirmPassword"} placeholder={'Confirm Password'} labelText={'Confirm Password'} />
                                    </div>
                                </div>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="inline-flex self-center md:self-start items-center gap-6 bg-black text-white rounded-xl px-6 py-2.5 mt-4"
                                >
                                    <span>Create Account</span>
                                    <img src={arrow} />
                                </button>
                            </form>
                            <div className="flex items-center w-full mt-2">
                                <div className="flex-1 border-t border-border_color"></div>
                                <span className="px-4 text-slate-400 font-semibold leading-1.5">Signup</span>
                                <div className="flex-1 border-t border-border_color"></div>
                            </div>
                            <div className="flex  items-center justify-between gap-2">
                                <LoginPlatform img={face} text={'Facebook'}/>
                                <LoginPlatform img={microsoft} text={'Google'}/>
                                <LoginPlatform img={google} text={'Microsoft'}/>
                            </div>
                        </div>
                    </div>
                </section >

            </main >
        </div >
    )
}

export default Login
