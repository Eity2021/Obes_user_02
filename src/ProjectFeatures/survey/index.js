import BasicInfo from "./BasicInfo";
import TitleCard from "../../components/Cards/TitleCard";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useGetAnswerListQuery } from "../../features/answer/answerApi";

function Survey() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    error: profileErr,
  } = useGetProfileQuery(auth?.role);

  console.log("profile", profile)

  const {
    data: surveyList,
    isLoading,
    isError,
    error,
  } = useGetAnswerListQuery(
    { id: profile?.data?.id, role: auth?.role },
    { skip: !profile?.data?.id }
  );


  //  Handle loading state
  if (profileLoading || isLoading) {
    return (
      <div className="flex justify-center items-center h-full bg-white rounded-md">
        <p className="text-gray-600">Loading survey data...</p>
      </div>
    );
  }

  //  Handle error state
  if (profileError || isError) {
    return (
      <div className="flex justify-center items-center h-full bg-white rounded-m">
        <p className="text-red-500">
          {profileErr?.data?.message ||
            error?.data?.message ||
            "Something went wrong while fetching survey data."}
        </p>
      </div>
    );
  }
  return (
    <>
      <TitleCard title="List Of Survey" topMargin="mt-2">
        <div>
          <div className=" mx-auto p-6 space-y-6">
            <div className="mb-8">
              <h1 className="lg:text-3xl md:text-2xl text-lg font-bold text-gray-700 mb-2 font-poppins">
                Obesity List Of Survey
              </h1>
              <p className="text-gray-600">Quiz Results & Responses</p>
            </div>
            <div>
              <BasicInfo surveyList={surveyList}></BasicInfo>
            </div>
            {surveyList?.data?.answerArray?.map((item, index) => (
              <div
                key={item?.qid}
                className="rounded-lg shadow-lg border-l-4 border-primary"
              >
                <div className="px-6 py-4 bg-gradient-to-r from-[#7B1E19]/10 to-[#7B1E19]/10 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <h2 className="text-md font-semibold text-gray-700 font-[poppins]">
                      Question {10 + index}
                    </h2>
                    <div className="flex gap-2">
                      <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">
                        {item?.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 space-y-4  bg-base-100">
                  {/* Question Section */}
                  <div className="p-4 rounded-lg border-l-4 border-gray-400">
                    <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2 font-poppins">
                      <svg
                        className="w-4 h-4 text-amber-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 9v2m0 4h.01M12 19c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" />
                      </svg>
                      Question:
                    </h3>
                    <p className="text-gray-700 font-[poppins]">{item.ques}</p>
                  </div>

                  {/* Response Section */}
                  <div className=" p-4 rounded-lg border-l-4 border-green-400">
                    <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2 font-poppins">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      Response:
                    </h3>

                    {Array.isArray(item.ans) === false ? (
                      <div className="text-gray-800">
                        {item.ans === "." ? (
                          <span className="text-gray-500 italic font-[poppins]">
                            No specific response provided
                          </span>
                        ) : (
                          <div className="flex items-center gap-2 p-2  bg-base-100 rounded border">
                            <svg
                              className="w-4 h-4 text-green-500 flex-shrink-0"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                            <span className=" font-[poppins] text-gray-700">
                              {item.ans}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="grid gap-2">
                        {Array.isArray(item.ans) &&
                          item.ans.map((answer, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 p-2 text-gray-700  bg-base-100 rounded border"
                            >
                              <svg
                                className="w-4 h-4 text-green-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                                viewBox="0 0 24 24"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="font-[poppins] text-gray-700 ">
                                {answer}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Survey;
