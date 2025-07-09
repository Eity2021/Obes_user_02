import TitleCard from "../../components/Cards/TitleCard";
import { useGetBmiQuery } from "../../features/bmi/bmiApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { History, User } from "lucide-react";
export default function BmiList() {
  const { data: profile } = useGetProfileQuery();

  const {
    data: bmi,
    isLoading,
    isError,
    error,
  } = useGetBmiQuery({ id: profile?.data?.id }, { skip: !profile?.data?.id });

  const getBMIColor = (category) => {
    switch (category) {
      case "Underweight":
        return "bg-yellow-100 text-yellow-800";
      case "Normal weight":
        return "bg-green-100 text-green-800";
      case "Overweight":
        return "bg-orange-100 text-orange-800";
      case "Obesity":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="h-full bg-gray-50 p-4 flex items-center justify-center font-inter">
      <div className="w-full space-y-6">
        <div className="bg-white rounded-lg shadow-md overflow-hidden ">
          {/* CardHeader Simulation */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
              <History className="h-6 w-6 text-primary" />
              BMI History
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Track your BMI changes over time
            </p>
          </div>

          {/* CardContent Simulation */}

          <div className="p-6">
            <div className="space-y-4">
              {bmi?.data?.length > 0 ? (
                bmi.data.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "rgba(123, 30, 25, 0.2)" }}
                      >
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {entry.recorded_at}
                        </p>
                        <p className="text-sm text-gray-600">
                          BMI:{" "}
                          <span className="font-semibold">{entry.bmi}</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">
                        Height: {entry.height} Feet
                      </p>
                      <p className="text-sm text-gray-600">
                        Weight: {entry.weight} lbs
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getBMIColor(
                        entry.category
                      )}`}
                    >
                      {entry.category}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  No BMI records found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
