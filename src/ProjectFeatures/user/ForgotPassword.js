import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateForgetMutation } from "../../features/forget/forgetApi";
function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createForget, { data, isLoading, isError, isSuccess, error }] =
    useCreateForgetMutation();

  const onSubmit = async (data) => {

    try {
      const submissionData = {
        email: data.email,
      };

      const response = await createForget(submissionData);

      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        reset();
        navigate("/otp", { state: { email: data.email } });
      } else {
        toast.error(
          response?.data?.message || "Submission failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit answer.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Forgot Password
            </h2>
            <>
              <p className="my-8 font-semibold text-center">
                We will send password reset link on your email Id
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    containerStyle="mt-4"
                    labelTitle="Email Id"
                    className="w-full bg-transparent border py-2 rounded-md px-4"
                  />
                </div>
                <button
                  type="submit"
                  className={
                    "btn mt-2 w-full bg-primary" + (isLoading ? " loading" : "")
                  }
                >
                  Send Reset Link
                </button>

                <div className="text-center mt-4">
                  Don't have an account yet?{" "}
                  <Link to="/register">
                    <button className="  inline-block text-primary  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                      Register
                    </button>
                  </Link>
                </div>
              </form>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
