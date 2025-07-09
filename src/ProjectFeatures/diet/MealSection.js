import {Flame, Salad } from "lucide-react";
export default function MealSection({ title, time, calories, items }) {
  return (
    <div className="rounded-lg border border-[#e5e3e3] p-4 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="flex gap-2">
            <div className="flex items-center">
            <Salad className="mx-auto h-6 w-6 text-primary" />
            </div>
            <h3 className="text-[24px] font-semibold" style={{ fontFamily: "poppins" }}>{title}</h3>
          </div>
          <p className="text-sm text-[#5c5c5c]" style={{ fontFamily: "poppins" }}>{time}</p>
        </div>
     <div className="flex border border-[#e5e3e3] px-2 rounded-2xl py-1">
     <span> <Flame className="mx-auto h-4 w-4 text-primary" /></span>
        <div className="text-[12px] font-medium text-gray-700"  style={{ fontFamily: "poppins" }}>{calories} kcal</div>
     </div>

      </div>

      <div className="space-y-3 mt-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between pt-2 ">
            <div>
              <div className="text-[15px] font-semibold text-[#1e1e1e]" style={{ fontFamily: "poppins" }}> {item.name}</div>
              <div className="text-xs text-[#5c5c5c]"  style={{ fontFamily: "poppins" }}>
                <div className="text-[12px] mt-1" >
                  P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                </div>
              </div>
            </div>
            <div>
                <p  className="text-[14px] font-medium" style={{ fontFamily: "poppins" }}>{item.calories} kcal</p>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
}
