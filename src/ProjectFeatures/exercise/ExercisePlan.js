import React from 'react'
import ProgressItem from './ProgressItem'
import TipItem from './TipItem'
import { Flame,Utensils,Heart } from "lucide-react";
export default function ExercisePlan() {
  return (
    <div>
  <div className="space-y-6">
      {/* Daily Progress Card */}
      <div className="rounded-xl border border-[#d1d1cf] shadow-sm">
        <div className="border-b px-6 py-4 border-[#d1d1cf]">
          <h2 className="text-lg font-semibold" style={{ fontFamily: "poppins" }}>Daily Progress</h2>
        </div>
        <div className="p-6 space-y-4">
          <ProgressItem label="Calories" value={72} current="1,450" total="2,000" />
          <ProgressItem label="Protein" value={70} current="85g" total="120g" />
          <ProgressItem label="Water" value={72} current="1.8L" total="2.5L" />
          <ProgressItem label="Exercise" value={66} current="40min" total="60min" />
        </div>
      </div>

      {/* Nutrition Tips Card */}
      <div className="rounded-xl border border-[#d1d1cf] shadow-sm">
        <div className="border-b px-6 py-4 border-[#d1d1cf]">
          <h2 className="text-lg font-semibold" style={{ fontFamily: "poppins" }}>Nutrition Tips</h2>
        </div>
        <div className="p-6 space-y-4">
          <TipItem
            icon={<Flame className="h-4 w-4" />}
            iconBg="bg-amber-100 text-amber-600"
            title="Pre-workout Nutrition"
            desc="Consume a small meal with carbs and protein 1-2 hours before exercise for optimal energy."
          />
          {/* <Separator /> */}
          <TipItem
            icon={<Utensils className="h-4 w-4" />}
            iconBg="bg-green-100 text-green-600"
            title="Meal Timing"
            desc="Eat every 3-4 hours to maintain stable blood sugar and support metabolism."
          />
          {/* <Separator /> */}
          <TipItem
            icon={<Heart className="h-4 w-4" />}
            iconBg="bg-blue-100 text-blue-600"
            title="Recovery Foods"
            desc="Include anti-inflammatory foods like berries, fatty fish, and turmeric in your diet."
          />
        </div>
      </div>

      {/* Meal Prep Banner */}
      <div className="relative overflow-hidden rounded-lg">
        <img
          src="/placeholder.svg?height=200&width=400"
          alt="Healthy meal prep"
          width={400}
          height={200}
          className="h-auto w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 p-4 text-center">
          <div>
            <h3 className="text-lg font-medium text-white" style={{ fontFamily: "poppins" }}>Need meal prep ideas?</h3>
            <p className="mt-1 text-sm text-gray-200" style={{ fontFamily: "poppins" }}>
              Check out our recipe collection for quick and healthy meals.
            </p>
            <button className="mt-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100" style={{ fontFamily: "poppins" }}>
              View Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
