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
  const [isProcessing, setIsProcessing] = useState(false); 

  const { register, handleSubmit, formState: { errors }, } = useForm();

  const [resLogin, { data, isLoading, error: loginError }] = useLoginMutation();

  useEffect(() => {
    if (data?.token) {
      dispatch(userLoggedIn());
      dispatch(setUser(data?.data?.role));
      handleNavigation("/");
    }
  }, [data, dispatch, handleNavigation]);

  const onSubmit = (formData) => {
    setError("");
    setIsProcessing(true); 
    resLogin({
      login: formData.login,
      password: formData.password,
    });

    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl shadow-xl">
        <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
          <div>
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 w-100">
                <div className="mb-3">
                  <p className="font-serif text-[16px] mb-1">
                    Mobile Number/Email*
                  </p>
                  <input
                    {...register("login", { required: "Email/Number is required" })}
                    placeholder="Mobile Number"
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                  />

                  {errors.login && (
    <p className="text-red-500 text-sm mt-1">{errors?.login?.message}</p>
  )}
                </div>
                <div>
                  <p className="font-serif text-[16px] mb-1">Password*</p>
                  <input
                    {...register("password",  { required: "password is required" })}
                    placeholder="Password"
                    type="password"
                    className="input border-[#d8d8d8] focus:outline-none focus:ring-0 w-[100%]"
                  />
                                {errors.password && (
    <p className="text-red-500 text-sm mt-1">{errors?.password?.message}</p>
  )}
                </div>
              </div>

              <div className="text-right text-primary">
                <Link to="/forgot-password">
                  <span className="text-sm hover:underline">Forgot Password?</span>
                </Link>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`btn mt-2 w-full ${
                  isProcessing ? "bg-gray-400" : "bg-primary hover:bg-primary"
                } text-white`}
              >
                {isProcessing ? "Processing..." : "Login"}
              </button>

              <div className="text-center mt-4">
                Don't have an account yet?{" "}
                <Link to="/register">
                  <span className="font-bold text-primary underline hover:cursor-pointer">
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
