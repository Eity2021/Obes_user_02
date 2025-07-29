import { useState } from "react";
import StepsLists from "./StepsLists";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useCreateStepsMutation } from "../../features/steps/stepsApi";
import { Coffee, Dumbbell, Smartphone, UtensilsCrossed, Heart, Apple, Moon, CheckCircle } from "lucide-react";

const healthSteps = [
  { id: 0, key: "sugary_drinks", title: "0 Sugary Drinks", description: "Reduce intake of sodas and sweetened beverages", icon: Coffee, color: "from-orange-400 to-red-500", bgColor: "bg-orange-50", textColor: "text-orange-700" },
  { id: 1, key: "exercise", title: "1+ Hour Physical Exercise", description: "Daily movement keeps your body strong", icon: Dumbbell, color: "from-blue-400 to-cyan-500", bgColor: "bg-blue-50", textColor: "text-blue-700" },
  { id: 2, key: "screentime", title: "2 or Less Screen Time", description: "Take breaks from digital devices", icon: Smartphone, color: "from-purple-400 to-pink-500", bgColor: "bg-purple-50", textColor: "text-purple-700" },
  { id: 3, key: "meals", title: "3 Main Meals", description: "Do not skip meals", icon: UtensilsCrossed, color: "from-green-400 to-emerald-500", bgColor: "bg-green-50", textColor: "text-green-700" },
  { id: 4, key: "treatment", title: "4 Pillars of Treatment", description: "Focus on mental and physical wellness", icon: Heart, color: "from-rose-400 to-pink-500", bgColor: "bg-rose-50", textColor: "text-rose-700" },
  { id: 5, key: "fruitveg", title: "5 Portions Fruits & Vegetables", description: "Colorful nutrition for optimal health", icon: Apple, color: "from-lime-400 to-green-500", bgColor: "bg-lime-50", textColor: "text-lime-700" },
  { id: 6, key: "sleep", title: "6-8 Hours of Sleep", description: "Quality rest for recovery and growth", icon: Moon, color: "from-gray-700 to-gray-900", bgColor: "bg-indigo-50", textColor: "text-indigo-700" },
]


function StepsOfSeven() {

  const navigate = useNavigate();
  const { data: profile } = useGetProfileQuery();
  const [hoveredStep, setHoveredStep] = useState(null)
  const [completedSteps, setCompletedSteps] = useState([]);
  const [createSteps, { isLoading, error }] = useCreateStepsMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const toggleStep = (stepId) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId) ? prev.filter((id) => id !== stepId) : [...prev, stepId]
    )
  }


  const onSubmit = async (data) => {
    const stepData = healthSteps.reduce((acc, step) => {
      acc[step.key] = completedSteps.includes(step.id) ? "Yes" : "No";
      return acc;
    }, {});
    try {
      const submissionData = {
        user_id: data.user_id,
        ...stepData,
      };
      const role = profile?.data?.role;
      const response = await createSteps({ data: submissionData, role });
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        reset();
        navigate("/bmi");
      } else {
        toast.error(response?.data?.message || "Submission failed. Please try again.");
      }

    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit answer.");
    }
  }

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
                {profile?.data?.id && (
                  <div className="form-control mt-2 hidden">
                    <label className="label">
                      <span className="label-text">user id</span>
                    </label>
                    <input
                      type="number"
                      name="user_id"
                      {...register("user_id", { required: true })}
                      value={profile?.data?.id}
                      className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                )}
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
              <div className="flex justify-end mb-14">
                <button type="submit" className="bg-primary text-white px-10 py-2 rounded-md font-semibold font-poppins ">
                  Submit
                </button>
              </div>
            </form>
            <StepsLists></StepsLists>
          </div>
        </div>
      </TitleCard>
    </>
  )
}

export default StepsOfSeven;