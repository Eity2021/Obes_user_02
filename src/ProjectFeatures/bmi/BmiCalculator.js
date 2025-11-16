import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { TrendingUpDown, Calculator } from "lucide-react";
import { useCreateBmiMutation } from "../../features/bmi/bmiApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";

function BmiCalculator({ setActiveTab }) {
  const [activeTabs, setActiveTabs] = useState("tab1");

  // Tab1: weightKg + height feet/inches
  const [weightKgTab1, setWeightKgTab1] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInchesTab1, setHeightInchesTab1] = useState("");

  // Tab2: weightLbs + height inches
  const [weightLbsTab2, setWeightLbsTab2] = useState("");
  const [heightInchesTab2, setHeightInchesTab2] = useState("");

  // Tab3: weightKg + height cm
  const [weightKgTab3, setWeightKgTab3] = useState("");
  const [heightCmTab3, setHeightCmTab3] = useState("");

  // common results
  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);
  const [category, setCategory] = useState("");

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

  // Utility: BMI category by numeric bmi
  const getBMICategory = (bmiNumber) => {
    if (bmiNumber < 18.5)
      return {
        category: "Underweight",
        color: "text-[#ADD8E6]",
        percentage: "15%",
      };
    if (bmiNumber < 23)
      return {
        category: "Normal weight",
        color: "text-[#2BDD3A]",
        percentage: "40%",
      };
    if (bmiNumber < 30)
      return {
        category: "Overweight",
        color: "text-[#D3CB88]",
        percentage: "65%",
      };
    return { category: "Obesity", color: "text-[#FF0000]", percentage: "90%" };
  };


  useEffect(() => {
    const n = (v) => {
      const parsed = parseFloat(v);
      return Number.isFinite(parsed) ? parsed : 0;
    };

    let computedBmi = null;
    let usedWeightKg = 0;
    let usedHeightInches = 0;

    if (activeTabs === "tab1") {

      const wKg = n(weightKgTab1);
      const totalInches = n(heightFeet) * 12 + n(heightInchesTab1);
      if (wKg > 0 && totalInches > 0) {
        const heightM = totalInches * 0.0254;
        computedBmi = wKg / (heightM * heightM);
        usedWeightKg = wKg;
        usedHeightInches = totalInches;
      }
    } else if (activeTabs === "tab2") {

      const wLbs = n(weightLbsTab2);
      const inches = n(heightInchesTab2);
      if (wLbs > 0 && inches > 0) {
        computedBmi = (wLbs * 703) / (inches * inches);
        usedWeightKg = wLbs / 2.20462;
        usedHeightInches = inches;
      }
    } else if (activeTabs === "tab3") {
      const wKg = n(weightKgTab3);
      const cm = n(heightCmTab3);
      if (wKg > 0 && cm > 0) {
        const heightM = cm / 100;
        computedBmi = wKg / (heightM * heightM);
        usedWeightKg = wKg;
        usedHeightInches = cm / 2.54
      }
    }
    console.log("usedWeightKg", usedWeightKg)
    if (computedBmi !== null) {
      const formatted = Number(computedBmi.toFixed(2));
      setBmi(formatted);
      const cat = getBMICategory(formatted);
      setCategory(cat.category);
      const gender = profile?.data?.ogender;
      let kcal = 0;
      if (gender === "male") kcal = Math.floor((usedWeightKg * 2.20462) * 15 - 500);
      else kcal = Math.floor((usedWeightKg * 2.20462) * 13 - 500);
      // if (!Number.isFinite(kcal) || kcal < 0) kcal = 0;
      setCalories(kcal);
      setValue("bmi", formatted);
      setValue("category", cat.category);
      setValue("calory", kcal);
      setValue("weight", Number(usedWeightKg.toFixed(2)));
      setValue("height", Number(usedHeightInches.toFixed(2)));
    } else {
      setBmi(null);
      setCategory("");
      setCalories(null);
      setValue("bmi", "");
      setValue("category", "");
      setValue("calory", "");
      setValue("weight", "");
      setValue("height", "");
    }
  }, [
    activeTabs,
    weightKgTab1,
    heightFeet,
    heightInchesTab1,
    weightLbsTab2,
    heightInchesTab2,
    weightKgTab3,
    heightCmTab3,
    profile,
    setValue,
  ]);

  const onSubmit = async (formData) => {
    console.log("formData", formData)
    try {

      const submissionData = {
        user_id: profile?.data?.id || formData.user_id,
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
        resetAll();
        setActiveTab("history");
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

  const resetAll = () => {
    reset();
    setWeightKgTab1("");
    setHeightFeet("");
    setHeightInchesTab1("");
    setWeightLbsTab2("");
    setHeightInchesTab2("");
    setWeightKgTab3("");
    setHeightCmTab3("");
    setBmi(null);
    setCalories(null);
    setCategory("");
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 px-2 lg:px-12 h-[100%] ">
        <div className="pt-6">
          <div className="card w-full container mx-auto bg-base-100 shadow-lg rounded-lg">
            <div className="bg-primary p-8 rounded-t-lg">
              <h2 className="card-title text-white font-bold">
                BMI Calculator
              </h2>
              <p className="text-sm text-whiteGraph">
                Calculate your Body Mass Index
              </p>
            </div>

            <div className="px-[2rem] pt-[2rem]">

              <div className="flex  border-b border-gray-300 mb-4">
                <button
                  className={`py-2 px-4 text-md font-medium w-full text-semibold font-poppins ${activeTabs === "tab1"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700  "
                    }`}
                  onClick={() => setActiveTabs("tab1")}
                >
                  General (kg - ft/in)
                </button>
                <button
                  className={`py-2 px-4 text-md font-medium w-full  text-semibold font-poppins ${activeTabs === "tab2"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => setActiveTabs("tab2")}
                >
                  Imperial (lbs - in)
                </button>
                <button
                  className={`py-2 px-4 text-md font-medium w-full text-semibold font-poppins ${activeTabs === "tab3"
                    ? "border-b-2 border-primary text-primary"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  onClick={() => setActiveTabs("tab3")}
                >
                  Metric (kg - cm)
                </button>
              </div>
              <div className="mt-4">
                {activeTabs === "tab1" && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                      {profile?.data?.id && (
                        <input
                          type="hidden"
                          {...register("user_id", { required: true })}
                          value={profile?.data?.id}
                        />
                      )}

                      <div className="form-control mt-2">
                        <label className="label">
                          <span className="label-text">Weight (kg)</span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 54"
                          value={weightKgTab1}
                          onChange={(e) => setWeightKgTab1(e.target.value)}
                          className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div className="form-control mt-4">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-[15px] color-[#333] font-poppins">
                              Height (feet)
                            </span>
                            <input
                              type="number"
                              min="0"
                              placeholder="feet"
                              value={heightFeet}
                              onChange={(e) => setHeightFeet(e.target.value)}
                              className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full mt-1"
                            />
                          </div>
                          <div>
                            <span className="text-[15px] color-[#333] font-poppins">
                              Height (inches)
                            </span>
                            <input
                              type="number"
                              min="0"
                              max="11"
                              placeholder="inches"
                              value={heightInchesTab1}
                              onChange={(e) =>
                                setHeightInchesTab1(e.target.value)
                              }
                              className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full mt-1"
                            />
                          </div>
                        </div>
                      </div>


                      <input
                        type="hidden"
                        {...register("weight", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("height", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("bmi", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("category", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("calory", { required: true })}
                      />

                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={resetAll}
                          className="btn bg-outline flex-1 border border-solid"
                        >
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
                )}
                {activeTabs === "tab2" && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                      {profile?.data?.id && (
                        <input
                          type="hidden"
                          {...register("user_id", { required: true })}
                          value={profile?.data?.id}
                        />
                      )}

                      <div className="form-control mt-2">
                        <label className="label">
                          <span className="label-text">Weight (lbs)</span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 110"
                          value={weightLbsTab2}
                          onChange={(e) => setWeightLbsTab2(e.target.value)}
                          className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div className="form-control mt-4 ">
                        <span className="text-[15px] color-[#333] font-poppins">
                          Height (inches)
                        </span>
                        <input
                          type="number"
                          placeholder="e.g. 70"
                          value={heightInchesTab2}
                          onChange={(e) => setHeightInchesTab2(e.target.value)}
                          className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary mt-2"
                        />
                      </div>

                      <input
                        type="hidden"
                        {...register("weight", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("height", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("bmi", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("category", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("calory", { required: true })}
                      />

                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={resetAll}
                          className="btn bg-outline flex-1 border border-solid"
                        >
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
                )}
                {activeTabs === "tab3" && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="card-body">
                      {profile?.data?.id && (
                        <input
                          type="hidden"
                          {...register("user_id", { required: true })}
                          value={profile?.data?.id}
                        />
                      )}

                      <div className="form-control mt-2">
                        <label className="label">
                          <span className="label-text">Weight (kg)</span>
                        </label>
                        <input
                          type="number"
                          placeholder="e.g. 54"
                          value={weightKgTab3}
                          onChange={(e) => setWeightKgTab3(e.target.value)}
                          className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>

                      <div className="form-control mt-4 ">
                        <span className="text-[15px] color-[#333] font-poppins ">
                          Height (cm)
                        </span>
                        <input
                          type="number"
                          placeholder="e.g. 175"
                          value={heightCmTab3}
                          onChange={(e) => setHeightCmTab3(e.target.value)}
                          className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary mt-2"
                        />
                      </div>

                      <input
                        type="hidden"
                        {...register("weight", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("height", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("bmi", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("category", { required: true })}
                      />
                      <input
                        type="hidden"
                        {...register("calory", { required: true })}
                      />

                      <div className="flex gap-2 mt-4">
                        <button
                          type="button"
                          onClick={resetAll}
                          className="btn bg-outline flex-1 border border-solid"
                        >
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
                )}
              </div>
            </div>
          </div>
        </div>












        <div className="h-full mt-6 bg-base-100 rounded-xl p-4 shadow border">
          {bmi !== null && (
            <div className="">
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
                className="relative h-16 mt-10 rounded-full"
                style={{
                  backgroundImage: `repeating-linear-gradient(to right,#ADD8E6 0%,#ADD8E6 25%, #2bdd3a 25%, #2bdd3a 50%,#d3cb88 50%,#d3cb88 75%,#FF0000 75%,#FF0000 100%)`,
                }}
              >
                <div
                  className="absolute w-4 h-20 bg-white border border-gray-800 rounded-full -mt-2 transform -translate-x-1/2"
                  style={{ left: getBMICategory(bmi).percentage }}
                ></div>
              </div>

              <div className="flex justify-between text-lg text-gray-600 mt-2 px-1">
                <span>16</span>
                <span>18.5</span>
                <span>23</span>
                <span>25</span>
                <span>∞</span>
              </div>

              <div className="alert alert-info mt-20 text-sm">
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
