import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowDownRight } from "lucide-react";
import { toast } from 'react-toastify';
import TitleCard from "../../components/Cards/TitleCard";
import { useGetQuestionQuery } from "../../features/question/questionApi";
import { useCreateAnswerMutation } from "../../features/answer/answerApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useNavigate } from "react-router-dom";
function Questions() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [answerList, setAnswerList] = useState([]);
  const [language, setLanguage] = useState("en");
  const { data: profile } = useGetProfileQuery();
  const { register, handleSubmit, reset, setValue } = useForm();
  const { data: question, isLoading, isError, error } = useGetQuestionQuery();
  const [createAnswer] = useCreateAnswerMutation();

  useEffect(() => {
    setValue("langtype", language === "en" ? "english" : "bangla");
  }, [language, setValue]);




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
    console.log("form data", formData)
    try {
      const formattedAnsjson = Object?.entries(formData.ansjson)
        .filter(([_, value]) => value != null && value !== false)
        .map(([qid, value]) => {
          if (Array.isArray(value)) {
            return [qid, ...[value].filter(v => v != null)];
          } else {
            return [qid, value];
          }
        });

      const submissionData = {
        user_id: formData.user_id,
        ansby: formData.ansby,
        ansjson: formattedAnsjson,
        langtype: formData.langtype,

      };
      const response = await createAnswer(submissionData);

      if (response?.data?.status === 201) {
        toast.success(response?.data?.message);
        reset();
        navigate("/question/surveyList");
      } else {
        toast.error(response?.data?.message || "Submission failed. Please try again.");
      }

    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit answer.");
    }

  };



  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
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
    return <div className="text-center mt-10">No questions found.</div>;
  }

  
  // max-w-5xl
  return (
    <TitleCard title="Questions For Survey" topMargin="mt-2">
      <div className=" mx-auto p-6 space-y-6">
        <div className="card bg-base-100 shadow">
          <div className="px-10 pt-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                {/* <h2 className="card-title text-[20px] font-semibold font-[poppins]">Survey</h2> */}
                <p className="text-lg font-bold text-[#333">
                  Question {questions?.length}
                </p>
              </div>
              <div className="text-right flex gap-2">
                <div className="text-xl font-bold text-primary">
                  {currentStep}/{questions?.length}
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-4 py-2 rounded-l-md font-[poppins] transition text-[14px]  ${language === "en"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("bn")}
                    className={`px-4 py-2 rounded-r-md font-[poppins] transition text-[14px] ${language === "bn"
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                  >
                    বাংলা
                  </button>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                {
                  language === "en" ? (

                    <div>
                      {questions?.map((item, index) => (
                        <div
                          key={item.qid}
                          className="bg-base-100 rounded-lg shadow  mb-6"
                        >

                          <div className="bg-[#7B1E19]/20 rounded-lg  p-4" >
                            <div className="flex justify-between">
                              <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                                Question {index + 1} :
                              </h2>
                              <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">{item.category}</span>
                            </div>
                          </div>
                          <p className="text-[18px] font-semibold font-poppins  p-3">{item.qeng} </p>
                          <div className="bg-gray-50 p-3 rounded">
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
                                {Array.isArray(item.qaoptioneng) ? (
                                  item.qaoptioneng.map((option, i) => (
                                    <div className="flex gap-3 py-1" >
                                      <input type="radio"
                                        {...register(`ansjson.${item.qid}`)}
                                        value={option}
                                        id={`${item.qid}-${option}`}
                                        className="w-5 h-7 flex justify-center items-center "
                                      />
                                      <p key={i} className="text-gray-700 font-poppins text-[18px]">
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
                                {Array.isArray(item.qaoptioneng) ? (
                                  item.qaoptioneng.map((option, i) => (
                                    <div className="flex gap-3 py-1" key={option.qid}>
                                      <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input w-full"
                                        {...register(`ansjson.${item.qid}`)}
                                        defaultValue={option}

                                      />

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
                            ) : item.qatype === "dropdown" ? (
                              <>
                                <div className="flex gap-3 py-1">
                                  <select defaultValue="" className="select w-full font-poppins text-[18px]"
                                    onChange={(e) => updateAnswer(item.qid, e.target.value)}>
                                    <option disabled value="">
                                      Pick a color
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
                        <div
                          key={index}
                          className=" rounded-lg  shadow mb-6"
                        >

                          <div className="bg-[#7B1E19]/20 rounded-lg  p-4" >
                            <div className="flex justify-between">
                              <h2 className="font-bold text-[#333] font-poppins font text-[16px]">
                                Question {index + 1} :
                              </h2>
                              <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">{item.category_bangla}</span>
                            </div>
                          </div>
                          <p className="text-[18px] font-semibold font-poppins  py-3">{item.qbang}</p>

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
                                      <input type="radio"

                                        {...register(`ansjson.${item.qid}`)}
                                        value={option}
                                        id={`${item.qid}-${option}`}
                                        className="w-5 h-7 flex justify-center items-center "
                                      />
                                      <p key={i} className="text-[#333] font-poppins text-[18px]">
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
                                {Array.isArray(item.qaoptioneng) ? (
                                  item.qaoptioneng.map((option, i) => (
                                    <div className="flex gap-3 py-1">
                                      <input
                                        type="text"
                                        placeholder="Type here"
                                        className="input w-full"
                                        {...register(`ansjson.${item.qid}`)}
                                        defaultValue={option}

                                      />

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
                            ) : item.qatype === "dropdown" ? (
                              <>
                                <div className="flex gap-3 py-1">
                                  <select defaultValue="" className="select w-full font-poppins text-[18px]"
                                    onChange={(e) => updateAnswer(item.qid, e.target.value)}>
                                    <option disabled value="">
                                      Pick a color
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
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                }



              </div>

              <div className="flex justify-end">
                <button className="btn bg-primary hover:bg-primary text-white text-[18px] font-semibold w-28 h-28 rounded-full mt-3 " type="submit">
                  <div className="flex justify-end ">
                    <p>
                      Submit</p>
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
