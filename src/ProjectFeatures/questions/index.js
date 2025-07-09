import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import TitleCard from "../../components/Cards/TitleCard";
import { useGetQuestionQuery } from "../../features/question/questionApi";
function Questions() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data: question, isLoading, isError, error } = useGetQuestionQuery();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      satisfaction: "",
      features: [],
      rating: 7,
      feedback: "",
      email: "",
      recommend: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Survey submitted:", data);
    setIsSubmitted(true);
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
    
        {/* <div className="max-w-2xl mx-auto p-6">
          <div className="card bg-base-100 shadow-lg text-center">
            <div className="card-body items-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-2" />
              <h2 className="text-2xl font-bold">Thank You!</h2>
              <p className="text-gray-500">
                Your survey has been submitted successfully. We appreciate your
                feedback!
              </p>
              <button
                className="btn btn-primary mt-4"
                onClick={() => {
                  setIsSubmitted(false);
                  reset();
                  setCurrentStep(1);
                }}
              >
                Take Survey Again
              </button>
            </div>
          </div>
        </div> */}
      
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
                            {Array.isArray(item.qaoptioneng) ? (
                              item.qaoptioneng.map((option, i) => (
                                <div className="flex gap-3 py-1">
                                  <input type="checkbox" />
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
                        ) : item.qatype === "radio" ? (
                          <>
                            {Array.isArray(item.qaoptioneng) ? (
                              item.qaoptioneng.map((option, i) => (
                                <div className="flex gap-3 py-1">
                                  <input type="radio" />
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
                        ) : item.qatype === "dropdown" ? (
                          <>
                            <div className="flex gap-3 py-1">
                              <select defaultValue="" className="select w-full font-[poppins] text-sm">
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
