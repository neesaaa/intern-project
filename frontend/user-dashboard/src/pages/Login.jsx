import loginImage from './../assets/login/login.jpg'
import LoginPlatform from "../components/login/LoginPlatform"
import face from '../assets/login/facebook.png'
import google from '../assets/login/microsoft.png'
import microsoft from '../assets/login/google.png'
import LoginSeprator from '../components/login/LoginSeprator'
import LoginInput from '../components/login/LoginInput'
import LoginBtn from '../components/login/LoginBtn'

const Login = () => {
  return (
    <main className='flex-1 ' >
      <section className="flex items-center justify-center h-full ">
        <div className="flex flex-col items-center  gap-6 text-center text-black w-full px-5 md:px-20">
          <h2 className="leading-1.3 font-semibold text-3xl">Signin your Account</h2>
          <div className='flex flex-col gap-6 w-full'>
            <div className='flex flex-col items-start  gap-2 '>
              <LoginInput name={"email"} placeholder={"Email ID"} labelText={'Email'}  flex1={'w-full'}/>
            </div>
            <div className='flex flex-col items-start  gap-2 '>
              <LoginInput name={"Password"} placeholder={'Enter Password'} labelText={'Password'} flex1={'w-full'}/>
            </div>
            <LoginBtn nav={'/signin'} text={'Sign In'} onClick={}/>
            <LoginSeprator text={'Login in with'} />
            <div className="flex  items-center justify-between gap-2">
              <LoginPlatform img={face} text={'Facebook'} />
              <LoginPlatform img={microsoft} text={'Google'} />
              <LoginPlatform img={google} text={'Microsoft'} />
            </div>
          </div>
        </div>
        <img src={loginImage} alt="" className=" hidden lg:block lg:w-[35%] xl:w-[60%] h-screen object-cover  " />
      </section>
    </main>
  )
}

export default Login
