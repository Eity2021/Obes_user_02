import { BookOpen } from "lucide-react";




export default function Assessment({ filteredData, age }) {
  console.log("filteredData", filteredData)
  console.log("Age:", age);

  const items = Array.isArray(filteredData) ? filteredData : [];

  const visibleItems = items.filter(item => {
    const cat = String(item.category || '').toLowerCase();
    return age >= 18 ? cat === 'adult' : cat === 'child';
  });

  console.log("visibleItems:", visibleItems);



  return (
    <>
      <div className="p-6 border-b border-gray-200">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <BookOpen className="h-6 w-6 text-primary" />
          BMI Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track your BMI changes over time
        </p>
      </div>

      <div className="space-y-6 mt-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* BMI Categories Card */}
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">BMI Categories</h2>
              <p className="text-sm text-gray-500 mb-4">
                Understanding BMI ranges and what they mean
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50">
                  <span className="font-medium">Underweight</span>
                  <span className="text-blue-600">&lt; 18.5</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-green-50">
                  <span className="font-medium">Normal weight</span>
                  <span className="text-green-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-yellow-50">
                  <span className="font-medium">Overweight</span>
                  <span className="text-yellow-600">25 - 29.9</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-red-50">
                  <span className="font-medium">Obesity</span>
                  <span className="text-red-600">&ge; 30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes Card */}
          <div>
            {visibleItems?.map((filter) => (
              <div key={filter.id} className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h2 className="card-title text-[25px]">Do you know about Obesity info?</h2>
                  <span className="text-[16px] text-[#333] font-poppins font-medium  mb-1">
                    {filter.modinfo.split('\n').filter(Boolean).map((point, idx) => {
                      // Remove any existing numbers and trim whitespace
                      const cleanPoint = point.replace(/^\d+\.\s*/, '').trim();
                      return (
                        <div key={idx}>
                          {idx + 1}. {cleanPoint}
                        </div>
                      );
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
