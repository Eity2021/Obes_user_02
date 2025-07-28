import { useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import {
  Coffee, Dumbbell, Smartphone, UtensilsCrossed,
  Heart, Apple, Moon, CheckCircle, XCircle
} from "lucide-react"
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useGetStepsQuery } from "../../features/steps/stepsApi";

import { useForm } from "react-hook-form"

const healthSteps = [
  { id: 0, title: "0 Sugary Drinks", description: "Reduce intake of sodas and sweetened beverages", icon: Coffee, color: "from-orange-400 to-red-500", bgColor: "bg-orange-50", textColor: "text-orange-700" ,type:"no"},
  { id: 1, title: "1+ Hour Physical Exercise", description: "Daily movement keeps your body strong", icon: Dumbbell, color: "from-blue-400 to-cyan-500", bgColor: "bg-blue-50", textColor: "text-blue-700",type:"no" },
  { id: 2, title: "2 or Less Screen Time", description: "Take breaks from digital devices", icon: Smartphone, color: "from-purple-400 to-pink-500", bgColor: "bg-purple-50", textColor: "text-purple-700",type:"no" },
  { id: 3, title: "3 Main Meals", description: "Do not skip meals", icon: UtensilsCrossed, color: "from-green-400 to-emerald-500", bgColor: "bg-green-50", textColor: "text-green-700" },
  { id: 4, title: "4 Pillars of Treatment", description: "Focus on mental and physical wellness", icon: Heart, color: "from-rose-400 to-pink-500", bgColor: "bg-rose-50", textColor: "text-rose-700",type:"no" },
  { id: 5, title: "5 Portions Fruits & Vegetables", description: "Colorful nutrition for optimal health", icon: Apple, color: "from-lime-400 to-green-500", bgColor: "bg-lime-50", textColor: "text-lime-700" ,type:"no"},
  { id: 6, title: "6-8 Hours of Sleep", description: "Quality rest for recovery and growth", icon: Moon, color: "from-gray-700 to-gray-900", bgColor: "bg-indigo-50", textColor: "text-indigo-700" ,type:"no"},
]

const StatusCell = ({ value }) => {





  const isPositive = value === "Yes";
  return (
    <div className="flex justify-center items-center">
      {isPositive ? (
        <CheckCircle className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-red-600" />
      )}
    </div>
  );
};


function StepsOfSeven() {

  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const { data: profile } = useGetProfileQuery();
  
  const {
    data: stepsList,
    isLoading,
    isError,
    error,
  } = useGetStepsQuery(profile?.data?.role);


  const [completedSteps, setCompletedSteps] = useState([]);
  console.log("completedSteps", completedSteps)
  const [hoveredStep, setHoveredStep] = useState(null)

  const toggleStep = (stepId) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    )
  }


 const onSubmit = (data) => {
  console.log("data", data);

 }



  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });


  return (
    <>
      <TitleCard title="Health Review" topMargin="mt-2">
        <div className="min-h-screen py-8">
          {/* Decorative background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-pink-200/30 to-orange-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-4">
              <p className="text-2xl text-slate-600 mb-6 font-poppins font-bold">7 Best Practices For a Healthy Life</p>
              <div className="flex justify-center items-center gap-4 text-sm text-slate-500 font-poppins">
                <span>Progress: {completedSteps.length}/7</span>
                <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#7B1E19] to-[#512725] transition-all duration-500"
                    style={{ width: `${(completedSteps.length / 7) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            {/* Cards Grid */}

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16 ">
              {healthSteps.map((step) => {
                const Icon = step.icon
                const isCompleted = completedSteps.includes(step.id)
                const isHovered = hoveredStep === step.id

                return (
                  <div
                    key={step.id}
                    className={`cursor-pointer overflow-hidden rounded-xl shadow-md transition-all duration-300 border border-[#DEDEDE] ${isCompleted ? "ring-2 ring-[#7B1E19]" : "hover:shadow-xl"
                      }`}
                    onMouseEnter={() => setHoveredStep(step.id)}
                    onMouseLeave={() => setHoveredStep(null)}
                    onClick={() => toggleStep(step.id)}
                  >
                    {/* absolute top-3 left-3 */}
                    {/* Icon Area */}
                    <div className={`relative h-32 flex items-center justify-center bg-gradient-to-br  ${step.color}`}>
                      <div className=" w-[50px] h-[50px] bg-white/20 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        {step.id}
                      </div>

                      {isCompleted && (
                        <div className=" w-8 h-8 bg-[#7B1E19] rounded-full flex items-center justify-center animate-bounce">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                      )}
                      <Icon className={`absolute top-3 left-3  w-10 h-10 text-white transition-all ${isHovered ? "scale-110 rotate-6" : ""}`} />
                    </div>

                    {/* Text Content */}
                    <div className={`p-4 ${step.bgColor}`}>
                      <h3 className={`font-bold text-lg mb-1 ${step.textColor}`}>{step.title}</h3>
                      <p className="text-slate-600 text-sm">{step.description}</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${isCompleted ? "bg-green-500" : "bg-slate-300"}`}
                        ></div>
                        <span className="text-xs text-slate-500">
                          {isCompleted ? "Completed" : "Click to mark complete"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            </form>



            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Tracking Data</h1>
              <p className="text-gray-600">7-Step Health Monitoring System</p>
              <div className="flex items-center gap-4 mt-4">
                <span className="px-3 py-1 rounded-full border text-sm text-gray-700">
                  Total Entries: {stepsList?.data?.length}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 font-semibold">ID</th>
                    <th className="px-4 py-2 font-semibold">Recorded Date</th>
                    <th className="px-4 py-2 font-semibold text-center">Exercise</th>
                    <th className="px-4 py-2 font-semibold text-center">Fruits & Veg</th>
                    <th className="px-4 py-2 font-semibold text-center">Meals</th>
                    <th className="px-4 py-2 font-semibold text-center">Screen Time</th>
                    <th className="px-4 py-2 font-semibold text-center">Sleep</th>
                    <th className="px-4 py-2 font-semibold text-center">Sugary Drinks</th>
                    <th className="px-4 py-2 font-semibold text-center">Treatment</th>
                  </tr>
                </thead>
                <tbody>
                  {stepsList?.data?.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50 border-t">
                      <td className="px-4 py-2 font-medium">{entry.id}</td>

                      <td className="px-4 py-2">{formatDate(entry.recorded_at)}</td>
                      <td className="px-4 py-2">
                        <StatusCell value={entry.exercise} />
                      </td>
                      <td className="px-4 py-2">
                        <StatusCell value={entry.fruitveg} />
                      </td>
                      <td className="px-4 py-2">
                        <StatusCell value={entry.meals} />
                      </td>
                      <td className="px-4 py-2">
                        <StatusCell value={entry.screentime} />
                      </td>
                      <td className="px-4 py-2">
                        <StatusCell value={entry.sleep} />
                      </td>
                      <td className="px-4 py-2">
                        <StatusCell value={entry.sugary_drinks} />
                      </td>
                      <td className="px-4 py-2">
                        <StatusCell value={entry.treatment} />
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TitleCard>
    </>
  )
}

export default StepsOfSeven;