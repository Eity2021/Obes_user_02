import { useState } from "react";
import { Utensils, Coffee, Moon, Zap } from "lucide-react";

export default function PlanBuilder({ dietMealData }) {
  const [activeTab, setActiveTab] = useState("english");

  const MealCard = ({ title, content, icon: Icon, isEmpty = false }) => (
    <div
      className={`rounded-xl border shadow p-4 h-full font-poppins ${isEmpty ? "opacity-50" : ""
        }`}
    >
      <div className="flex items-center gap-2 mb-2 text-lg font-semibold font-poppins">
        <Icon className="w-5 h-5" />
        {title}
      </div>
      <div className="text-sm text-gray-700 whitespace-pre-line font-poppins">
        {content ? (
          content
        ) : (
          <em className="text-gray-400 font-poppins">No items planned</em>
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="p-4 mb-20">
        <div className="border-b pb-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-700 mb-2 font-poppins">
            Daily Meal Plan
          </h1>
          <p className="text-gray-500 text-lg font-poppins">
            Complete nutrition guide for your day
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-2 max-w-md w-full  border rounded-xl overflow-hidden">
            <button
              onClick={() => setActiveTab("english")}
              className={`py-3 font-medium ${activeTab === "english"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              English
            </button>
            <button
              onClick={() => setActiveTab("bengali")}
              className={`py-3 font-medium ${activeTab === "bengali"
                ? "bg-primary text-white"
                : "text-gray-600 hover:bg-gray-100"
                }`}
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
                মোট ক্যালোরি : {dietMealData?.data?.calorybn}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MealCard
                title="সকালের নাস্তা"
                content={dietMealData?.data?.breakfastbn}
                icon={Coffee}
              />
              <MealCard
                title="সকালের নাস্তা"
                content={dietMealData?.data?.morn_snacksbn}
                icon={Utensils}
                isEmpty={!dietMealData?.data?.morn_snacksbn}
              />
              <MealCard
                title="দুপুরের খাবার"
                content={dietMealData?.data?.lunchbn}
                icon={Utensils}
              />
              <MealCard
                title="বিকেলের নাস্তা"
                content={dietMealData?.data?.anoon_snacksbn}
                icon={Coffee}
                isEmpty={!dietMealData?.data?.anoon_snacksbn}
              />
              <MealCard
                title="রাতের খাবার"
                content={dietMealData?.data?.dinnerbn}
                icon={Utensils}
              />
              <MealCard
                title="ঘুমের আগে"
                content={dietMealData?.data?.sleep_milkbn}
                icon={Moon}
              />
            </div>
          </div>
        )}

        {/* English Tab */}
        {activeTab === "english" && (
          <div className="space-y-8">
            <div className="flex justify-center mb-6">
              <div className="flex items-center bg-primary text-white px-4 py-2 rounded-full text-lg font-medium font-poppins">
                <Zap className="w-4 h-4 mr-2" />
                Total Calories: {dietMealData?.data?.caloryen}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MealCard
                title="Breakfast"
                content={dietMealData?.data?.breakfasten}
                icon={Coffee}
              />
              <MealCard
                title="Morning Snacks"
                content={dietMealData?.data?.morn_snacksen}
                icon={Utensils}
                isEmpty={!dietMealData?.data?.morn_snacksen}
              />
              <MealCard
                title="Lunch"
                content={dietMealData?.data?.lunchen}
                icon={Utensils}
              />
              <MealCard
                title="Afternoon Snacks"
                content={dietMealData?.data?.anoon_snacksen}
                icon={Coffee}
                isEmpty={!dietMealData?.data?.anoon_snacksen}
              />
              <MealCard
                title="Dinner"
                content={dietMealData?.data?.dinneren}
                icon={Utensils}
              />
              <MealCard
                title="Before Sleep"
                content={dietMealData?.data?.sleep_milken}
                icon={Moon}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
