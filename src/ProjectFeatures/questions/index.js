import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import TitleCard from "../../components/Cards/TitleCard";
import { useGetQuestionQuery } from "../../features/question/questionApi";
import { useCreateAnswerMutation } from "../../features/answer/answerApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";
function Questions() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answerList, setAnswerList] = useState([]);

  const { data: profile } = useGetProfileQuery();
  const { data: question, isLoading, isError, error } = useGetQuestionQuery();

  const [createAnswer, { isLoading: answerLoading, error: answerError }] = useCreateAnswerMutation();


  const { register, handleSubmit, reset } = useForm();

  // const updateAnswer = (qid, value, type) => {
  //   setAnswerList((prev) => {
  //     const filtered = prev.filter(([id]) => id !== qid);

  //     if (type === "checkbox") {
  //       const existing = prev.find(([id]) => id === qid);
  //       const updatedValues = existing ? [...existing[1]] : [];
  //       const index = updatedValues.indexOf(value);
  //       if (index > -1) updatedValues.splice(index, 1); // remove
  //       else updatedValues.push(value); // add
  //       return [...filtered, [qid, updatedValues]];
  //     }

  //     return [...filtered, [qid, value]];
  //   });
  // };

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

  // const onSubmit = (data) => {
  //   console.log("Combined Data:", data);


  //   createAnswer({
  //     user_id: data.user_id,
  //     ansjson: JSON.stringify(data.ansjson),
  //     ansby: data.ansby,
  //   })

  //   setIsSubmitted(true);


  // };


    const onSubmit = (formData) => {
    // Convert form data into the desired structure
    const formattedAnsjson = Object?.entries(formData.ansjson)
      .filter(([_, value]) => value != null && value !== false) // Remove null/false
      .map(([qid, value]) => {
        if (Array.isArray(value)) {
          return [qid, ...value.filter(v => v != null)]; // Handle multi-select
        } else {
          return [qid, value]; // Handle single answers
        }
      });

    const submissionData = {
      user_id: formData.user_id,
      ansby: formData.ansby,
      ansjson:formattedAnsjson,
    };

    console.log(submissionData);
    // Example output:
    // {
    //   user_id: "32",
    //   ansby: "user@example.com",
    //   ansjson: "[['3','Heart Disease','Type 2 Diabetes'],['q2','ans2']]"
    // }

    createAnswer(submissionData);
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

  console.log("current", questions);
  return (
    <TitleCard title="Questions For Survey" topMargin="mt-2">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="card-title text-[20px] font-semibold font-[poppins]">Survey</h2>
                <p className="text-sm text-gray-500">
                  Question {questions?.length}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">
                  {currentStep}/{questions?.length}
                </div>

              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="card-body">
              <div className="space-y-4">
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
                {questions?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-base-100 rounded-lg shadow p-4"
                  >
                    <h2 className="font-bold text-primary">
                      Question {index + 1}:
                    </h2>
                    <p className="text-[15px] font-semibold font-[poppins]  py-2">{item.qeng}</p>
                    <div className="bg-gray-100 p-3 rounded">
                      {item.qatype === "checkbox" ? (
                        <>
                          {/* {Array.isArray(item.qaoptioneng) ? (
                            item.qaoptioneng.map((option, index) => (
                              <div className="flex gap-3 py-1"  key={index}>
                                <input type="checkbox"
                                
                                  {...register(`ansjson.${item.qid}.${option}`)} // Register each checkbox
                                  value={option}

                                  // onChange={() => updateAnswer(item.qid, option, "checkbox")}
                                  // checked={
                                  //   answerList.find(([qid]) => qid === item.qid)?.[1]?.includes(option) || false} 
                                    
                                    />
                                <p key={index} className="text-gray-700 font-[poppins] text-sm">
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
                          )} */}

                          {Array.isArray(item.qaoptioneng) ? (
                            item.qaoptioneng.map((option, index) => (
                              <div key={index} className="flex gap-3 py-1">
                                <input
                                  type="checkbox"
                                  {...register(`ansjson.${item.qid}`)}
                                  value={option}
                                  id={`${item.qid}-${option}`}


                                />
                                <p className="text-gray-700 font-[poppins] text-sm">
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
                              <div className="flex gap-3 py-1">
                                <input type="radio"
                                  // name={`radio-${item.qid}`}
                                  {...register(`ansjson.${item.qid}`)}
                                  value={option}
                                  id={`${item.qid}-${option}`}
                                  
                                  />
                                <p key={i} className="text-gray-700 font-[poppins] text-sm">
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
{/* 
                                <p key={i} className="text-gray-700 font-[poppins] text-sm">
                                  {option}
                                </p> */}
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
                            <select defaultValue="" className="select w-full font-[poppins] text-sm"
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

              <div className="flex justify-end ">
                <button className="btn bg-primary text-white px-10 mt-3" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* )} */}
    </TitleCard>
  );
}

export default Questions;
