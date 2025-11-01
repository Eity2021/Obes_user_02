import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { TrendingUpDown, Calculator } from "lucide-react";
import { useCreateBmiMutation } from "../../features/bmi/bmiApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";

function BmiCalculator({ setActiveTab }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { data: profile } = useGetProfileQuery(auth?.role);
  const [createBmi] = useCreateBmiMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const kg = (weight && (weight * 2.20462).toFixed(2)) || "";
    setWeightKg(kg);
    setValue("weight", kg);
  }, [weight, setValue]);



  useEffect(() => {
    if (weight > 0 && height > 0) {

      const weightInLbs = weight * 2.20462;
      const bmiValue = (weightInLbs * 703) / (height * height);
      const formattedBMI = bmiValue.toFixed(2);
      const bmiCategory = getBMICategory(formattedBMI);
      setBmi(formattedBMI);
      setValue("bmi", formattedBMI);
      setValue("category", bmiCategory.category);

      const gender = profile?.data?.ogender;
      let result = 0;
      if (gender === "male") {
        result = Math.floor(weightKg * 15 - 500);
      } else {
        result = Math.floor(weightKg * 13 - 500);
      }

      setCalories(result);
      setValue("calory", result);
    } else {
      setBmi("");
      setValue("bmi", "");
      setValue("category", "");
      setValue("calory", "");
    }
  }, [weight, height, setValue]);


  const onSubmit = async (formData) => {
    try {
      const submissionData = {
        user_id: formData.user_id,
        weight: formData.weight,
        height: formData.height,
        bmi: formData.bmi,
        category: formData.category,
        calory: formData.calory,
      };

      const role = profile?.data?.role;
      const response = await createBmi({ data: submissionData, role });
      if (response?.data?.status === 200) {
        toast.success(response?.data?.message);
        reset();
        setActiveTab("history")
      } else {
        toast.error(
          response?.data?.message || "Submission failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit answer.");
    }
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5)
      return {
        category: "Underweight",
        color: "text-[#ADD8E6]",
        percentage: "15%",
      };
    if (bmi < 23)
      return {
        category: "Normal weight",
        color: "text-[#2BDD3A]",
        percentage: "40%",
      };
    if (bmi < 30)
      return {
        category: "Overweight",
        color: "text-[#D3CB88]",
        percentage: "65%",
      };
    return { category: "Obesity", color: "text-[#FF0000]", percentage: "90%" };
  };

  return (
    <>
      <div className="p-6 border-b border-gray-200 ">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Calculator className="h-6 w-6 text-primary" />
          BMI Calculator
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Track your BMI changes over time
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-1 xl:grid-cols-2 gap-6 px-2 lg:px-12 h-[100%] ">
        <div className="pt-6">
          <div className="">
            <div className="card w-full container mx-auto bg-base-100 shadow-lg rounded-lg">
              <div className="bg-primary p-8 rounded-t-lg">
                <h2 className="card-title text-white font-bold">
                  BMI Calculator (Imperial)
                </h2>
                <p className="text-sm text-whiteGraph">
                  Calculate your Body Mass Index
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
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

                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text">Weight (kg)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 54 kg"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                    <div className="hidden">
                      {
                        weightKg && (
                          <input
                            type="float"
                            name="weight"
                            placeholder="e.g. 154 lbs"
                            {...register("weight", { required: true })}
                            value={weightKg}
                            className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        )
                      }

                    </div>

                  </div>

                  <div className="form-control mt-4">
                    <label className="label">
                      <span className="label-text">Height (inches)</span>
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 175 inches"
                      name="height"
                      {...register("height", { required: true })}
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  {bmi && (
                    <div className="form-control mt-4 hidden">
                      <label className="label">
                        <span className="label-text">Bmi</span>
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        name="bmi"
                        {...register("bmi", { required: true })}
                        value={bmi?.toString() || ""}
                        className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}

                  {getBMICategory(bmi)?.category && (
                    <div className="form-control mt-4 hidden">
                      <label className="label">
                        <span className="label-text">Category</span>
                      </label>
                      <input
                        name="category"
                        {...register("category", { required: true })}
                        value={getBMICategory(bmi)?.category}
                        className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}

                  <div className="form-control mt-4 hidden">
                    <input
                      type="number"
                      name="calory"
                      {...register("calory", { required: true })}
                      value={calories || ""}
                      // onChange={(e) => setHeight(e.target.value)}
                      className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button className="btn bg-outline flex-1 border border-solid">
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="btn bg-primary hover:bg-secondary flex-1 text-white"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div>
          {bmi !== null && (
            <div className="mt-6 bg-base-100 rounded-xl p-4 shadow border">
              <div className="flex items-center gap-4">
                <TrendingUpDown />

                <h3 className="text-left font-bold text-[18px] md:text-[28px] ">
                  Your BMI Result
                </h3>
              </div>

              <div className="flex justify-center my-6">
                <div
                  className="radial-progress text-primary border"
                  style={{ "--value": bmi }}
                  role="progressbar"
                >
                  <p className="text-[18px] font-bold"> {bmi}</p>
                </div>
              </div>

              <p
                className={`text-center  text-[30px] font-bold ${getBMICategory(bmi).color
                  }`}
              >
                {getBMICategory(bmi).category}
              </p>

              <div
                className="relative h-16 mt-6 rounded-full"
                style={{
                  backgroundImage: ` repeating-linear-gradient(to right,#ADD8E6 0%,#ADD8E6 25%, #2bdd3a 25%, #2bdd3a 50%,#d3cb88 50%,#d3cb88 75%,#FF0000 75%,#FF0000 100%)`,
                }}
              >
                <div
                  className="absolute w-4 h-20 bg-white border border-gray-800 rounded-full -mt-2 transform -translate-x-1/2"
                  style={{ left: getBMICategory(bmi).percentage }}
                ></div>
              </div>

              <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
                <span>16</span>
                <span>18.5</span>
                <span>23</span>
                <span>25</span>
                <span>∞</span>
              </div>

              <div className="alert alert-info mt-4 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-[#fff] font-semibold">
                  BMI is a screening tool, not a diagnostic of body fatness or
                  health. Consult your healthcare provider.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BmiCalculator;
