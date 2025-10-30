import { Flame, Utensils } from "lucide-react";
export default function DailySummery() {
  return (
    <div>
         <div className="space-y-6">
        {/* Daily Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-[18px] font-semibold" style={{ fontFamily: "poppins" }}>Daily Summary</h2>
            <p className="text-[14px] text-gray-500" style={{ fontFamily: "poppins" }}>Your nutritional overview</p>
          </div>

          <div className="space-y-4">
            {/* Calories */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className='text-[14px] text-[#1c1b1b]'  style={{ fontFamily: "poppins" }}>Calories</span>
                <span className='text-[14px] text-[#484848]' style={{ fontFamily: "poppins" }}>1,850 / 2,000</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "92.5%" }} />
              </div>
            </div>

            {/* Protein */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className='text-[14px] text-[#1c1b1b]' style={{ fontFamily: "poppins" }}>Protein</span>
                <span className='text-[14px] text-[#484848]' style={{ fontFamily: "poppins" }}>127g / 140g</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "90.7%" }} />
              </div>
            </div>

            {/* Carbs */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className='text-[14px] text-[#1c1b1b]' style={{ fontFamily: "poppins" }}>Carbs</span>
                <span  className='text-[14px] text-[#484848]' style={{ fontFamily: "poppins" }}>183g / 200g</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-green-500 rounded-full" style={{ width: "91.5%" }} />
              </div>
            </div>

            {/* Fat */}
            <div>
              <div className="flex justify-between text-sm font-medium mb-1">
                <span className='text-[14px] text-[#1c1b1b]' style={{ fontFamily: "poppins" }}>Fat</span>
                <span className='text-[14px] text-[#484848]' style={{ fontFamily: "poppins" }}>68g / 65g</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-red-500 rounded-full" style={{ width: "100.0%" }} />
              </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-2 gap-2 mt-6">
              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <Flame className="mx-auto h-5 w-5 text-orange-500" />
                <div className="text-[24px] font-bold mt-1" style={{ fontFamily: "poppins" }}>1,850</div>
                <div className="text-[12px] text-gray-500" style={{ fontFamily: "poppins" }}>Calories</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 text-center">
                <Utensils className="mx-auto h-5 w-5 text-green-500" />
                <div className="text-[24px] font-bold mt-1" style={{ fontFamily: "poppins" }}>4</div>
                <div className="text-[12px] text-gray-500" style={{ fontFamily: "poppins" }}>Meals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Water Intake */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold" style={{ fontFamily: "poppins" }}>Water Intake</h2>
            <p className="text-sm text-gray-500" style={{ fontFamily: "poppins" }}>Track your hydration</p>
          </div>

          {/* Glasses */}
          <div className="flex justify-between">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className={`h-12 w-6 rounded-b-lg ${
                  index < 5 ? "bg-blue-400" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-3" style={{ fontFamily: "poppins" }}>5 of 8 glasses</p>
          <button className="mt-4 w-full border border-gray-300 text-sm py-2 rounded hover:bg-gray-100" style={{ fontFamily: "poppins" }}>
            Add Glass
          </button>
        </div>
      </div>
    </div>
  )
}
