import { BookOpen } from "lucide-react";

export default function LifeModification() {
  return (
    <>
      <div className="p-6 border-b border-gray-200">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <BookOpen className="h-6 w-6 text-primary" />
          BMI Information 2
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track your BMI changes over time
        </p>
      </div>

      <div className="space-y-6">
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
          <div className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title text-[25px]">Important Notes</h2>
              <span className="text-sm text-gray-500 mb-1">
                Things to keep in mind about BMI
              </span>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 " />
                  <p className="text-[15px] font-[poppins]">
                    BMI is a screening tool, not a diagnostic tool for body
                    fatness or health.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 " />
                  <p className="text-[15px] font-[poppins]">
                    It may not be accurate for athletes with high muscle mass.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 " />
                  <p className="text-[15px] font-[poppins]">
                    Consult healthcare providers for personalized health
                    assessments.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0 " />
                  <p className="text-[15px] font-[poppins]">
                    BMI calculations may vary for children and older adults.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
