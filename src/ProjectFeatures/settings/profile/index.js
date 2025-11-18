import { useCreateEmailVerifyMutation } from "../../../features/emailVerify/emailApi";
import { useCreateResetMutation } from "../../../features/reset/resetApi";
import { useGetProfileQuery } from "../../../features/profile/profileApi";
import TitleCard from "../../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SquarePen } from "lucide-react";
import { toast } from "react-toastify";
import {
  CalendarDays,
  Mail,
  Phone,
  User,
  Shield,
  Clock,
  KeyRound,
  UserRoundPen,
} from "lucide-react";
import { useState } from "react";

import EditProfile from "./EditProfile";
import UpdateProfileInfo from "./UpdateProfileInfo";

function Profile() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { data: profile } = useGetProfileQuery(auth?.role);
  const [isOpen, setIsOpen] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);



  const handleShowingInfoEdit = () => {
    setShowModalEdit(true);
  };

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [verifyEmail, { data, isLoading, isError, isSuccess, error }] =
    useCreateEmailVerifyMutation();

  const handleClick = () => {
    if (profile?.data?.id) {
      verifyEmail(profile.data.id);
    } else {
      console.log("User ID not available yet");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [createReset] = useCreateResetMutation();

  const onSubmit = async (formData) => {


    try {
      const submissionData = {
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      const role = profile?.data?.role;
      const response = await createReset({ data: submissionData, role });

      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        reset();
        navigate("/");
      } else {
        toast.error(
          response?.data?.message || "Submission failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to reset password."
      );
    }
  };
  return (
    <>
      <TitleCard title="Welcome to User Profile" topMargin="mt-2">
        <div className="mx-auto p-4">
          <div className=" shadow-md rounded-2xl p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className=" w-24 h-24 rounded-full overflow-hidden bg-gray-100 text-center text-xl flex items-center justify-center font-semibold">
                  <img
                    src={profile?.data?.imgpath}
                    alt={profile?.data?.fullname}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div
                  className="absolute top-[64px] right-0 bg-primary rounded-[50%] shadow-md p-1 cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  <UserRoundPen size={20} color="#fff" />
                </div>
              </div>

              <div className="text-center sm:text-left flex-1 flex justify-between">
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                  <span
                    className={`px-2 py-1 text-[16px] rounded ${profile?.data?.status === "active"
                      ? "bg-green-100 text-green-700 font-medium font-poppins"
                      : "bg-gray-200 text-gray-700 font-medium font-poppins"
                      }`}
                  >
                    {profile?.data?.status}
                  </span>
                  <span className="px-2 py-1 text-[16px] rounded border capitalize font-medium  font-poppins">
                    {profile?.data?.role}
                  </span>
                </div>
                <div
                  className="flex items-center pointer"
                  onClick={handleShowingInfoEdit}
                >
                  <div className="bg-primary text-white hover:bg-primary flex gap-2 py-2 px-2 rounded-md ">
                    <SquarePen />
                    <p>Profile Edit</p>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            {/* Contact Information */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 font-poppins">
                <User className="w-5 h-5" />
                Contact Information
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{profile?.data?.logemail}</span>

                  <div className="flex gap-2">
                    <div>
                      <div>
                        {profile?.data?.email_verified_at === null && (
                          <button
                            onClick={handleClick}
                            disabled={isLoading}
                            className="bg-primary text-white  px-2 py-1 text-xs rounded font-poppins"
                          >
                            {isLoading ? "Verifying..." : "Verify Email"}
                          </button>
                        )}

                        {profile?.data?.email_verified_at !== null && (
                          <p className="text-green-600">
                            {data?.message || "Email verified ✅"}
                          </p>
                        )}

                        {isSuccess && (
                          <p className="text-green-600">
                            Verification email sent
                          </p>
                        )}
                        {isError && (
                          <p className="text-red-600">
                            Error: {error?.data?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 font-poppins">
                  <Phone className="w-4 h-4 text-gray-500ext-gray-500" />
                  <span>{profile?.data?.logmobile}</span>
                </div>
              </div>
            </div>

            <hr />

            {/* Personal Information */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 font-poppins">
                <CalendarDays className="w-5 h-5" />
                Personal Information
              </h3>
              <div className="space-y-3 text-sm text-gray-700 font-poppins">
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Full Name:
                  </span>
                  <span className="font-poppins">{profile?.data?.fulname}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Birthday:
                  </span>
                  <span className="font-poppins">
                    {formatDate(profile?.data?.dob)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Gender:
                  </span>
                  <span className="capitalize font-poppins">
                    {profile?.data?.ogender}
                  </span>
                </div>
              </div>
            </div>

            <hr />

            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 font-poppins">
                <CalendarDays className="w-5 h-5" />
                Physical Information
              </h3>
              <div className="space-y-3 text-sm text-gray-700 font-poppins">
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Height:
                  </span>
                  <span className="font-poppins">
                    {profile?.data?.myhight} Inch
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Weight:
                  </span>
                  <span className="font-poppins">
                    {profile?.data?.myweight} kg
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">BMI:</span>
                  <span className="font-poppins">{profile?.data?.mybmi}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Calory:
                  </span>
                  <span className="font-poppins">
                    {profile?.data?.mycalory}
                  </span>
                </div>

                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Category:
                  </span>
                  <span className="capitalize font-poppins">
                    {profile?.data?.bmicat}
                  </span>
                </div>
              </div>
            </div>

            <hr />

            {/* Account Information */}
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 font-poppins">
                <Clock className="w-5 h-5" />
                Account Information
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Created:
                  </span>
                  <span>{formatDateTime(profile?.data?.created_at)}</span>
                </div>
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">
                    Updated:
                  </span>
                  <span className="font-poppins">
                    {formatDateTime(profile?.data?.updated_at)}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">Role:</span>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span className="capitalize font-poppins">
                      {profile?.data?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4 font-poppins">
                <KeyRound className="w-5 h-5" />
                Reset Password
              </h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="md:flex block gap-3">
                    <span className="md:w-24 w-full text-gray-500 font-poppins">
                      Old Password:
                    </span>

                    <div className="form-control  md:mt-0 mt-1">
                      <input
                        type="password"
                        placeholder="Old password"
                        name="password"
                        {...register("password", { required: true })}
                        className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="md:flex block gap-3">
                    <span className="md:w-24 w-full text-gray-500 font-poppins">
                      New password:
                    </span>

                    <div className="form-control md:mt-0 mt-1">
                      <input
                        type="password"
                        placeholder="New password"
                        name="password_confirmation"
                        {...register("password_confirmation", {
                          required: true,
                        })}
                        className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="md:ml-48 ml-0 mt-4">
                  <button
                    type="submit"
                    className="btn px-10 bg-primary hover:bg-secondary flex-1 text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </TitleCard>
      <EditProfile isOpen={isOpen} setIsOpen={setIsOpen}></EditProfile>
      <UpdateProfileInfo
        showModalEdit={showModalEdit}
        setShowModalEdit={setShowModalEdit}
      ></UpdateProfileInfo>
    </>
  );
}

export default Profile;
