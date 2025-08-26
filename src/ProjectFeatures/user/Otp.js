import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateForgetOtpMutation } from "../../features/forget/forgetApi";

export default function Otp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createForgetOtp, { data, isLoading, isError, isSuccess, error }] =
    useCreateForgetOtpMutation();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const submissionData = {
        email: data.email,
        otp: data.otp,
      };

      const response = await createForgetOtp(submissionData);

      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        console.log(response?.data?.user_id);
        reset();
        navigate("/change-password", {
          state: { userId: response?.data?.user_id },
        });
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit answer.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="w-full max-w-sm bg-[#f7f7f7] rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Verify OTP
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-md font-medium text-gray-600 mb-1">
                Enter OTP
              </label>
              {email && (
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-transparent hidden"
                  value={email || ""}
                />
              )}
              <input
                {...register("otp", { required: true })}
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-transparent"
                placeholder="Enter 6-digit code"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary transition"
            >
              Verify
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Didn’t receive the code?{" "}
            <button className="text-primary hover:underline font-semibold font-[poppins]">
              Resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
