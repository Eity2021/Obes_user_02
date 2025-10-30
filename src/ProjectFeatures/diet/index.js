import PlanBuilder from "./PlanBuilder";
import { useGetDietQuery } from "../../features/dietChart/dietApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import TitleCard from "../../components/Cards/TitleCard";

export default function DietPlan() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  let caloryCalled = 0 ;
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    error: profileErr,
  } = useGetProfileQuery(auth?.role);

  
  const result = profile?.data?.mycalory;

  
if (result) {
  if (result <= 1000) caloryCalled = 1000;
  else if (result <= 1200) caloryCalled = 1200;
  else if (result <= 1400) caloryCalled = 1400;
  else if (result <= 1600) caloryCalled = 1600;
  else if (result <= 1800) caloryCalled = 1800;
  else caloryCalled = 2000;
}


  const {
    data: dietMealData,
    isLoading,
    isError,
    error,
  } = useGetDietQuery({
    role: profile?.data?.role,
    mycalory: caloryCalled,
  });


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
