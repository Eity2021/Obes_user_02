import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowDownRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TitleCard from "../../components/Cards/TitleCard";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useGetQuestionQuery } from "../../features/question/questionApi";
import { useCreateAnswerMutation } from "../../features/answer/answerApi";

function Questions() {
  const navigate = useNavigate();
  const [answerList, setAnswerList] = useState([]);
  // const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState("en");
  const [createAnswer] = useCreateAnswerMutation();
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { data: profile } = useGetProfileQuery(auth?.role);
  const { register, handleSubmit, reset, setValue } = useForm();
  const {
    data: question,
    isLoading,
    isError,
    error,
  } = useGetQuestionQuery(auth?.role);
  const dob = profile?.data?.dob;
  let age = null;

  useEffect(() => {
    setValue("langtype", language === "en" ? "english" : "bangla");
  }, [language, setValue]);

  if (dob) {
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    age = currentYear - birthYear;
  }
  const updateAnswer = (qid, value, type) => {
    setAnswerList((prev) => {
      const filtered = prev.filter(([id]) => id !== qid);
      if (type === "checkbox") {
        const existing = prev.find(([id]) => id === qid);
        const updatedValues = existing ? [...existing[1]] : [];
        const index = updatedValues.indexOf(value);
        if (index > -1) updatedValues.splice(index, 1);
        else updatedValues.push(value);
        return [...filtered, [qid, updatedValues]];
      }

      return [...filtered, [qid, value]];
    });
  };

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    try {
      const formattedAnsjson = Object?.entries(formData.ansjson)
        .filter(([_, value]) => value != null && value !== false)
        .map(([qid, value]) => {
          if (Array.isArray(value)) {
            return [qid, ...[value].filter((v) => v != null)];
          } else {
            return [qid, value];
          }
        });

      const submissionData = {
        user_id: formData.user_id,
        mobile: formData.mobile,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        weight: formData.weight,
        height: formData.height,
        bmi: formData.bmi,
        obesity_category: formData.obesity_category,
        calory: formData.calory,
        ansby: formData.ansby,
        ansjson: formattedAnsjson,
        langtype: formData.langtype,
      };
      const role = profile?.data?.role;
      const response = await createAnswer({ data: submissionData, role });

      if (response?.data?.status === 201) {
        toast.success(response?.data?.message);
        reset();
        navigate("/question/surveyList");
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

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow h-full flex justify-center items-center">
        {" "}
        <p className="text-center mt-10">Loading...</p>{" "}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center mt-10 text-red-500">
        {error?.data?.message || "Failed to load questions."}
      </div>
    );
  }
  const questions = question?.data || [];
  if (questions.length === 0) {
    return (
      <div className="">
        <p className="text-center mt-10 ">No Questions Found</p>
      </div>
    );
  }

  // console.log("questions", questions);

  return (
    <TitleCard title="Questions For Survey" topMargin="mt-2">
      <div className=" mx-auto p-0 md:p-6 space-y-6">
        <div className="card bg-base-100 shadow">
          <div className="px-10 pt-6">
            <div className="block sm:flex justify-between items-center mb-2 border-b pb-3">
              <div>
                <p className="text-lg font-bold text-[#333] flex items-center font-[poppins] ">
                  Questionnaire {questions?.length}
                </p>
              </div>
              <div className="text-right flex gap-2 mt-2 sm:mt-0  sm:m-0">
                {/* <div className="text-xl font-bold text-primary">
                  {currentStep}/{questions?.length}
                </div> */}

                <div className="flex items-center">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 rounded-l-md font-[poppins] transition text-[12px] font-semibold ${language === "en"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage("bn")}
                    className={`px-3 py-1 rounded-r-md font-[poppins] transition text-[12px] font-semibold ${language === "bn"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                  >
                    BN
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="card-body">
              <div className="space-y-4">
                <div className="hidden">
                  {profile?.data?.id && (
                    <div className="form-control mt-2">
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

                  {profile?.data?.id && (
                    <div className="form-control mt-2">
                      <label className="label">
                        <span className="label-text">user id</span>
                      </label>
                      <input
                        type="text"
                        name="ansby"
                        {...register("ansby", { required: true })}
                        value={profile?.data?.role}
                        className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  )}

                  <div className="form-control mt-2">
                    <label className="label">
                      <span className="label-text">Language Type</span>
                    </label>
                    <input
                      type="text"
                      name="langtype"
                      {...register("langtype", { required: true })}
                      className="input input-bordered focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                      readOnly
                    />
                  </div>
                </div>

                {profile?.data?.logmobile && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 1 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        Mobile
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={profile?.data?.logmobile}
                          {...register("mobile", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {profile?.data?.logemail && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 2 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        Email
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={profile?.data?.logemail}
                          {...register("email", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {profile?.data?.dob && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 3 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        Age
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={age}
                          {...register("age", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {profile?.data?.ogender && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 4 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        Gender
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={profile?.data?.ogender}
                          {...register("gender", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {profile?.data?.myweight && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 5 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        Weight
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={profile?.data?.myweight}
                          {...register("weight", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {profile?.data?.myhight && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 6 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        Height
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={profile?.data?.myhight}
                          {...register("height", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {profile?.data?.mybmi && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 7 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        BMI
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={profile?.data?.mybmi}
                          {...register("bmi", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {profile?.data?.bmicat && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 8 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        Obesity Category
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={profile?.data?.bmicat}
                          {...register("obesity_category", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {profile?.data?.mycalory && (
                  <div className="hidden">
                    <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                      <div className="flex justify-between">
                        <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                          Question 9 :
                        </h2>
                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                          Basic Information
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[18px] font-semibold font-poppins  p-3">
                        Calory
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <input
                          type="text"
                          value={profile?.data?.mycalory}
                          {...register("calory", { required: true })}
                          className="input w-full border"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {language === "en" ? (
                  <div>
                    {questions?.map((item, index) => (
                      <div
                        key={item.qid}
                        className="bg-base-100 rounded-lg shadow  mb-6"
                      >
                        <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                          <div className="flex justify-between">
                            <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                              Question {index + 1} :
                            </h2>
                            <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded ">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <p className="text-[18px] font-semibold font-poppins p-3">
                          {item.qeng}{" "}
                        </p>
                        <div className=" bg-base-100 p-3 rounded">
                          {item.qatype === "checkbox" ? (
                            <>
                              {Array.isArray(item.qaoptioneng) ? (
                                item.qaoptioneng.map((option, index) => (
                                  <div key={index} className="flex gap-3 py-1">
                                    <input
                                      type="checkbox"
                                      {...register(`ansjson.${item.qid}`)}
                                      value={option}
                                      id={`${item.qid}-${option}`}
                                      className="w-5 h-7 flex justify-center items-center"
                                    />
                                    <p className="text-gray-700 font-poppins text-[18px]">
                                      {option}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p>No options available</p>
                              )}
                            </>
                          ) : item.qatype === "radio" ? (
                            <>
                              {Array.isArray(item.qaoptioneng) ? (
                                item.qaoptioneng.map((option, i) => (
                                  <div className="flex gap-3 py-1 ">
                                    <input
                                      type="radio"
                                      {...register(`ansjson.${item.qid}`)}
                                      value={option}
                                      id={`${item.qid}-${option}`}
                                      className="w-5 h-7 flex justify-center items-center "
                                    />
                                    <p
                                      key={i}
                                      className="text-gray-700 font-poppins text-[18px]"
                                    >
                                      {option}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-700">
                                  {typeof item.qaoptioneng === "string"
                                    ? item.qaoptioneng
                                    : "No options available"}
                                </p>
                              )}
                            </>
                          ) : item.qatype === "input" ? (
                            <>
                              <div className="flex gap-3 py-1">
                                <input
                                  type="text"
                                  placeholder="Type here"
                                  className="input w-full"
                                  {...register(`ansjson.${item?.qid}`)}
                                />
                              </div>
                            </>
                          ) : item.qatype === "dropdown" ? (
                            <>
                              <div className="flex gap-3 py-1">
                                <select
                                  defaultValue=""
                                  className="select w-full font-poppins text-[18px]"
                                  onChange={(e) =>
                                    updateAnswer(item.qid, e.target.value)
                                  }
                                >
                                  <option disabled value="">
                                    Select a value
                                  </option>
                                  {(() => {
                                    let options = [];

                                    if (Array.isArray(item.qaoptioneng)) {
                                      options = item.qaoptioneng;
                                    } else if (
                                      typeof item.qaoptioneng === "string"
                                    ) {
                                      try {
                                        options = JSON.parse(
                                          item.qaoptioneng.replace(/'/g, '"')
                                        );
                                      } catch {
                                        console.error(
                                          "Failed to parse qaoptioneng"
                                        );
                                      }
                                    }

                                    return options.map((option, i) => (
                                      <option key={i} value={option}>
                                        {option}
                                      </option>
                                    ));
                                  })()}
                                </select>
                              </div>
                            </>
                          ) : item.qatype === "clock" ? (
                            <div>
                              <div className="flex gap-3 py-1">
                                <input
                                  type="time"
                                  className="input w-full font-poppins text-[18px]"
                                  {...register(`ansjson.${item.qid}`)}
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {questions?.map((item, index) => (
                      <div key={index} className=" rounded-lg  shadow mb-6">
                        <div className="bg-[#7B1E19]/20 rounded-lg  p-4">
                          <div className="flex justify-between">
                            <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                              Question {index} :
                            </h2>
                            <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                              {item.category_bangla}
                            </span>
                          </div>
                        </div>
                        <p className="text-[18px] font-semibold font-poppins  py-3">
                          {item.qbang}
                        </p>

                        <div className="bg-gray-100 p-3 rounded">
                          {item.qatype === "checkbox" ? (
                            <>
                              {Array.isArray(item.qaoptionbng) ? (
                                item.qaoptionbng.map((option, index) => (
                                  <div key={index} className="flex gap-3 py-1">
                                    <input
                                      type="checkbox"
                                      {...register(`ansjson.${item.qid}`)}
                                      value={option}
                                      id={`${item.qid}-${option}`}
                                      className="w-5 h-7 flex justify-center items-center "
                                    />
                                    <p className="text-[#333] font-poppins text-[18px]">
                                      {option}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p>No options available</p>
                              )}
                            </>
                          ) : item.qatype === "radio" ? (
                            <>
                              {Array.isArray(item.qaoptionbng) ? (
                                item.qaoptionbng.map((option, i) => (
                                  <div className="flex gap-3 py-1">
                                    <input
                                      type="radio"
                                      {...register(`ansjson.${item.qid}`)}
                                      value={option}
                                      id={`${item.qid}-${option}`}
                                      className="w-5 h-7 flex justify-center items-center "
                                    />
                                    <p
                                      key={i}
                                      className="text-[#333] font-poppins text-[18px]"
                                    >
                                      {option}
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-700">
                                  {typeof item.qaoptionbng === "string"
                                    ? item.qaoptionbng
                                    : "No options available"}
                                </p>
                              )}
                            </>
                          ) : item.qatype === "input" ? (
                            <>
                              <div className="flex gap-3 py-1">
                                <input
                                  type="text"
                                  placeholder="Type here"
                                  className="input w-full"
                                  {...register(`ansjson.${item.qid}`)}
                                />
                              </div>
                            </>
                          ) : item.qatype === "dropdown" ? (
                            <>
                              <div className="flex gap-3 py-1">
                                <select
                                  defaultValue=""
                                  className="select w-full font-poppins text-[18px]"
                                  onChange={(e) =>
                                    updateAnswer(item.qid, e.target.value)
                                  }
                                >
                                  <option disabled value="">
                                    একটি মান নির্বাচন করুন
                                  </option>
                                  {(() => {
                                    let options = [];

                                    if (Array.isArray(item.qaoptionbng)) {
                                      options = item.qaoptionbng;
                                    } else if (
                                      typeof item.qaoptionbng === "string"
                                    ) {
                                      try {
                                        options = JSON.parse(
                                          item.qaoptionbng.replace(/'/g, '"')
                                        );
                                      } catch {
                                        console.error(
                                          "Failed to parse qaoptioneng"
                                        );
                                      }
                                    }

                                    return options.map((option, i) => (
                                      <option key={i} value={option}>
                                        {option}
                                      </option>
                                    ));
                                  })()}
                                </select>
                              </div>
                            </>
                          ) : item.qatype === "clock" ? (
                            <div>
                              <div className="flex gap-3 py-1">
                                <input
                                  type="time"
                                  className="input w-full font-poppins text-[18px]"
                                  {...register(`ansjson.${item.qid}`)}
                                />
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  className="btn bg-primary hover:bg-primary text-white text-[18px] font-semibold w-28 h-28 rounded-full mt-3 "
                  type="submit"
                >
                  <div className="flex justify-end ">
                    <p>Submit</p>
                    <ArrowDownRight />
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </TitleCard>
  );
}

export default Questions;
