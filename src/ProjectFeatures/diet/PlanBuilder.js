import React, { useState } from "react";
import MealSection from "./MealSection";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useGetDietQuery } from "../../features/dietChart/dietApi";
export default function PlanBuilder() {
  const [tab, setTab] = useState("breakfast");

 const { data: profile } = useGetProfileQuery();
     console.log("profile", profile?.data?.mycalory)
  const {
    data: bmi,
    isLoading,
    isError,
    error,
  } = useGetDietQuery({mycalory: profile?.data?.mycalory ,role: profile?.data?.role});


  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="tabs w-full rounded-md overflow-hidden border border-base-300 ">
        {["breakfast", "lunch", "Dinner"].map((key) => (
          <button
            key={key}
            className={`tab tab-bordered flex-1 text-md font-semibold font-[poppins] ${
              tab === key
                ? "tab-active bg-primary text-white"
                : "bg-base-100 text-gray-700 hover:bg-base-200"
            }`}
            onClick={() => setTab(key)}
            style={{ fontFamily: "poppins" }}>
            {key === "breakfast"
              ? "Breakfast"
              : key === "lunch"
              ? "Lunch"
              : "Dinner"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 space-y-6">
        {tab === "breakfast" && (
          <>
            <MealSection
              title="Breakfast"
              time="7:00 - 8:00 AM"
              calories={450}
              items={[
                {
                  name: "Greek Yogurt with Berries",
                  calories: 220,
                  protein: 18,
                  carbs: 24,
                  fat: 8,
                },
                {
                  name: "Whole Grain Toast",
                  calories: 120,
                  protein: 4,
                  carbs: 22,
                  fat: 2,
                },
                {
                  name: "Black Coffee",
                  calories: 5,
                  protein: 0,
                  carbs: 0,
                  fat: 0,
                },
                {
                  name: "Almonds (10)",
                  calories: 70,
                  protein: 3,
                  carbs: 2,
                  fat: 6,
                },
              ]}
            />

      
{/* 
            <MealSection
              title="Snack"
              time="3:30 - 4:00 PM"
              calories={200}
              items={[
                {
                  name: "Protein Shake",
                  calories: 150,
                  protein: 25,
                  carbs: 5,
                  fat: 2,
                },
                {
                  name: "Banana",
                  calories: 105,
                  protein: 1,
                  carbs: 27,
                  fat: 0,
                },
              ]}
            /> */}

            
          </>
        )}

        {tab === "lunch" && (
          <div >
               <MealSection
              title="Lunch"
              time="12:00 - 1:00 PM"
              calories={650}
              items={[
                {
                  name: "Grilled Chicken Salad",
                  calories: 350,
                  protein: 35,
                  carbs: 15,
                  fat: 18,
                },
                {
                  name: "Quinoa (1/2 cup)",
                  calories: 120,
                  protein: 4,
                  carbs: 21,
                  fat: 2,
                },
                {
                  name: "Olive Oil Dressing (1 tbsp)",
                  calories: 120,
                  protein: 0,
                  carbs: 0,
                  fat: 14,
                },
                {
                  name: "Apple",
                  calories: 80,
                  protein: 0,
                  carbs: 21,
                  fat: 0,
                },
              ]}
            />
          </div>
        )}

        {tab === "Dinner" && (
          <div >
           <MealSection
              title="Dinner"
              time="7:00 - 8:00 PM"
              calories={550}
              items={[
                {
                  name: "Baked Salmon (5 oz)",
                  calories: 300,
                  protein: 30,
                  carbs: 0,
                  fat: 15,
                },
                {
                  name: "Steamed Broccoli",
                  calories: 55,
                  protein: 4,
                  carbs: 11,
                  fat: 0,
                },
                {
                  name: "Brown Rice (1/2 cup)",
                  calories: 120,
                  protein: 3,
                  carbs: 25,
                  fat: 1,
                },
                {
                  name: "Mixed Berries (1/2 cup)",
                  calories: 40,
                  protein: 0,
                  carbs: 10,
                  fat: 0,
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}
