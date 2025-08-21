import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useEffect, useState } from "react";
import LandingIntro from "./LandingIntro";
import useNavigator from "../../hooks/useNavigator";
import { useLoginMutation } from "../../features/auth/authApi";
import { userLoggedIn } from "../../features/auth/authSlice";
import { setUser } from "../../features/profile/profileSlice";

function Login() {
  const { handleNavigation } = useNavigator();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const [resLogin, { data, isLoading, error: loginError }] = useLoginMutation();

  console.log("data", data)
  useEffect(() => {
    if (data?.token) {
      dispatch(userLoggedIn());
      dispatch(setUser(data));
      handleNavigation("/");
    }
  }, [data, dispatch, handleNavigation]);


  const onSubmit = (formData) => {
    setError("");
    resLogin({
      login: formData.login,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 w-100">
                <div className="mb-3">
                  <p className="font-serif  text-[16px] mb-1">Mobile Number*</p>
                  <input
                    type=""
                    name="login"
                    {...register("login")}
                    placeholder="Mobile Number"
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                  />
                </div>
                <div>
                  <p className="font-serif  text-[16px] mb-1">Password*</p>
                  <input
                    name="password"
                    {...register("password")}
                    placeholder="Password"
                    type="password"
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                  />
                </div>
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                    Forgot Password?
                  </span>
                </Link>
              </div>

              <button
                type="submit"
                className={
                  "btn mt-2 w-full bg-primary text-[#fff] hover:bg-primary"
                }
              >
                Login
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className=" font-bold inline-block  text-primary underline hover:cursor-pointer transition duration-200">
                    Register
                  </span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
