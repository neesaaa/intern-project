import loginImage from "./../assets/login/login.jpg";
import LoginPlatform from "../components/login/LoginPlatform";
import face from "../assets/login/facebook.png";
import google from "../assets/login/microsoft.png";
import microsoft from "../assets/login/google.png";
import LoginSeprator from "../components/login/LoginSeprator";
import LoginInput from "../components/login/LoginInput";
import LoginBtn from "../components/login/LoginBtn";
import { z, email } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tokenAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";
import { cartAtom } from "../atoms/cartAtom";
import { fetchBasket } from "../Services/BasketService";

const LoginSchema = z.object({
  Email: z.string().email(),
  Password: z.string().min(6).max(100),
});

const Login = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const [_, setTokenAtomValue] = useAtom(tokenAtom);
  const [__, setCart] = useAtom(cartAtom);

  const mutation = useMutation({
    mutationFn: async (data) => {
      setIsLoading(true);
      const res = await fetch(
        "https://nassar1-001-site1.rtempurl.com/api/Auth/Login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    onSuccess: async (data) => {
      setIsLoading(false);

      setTokenAtomValue(data.Token);
      localStorage.setItem("Admintoken", data.Token);

      const basket = await fetchBasket(data.Token);
      setCart(basket.Items);
      console.log(basket);
      toast.success(`Welcome back ${data.DisplayName}`);
      navigate("/");
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Invalid Email or Password");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const parsed = LoginSchema.safeParse(data);
    if (!parsed.success) {
      const issues = parsed.error.issues;
      const errors = {};

      for (const issue of issues) {
        const field = issue.path[0];
        if (!errors[field]) errors[field] = issue.message;
      }
      setError(errors);
      return;
    }
    mutation.mutate(data);
  };
  return (
    <main className="flex-1 ">
      <section className="flex items-center justify-center h-full ">
        <div className="flex flex-col items-center  gap-6 text-center pt-40 lg:pt-0 text-black w-full px-5 md:px-20">
          <h2 className="leading-1.3 font-semibold text-3xl">
            Signin your Account
          </h2>
          <div className="flex flex-col gap-6 w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-start  gap-2 ">
                <LoginInput
                  name={"Email"}
                  placeholder={"Email ID"}
                  labelText={"Email"}
                  flex1={"w-full"}
                />
                {error.Email && (
                  <div className="text-red-500 text-sm">{error.Email}</div>
                )}
              </div>
              <div className="flex flex-col items-start  gap-2 ">
                <LoginInput
                  name={"Password"}
                  placeholder={"Enter Password"}
                  labelText={"Password"}
                  type={"password"}
                  flex1={"w-full"}
                />
                {error.Password && (
                  <div className="text-red-500 text-sm">{error.Password}</div>
                )}
              </div>
              <LoginBtn
                text={loading ? "Signing In..." : "Sign In"}
                disabled={loading}
              />
            </form>
            <LoginSeprator text={"Login in with"} />
            <div className="flex  items-center justify-between gap-2">
              <LoginPlatform img={face} text={"Facebook"} />
              <LoginPlatform img={microsoft} text={"Google"} />
              <LoginPlatform img={google} text={"Microsoft"} />
            </div>
          </div>
        </div>
        <img
          src={loginImage}
          alt=""
          className=" hidden lg:block lg:w-[35%] xl:w-[45%] 2xl:w-[70%] h-screen object-cover  "
        />
      </section>
    </main>
  );
};

export default Login;
