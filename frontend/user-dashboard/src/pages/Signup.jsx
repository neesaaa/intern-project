import SignupImage from '../assets/login/a46d07caf0f76651a4f6375cbce96bf6f8f37721.jpg'
import LoginInput from '../components/login/LoginInput'
import LoginPlatform from "../components/login/LoginPlatform"
import face from '../assets/login/facebook.png'
import google from '../assets/login/microsoft.png'
import microsoft from '../assets/login/google.png'
import LoginSeprator from '../components/login/LoginSeprator'
import LoginBtn from '../components/login/LoginBtn'

const Signup = () => {
    return (
        <main>
            <section className="flex  ">
                <img src={SignupImage} alt="" className=" hidden lg:block lg:w-[35%] xl:w-[48%] h-screen object-cover  " />
                <div className="flex flex-col items-center text-center text-black w-full py-10 px-2 md:p-20 md:px-6 lg:px-6 gap-6">
                    <h2 className="leading-1.3 font-semibold text-3xl">Create your Account</h2>
                    <div className="flex flex-col justify-center gap-6 ">
                        <form className="gap-2 flex flex-col max-w-300">
                            <h5 className="font-semibold leading-1.6 text-lg text-left">Full Name</h5>
                            <div className="flex flex-col md:flex-row gap-3 md:gap-8 ">
                                <LoginInput name={"first_name"} placeholder={'First Name'} NoLabel flex1={'flex-1 '} />
                                <LoginInput name={"last_name"} placeholder={'Last Name'} NoLabel flex1={'flex-1 '} />
                            </div>
                            <LoginInput name={"user_name"} placeholder={'User Name'} labelText={'User Name'} />
                            <LoginInput name={"email"} placeholder={"Email ID"} labelText={'Email'} />
                            <div className="flex flex-col md:flex-row gap-2 md:gap-3  justify-between">
                                <div className="flex md:flex-1 flex-col gap-2">
                                    <LoginInput name={"Password"} placeholder={'Enter Password'} labelText={'Password'} flex1={'flex-1   '} />
                                </div>
                                <div className="flex md:flex-1 flex-col gap-2">
                                    <LoginInput name={"ConfirmPassword"} placeholder={'Confirm Password'} labelText={'Confirm Password'} flex1={' flex-1    '} />
                                </div>
                            </div>
                            <LoginBtn nav={'/login'} text={'Create Your Account'}/>
                            

                        </form>
                        <LoginSeprator text={"Sign up with"} />
                        <div className="flex  items-center justify-between gap-2">
                            <LoginPlatform img={face} text={'Facebook'} />
                            <LoginPlatform img={microsoft} text={'Google'} />
                            <LoginPlatform img={google} text={'Microsoft'} />
                        </div>
                    </div>
                </div>
            </section >

        </main >
    )
}

export default Signup
