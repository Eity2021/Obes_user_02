import { useState } from "react";

import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useGetDietQuery } from "../../features/dietChart/dietApi";
import { Clock, Utensils, Coffee, Moon, Zap, } from "lucide-react";

export default function PlanBuilder() {
  const [activeTab, setActiveTab] = useState("english");

  const { data: profile } = useGetProfileQuery();

  const {
    data: dietMealData,
    isLoading,
    isError,
    error,
  } = useGetDietQuery({ mycalory: profile?.data?.mycalory, role: profile?.data?.role });


  const MealCard = ({ title, content, icon: Icon, isEmpty = false }) => (
    <div className={`rounded-xl border bg-white shadow p-4 h-full ${isEmpty ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
        <Icon className="w-5 h-5" />
        {title}
      </div>
      <div className="text-sm text-gray-700 whitespace-pre-line">
        {content ? content : <em className="text-gray-400">No items planned</em>}
      </div>
    </div>
  );




  return (
    <div className="w-full">
      <div className="min-h-screen  p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Daily Meal Plan</h1>
            <p className="text-gray-600">Complete nutrition guide for your day</p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-2 max-w-md w-full bg-white border rounded-xl overflow-hidden">

              <button
                onClick={() => setActiveTab("english")}
                className={`py-3 font-medium ${activeTab === "english" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
              >
                English
              </button>
              <button
                onClick={() => setActiveTab("bengali")}
                className={`py-3 font-medium ${activeTab === "bengali" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Bengali Tab */}
          {activeTab === "bengali" && (
            <div className="space-y-8">
              <div className="flex justify-center mb-6">
                <div className="flex items-center bg-primary text-white px-4 py-2 rounded-full text-lg font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  মোট ক্যালোরি: {dietMealData?.data?.calorybn}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MealCard title="সকালের নাস্তা" content={dietMealData?.data?.breakfastbn} icon={Coffee} />
                <MealCard title="সকালের জলখাবার" content={dietMealData?.data?.morn_snacksbn} icon={Utensils} isEmpty={!dietMealData?.data?.morn_snacksbn} />
                <MealCard title="দুপুরের খাবার" content={dietMealData?.data?.lunchbn} icon={Utensils} />
                <MealCard title="বিকেলের জলখাবার" content={dietMealData?.data?.anoon_snacksbn} icon={Coffee} isEmpty={!dietMealData?.data?.anoon_snacksbn} />
                <MealCard title="রাতের খাবার" content={dietMealData?.data?.dinnerbn} icon={Utensils} />
                <MealCard title="ঘুমের আগে" content={dietMealData?.data?.sleep_milkbn} icon={Moon} />
              </div>
            </div>
          )}

          {/* English Tab */}
          {activeTab === "english" && (
            <div className="space-y-8">
              <div className="flex justify-center mb-6">
                <div className="flex items-center bg-primary text-white px-4 py-2 rounded-full text-lg font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  Total Calories: {dietMealData?.data?.caloryen}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MealCard title="Breakfast" content={dietMealData?.data?.breakfasten} icon={Coffee} />
                <MealCard title="Morning Snacks" content={dietMealData?.data?.morn_snacksen} icon={Utensils} isEmpty={!dietMealData?.data?.morn_snacksen} />
                <MealCard title="Lunch" content={dietMealData?.data?.lunchen} icon={Utensils} />
                <MealCard title="Afternoon Snacks" content={dietMealData?.data?.anoon_snacksen} icon={Coffee} isEmpty={!dietMealData?.data?.anoon_snacksen} />
                <MealCard title="Dinner" content={dietMealData?.data?.dinneren} icon={Utensils} />
                <MealCard title="Before Sleep" content={dietMealData?.data?.sleep_milken} icon={Moon} />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-gray-500 flex justify-center items-center gap-2">
            <Clock className="w-4 h-4" />
            Plan created: {new Date(dietMealData?.data?.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
}
