import TitleCard from "../../../components/Cards/TitleCard";
import { useGetProfileQuery } from "../../../features/profile/profileApi";
import { CalendarDays, Mail, Phone, User, Shield, Clock } from "lucide-react";

function Profile() {
  const { data: profile } = useGetProfileQuery();
     console.log("user", profile)
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

  const getInitials = (name) => {
    if (!name) return "";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <TitleCard title="Welcome to User Profile" topMargin="mt-2">
        <div className="mx-auto p-4">
          <div className="bg-white shadow-md rounded-2xl p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 text-center text-xl flex items-center justify-center font-semibold">
                <img
                  src={profile?.data?.imgpath}
                  alt={profile?.data?.fullname}
                  className="object-cover w-full h-full"
                />
                {!profile?.data?.imgpath &&
                  getInitials(profile?.data?.fullname)}
              </div>
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-2xl font-bold font-[poppins]">
                  {profile?.data?.fullname}
                </h2>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                  <span
                    className={`px-2 py-1 text-[16px] rounded ${profile?.data?.status === "active"
                        ? "bg-green-100 text-green-700 font-medium font-poppins"
                        : "bg-gray-200 text-gray-600 font-medium font-poppins"
                      }`}
                  >
                    {profile?.data?.status}
                  </span>
                  <span className="px-2 py-1 text-[16px] rounded border capitalize font-medium  font-poppins">
                    {profile?.data?.role}
                  </span>
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
              <div className="space-y-3 text-sm text-gray-800">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>{profile?.data?.logemail}</span>
                  {!profile?.data?.email_verified_at && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded font-poppins">
                      Unverified
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 font-poppins">
                  <Phone className="w-4 h-4 text-gray-500" />
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
              <div className="space-y-3 text-sm text-gray-800 font-poppins">
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
                <div className="flex gap-3">
                  <span className="w-24 text-gray-500 font-poppins">Code:</span>
                  <span className="font-poppins">{profile?.data?.code}</span>
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
              <div className="space-y-3 text-sm text-gray-800">
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
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Profile;
