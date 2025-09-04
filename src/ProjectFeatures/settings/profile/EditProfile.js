import { useForm } from "react-hook-form";
import { useUpdateProfileMutation } from "../../../features/profile/profileApi";
export default function EditProfile({ setIsOpen, isOpen }) {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const [updateProfile, { isLoading }] = useUpdateProfileMutation(auth?.role);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

   const onSubmit = async (data) => {
    console.log("data", data)
    try {
      await updateProfile({ role: auth?.role, data }).unwrap();
      alert("Profile updated successfully!");
      reset();
      setIsOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };


  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        {/* Open Modal Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Open Modal
        </button>

        {/* Modal Overlay */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Modal Content */}
            <div className="bg-white rounded-2xl shadow-lg w-[90%] max-w-md p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
              >
                ✕
              </button>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
              </div>
            </div>
     
        )}
      </div>
    </div>
  );
}
