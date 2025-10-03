import SignupImage from "../assets/login/a46d07caf0f76651a4f6375cbce96bf6f8f37721.jpg";
import LoginInput from "../components/login/LoginInput";
import LoginPlatform from "../components/login/LoginPlatform";
import face from "../assets/login/facebook.png";
import google from "../assets/login/microsoft.png";
import microsoft from "../assets/login/google.png";
import LoginSeprator from "../components/login/LoginSeprator";
import LoginBtn from "../components/login/LoginBtn";
import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { tokenAtom } from "../atoms/authAtom";
import { useAtom } from "jotai";
import { cartAtom } from "../atoms/cartAtom";
import { fetchBasket } from "../Services/BasketService";

const SignupSchema = z
  .object({
    FirstName: z.string().min(1, "First name is required"),
    LastName: z.string().min(1, "Last name is required"),
    UserName: z.string().min(3, "User name must be at least 3 characters long"),
    Email: z.string().email("Invalid email address"),
    Password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[^a-zA-Z0-9]/, "Password must contain a special character"),
    ConfirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long")
      .max(100),
  })
  .refine((data) => data.Password === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ["ConfirmPassword"],
  });

const Signup = () => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [_, setTokenAtomValue] = useAtom(tokenAtom);
  const [__,setCart]=useAtom(cartAtom);


  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      setIsLoading(true);
      const res = await fetch("https://localhost:7031/api/Auth/Signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to signup");
      }
      console.log("done");
      return res.json();
    },
    onSuccess: async (data) => {
      setIsLoading(false);

      setTokenAtomValue(data.Token);
      localStorage.setItem("token", data.Token);

      const basket = await fetchBasket(data.Token);
      setCart(basket.Items); 
      console.log(basket);
      toast.success(`Welcome back ${data.DisplayName}`);
      navigate("/");
    },
    onError: () => {
      setIsLoading(false);
      toast.error("Failed To Signup");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const parsed = SignupSchema.safeParse(data);
    let passwordMismatch = false;
    if (!parsed.success) {
      const issues = parsed.error.issues;
      const errors = {};
      for (const issue of issues) {
        const field = issue.path[0];
        if (!errors[field]) errors[field] = issue.message;
        if (
          field === "ConfirmPassword" &&
          issue.message === "Passwords don't match"
        ) {
          passwordMismatch = true;
        }
        console.log(issue.message);
      }
      if (passwordMismatch) {
        toast.error("Passwords don't match");
      }
      console.log("s");
      setError(errors);
      return;
    }
    setIsLoading(true);
    const { ConfirmPassword, ...payload } = data;
    console.log(payload);
    mutation.mutate(payload);
  };

  return (
    <main>
      <section className="flex  ">
        <img
          src={SignupImage}
          alt=""
          className=" hidden lg:block lg:w-[35%] xl:w-[48%] h-screen object-cover  "
        />
        <div className="flex flex-col items-center text-center text-black w-full py-10 px-2 md:p-20 md:px-6 lg:px-6 gap-6">
          <h2 className="leading-1.3 font-semibold text-3xl">
            Create your Account
          </h2>
          <div className="flex flex-col justify-center gap-6 ">
            <form
              onSubmit={handleSubmit}
              className="gap-2 flex flex-col max-w-300"
            >
              <h5 className="font-semibold leading-1.6 text-lg text-left">
                Full Name
              </h5>
              <div className="flex flex-col md:flex-row gap-3 md:gap-8 ">
                <LoginInput
                  name={"FirstName"}
                  placeholder={"First Name"}
                  NoLabel
                  flex1={"flex-1 "}
                />
                <LoginInput
                  name={"LastName"}
                  placeholder={"Last Name"}
                  NoLabel
                  flex1={"flex-1 "}
                />
              </div>

              {error.FirstName && (
                <span className="text-red-500 text-left">
                  {error.FirstName}
                </span>
              )}
              {error.LastName && (
                <span className="text-red-500 text-left">{error.LastName}</span>
              )}
              <LoginInput
                name={"UserName"}
                placeholder={"User Name"}
                labelText={"User Name"}
              />
              {error.UserName && (
                <span className="text-red-500 text-left">{error.UserName}</span>
              )}
              <LoginInput
                name={"Email"}
                placeholder={"Email ID"}
                labelText={"Email"}
              />
              {error.Email && (
                <span className="text-red-500 text-left">{error.Email}</span>
              )}
              <div className="flex flex-col md:flex-row gap-2 md:gap-3  justify-between">
                <div className="flex md:flex-1 flex-col gap-2">
                  <LoginInput
                    name={"Password"}
                    placeholder={"Enter Password"}
                    labelText={"Password"}
                    flex1={"flex-1   "}
                    type="password"
                  />
                </div>
                <div className="flex md:flex-1 flex-col gap-2">
                  <LoginInput
                    name={"ConfirmPassword"}
                    placeholder={"Confirm Password"}
                    labelText={"Confirm Password"}
                    flex1={" flex-1    "}
                    type="password"
                  />
                </div>
              </div>
              {(error.Password || error.ConfirmPassword) && (
                <span className="text-red-500 text-left">
                  {error.Password || error.ConfirmPassword}
                </span>
              )}
              <LoginBtn
                text={
                  loading ? "Creating Your Account..." : "Create Your Account"
                }
                disabled={loading}
              />
            </form>
            <LoginSeprator text={"Sign up with"} />
            <div className="flex  items-center justify-between gap-2">
              <LoginPlatform img={face} text={"Facebook"} />
              <LoginPlatform img={microsoft} text={"Google"} />
              <LoginPlatform img={google} text={"Microsoft"} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Signup;
