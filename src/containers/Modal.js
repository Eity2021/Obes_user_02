import { useGetProfileQuery } from "../features/profile/profileApi";
import { useCreateBmiMutation } from "../features/bmi/bmiApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { X } from "lucide-react";
export default function Modal() {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [bmi, setBmi] = useState(null);
  const [calories, setCalories] = useState(null);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { data: profile } = useGetProfileQuery(auth?.role);
  const [createBmi, { isLoading, error }] = useCreateBmiMutation();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (heightFeet === "" && heightInches === "") {
      setHeight("");
      setValue("height", "");
      return;
    }
    const totalInches =
      parseInt(heightFeet || 0, 10) * 12 + parseInt(heightInches || 0, 10);
    setHeight(totalInches);
    setValue("height", totalInches);
  }, [heightFeet, heightInches, setValue]);

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

  useEffect(() => {
    if (
      profile &&
      (profile?.data?.mybmi === "0" || 0 || null) &&
      (profile?.data?.mycalory === 0 || null) &&
      (profile?.data?.myhight === 0 || null) &&
      (profile?.data?.myweight === 0 || null) &&
      (profile?.data?.bmicat === "NA" || "na" || null)
    ) {
      setOpen(true);
    }
  }, [profile]);

  if (!open) return null;

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
        setOpen(false);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-96">
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className=" text-black  py-2 rounded "
          >
            <X />
          </button>
        </div>
        <div className="">
          <div className="">
            <div className=" w-full mx-auto rounded-sm p-1  px-2">
              <div className="bg-[#f1f1f1] rounded-sm p-2">
                <p className="text-lg text-[#333] font-semibold text-center font-poppins">
                  Let's Calculate My BMI
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="">
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
                      {weightKg && (
                        <input
                          type="float"
                          name="weight"
                          placeholder="e.g. 154 lbs"
                          {...register("weight", { required: true })}
                          value={weightKg}
                          className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      )}
                    </div>
                  </div>

                  <div className="form-control mt-4 hidden">
                    <span className="text-[15px] color-[#333] font-poppins">
                      Height (inches)
                    </span>

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

                  <div className="form-control mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[15px] color-[#333] font-poppins">
                          Height(feet)
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
                          Height(inches)
                        </span>
                        <input
                          type="number"
                          min="0"
                          max="11"
                          placeholder="inches"
                          value={heightInches}
                          onChange={(e) => setHeightInches(e.target.value)}
                          className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary w-full mt-1"
                        />
                      </div>
                    </div>
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
      </div>
    </div>
  );
}
