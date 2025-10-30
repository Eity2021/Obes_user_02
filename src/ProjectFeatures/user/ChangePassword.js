import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useCreateChangePasswordMutation } from "../../features/forget/forgetApi";

export default function ChangePassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId || "";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createChangePassword, { data, isLoading, isError, isSuccess, error }] =
    useCreateChangePasswordMutation();

  const onSubmit = async (data) => {

    try {
      const submissionData = {
        user_id: data.user_id,
        password: data.password,
        password_confirmation: data.password_confirmation,
      };

      const response = await createChangePassword(submissionData);

      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        reset();
        navigate("/login");
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
            Set New Password
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-md font-medium text-gray-600 mb-1">
                Enter Password
              </label>
              {userId && (
                <input
                  {...register("user_id", { required: true })}
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-transparent hidden"
                  value={userId}
                />
              )}
              <input
                {...register("password", { required: true })}
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-transparent"
                placeholder="password"
              />
              <input
                {...register("password_confirmation", { required: true })}
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-transparent mt-3"
                placeholder="confirm password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary transition"
            >
              Change password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
