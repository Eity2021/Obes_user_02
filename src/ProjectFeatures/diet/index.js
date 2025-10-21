import PlanBuilder from "./PlanBuilder";
import { useGetDietQuery } from "../../features/dietChart/dietApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import TitleCard from "../../components/Cards/TitleCard";

export default function DietPlan() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    error: profileErr,
  } = useGetProfileQuery(auth?.role);

  const {
    data: dietMealData,
    isLoading,
    isError,
    error,
  } = useGetDietQuery({
    mycalory: profile?.data?.mycalory,
    role: profile?.data?.role,
  });
  console.log(" dietMealData", dietMealData) 



  if (profileLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-full bg-white">
        <p className="text-gray-600 font-[poppins]">
          Loading your diet plan...
        </p>
      </div>
    );
  }
  // 🔹 Error State
  if (profileError || isError) {
    return (
      <div className="flex justify-center items-center h-full bg-white">
        <p className="text-red-500 font-[poppins]">
          {profileErr?.data?.message ||
            error?.data?.message ||
            "Something went wrong while fetching your diet plan."}
        </p>
      </div>
    );
  }

  return (

    <div className="">
      <TitleCard>
        <PlanBuilder dietMealData={dietMealData} />
      </TitleCard>
    </div>

  );
}
