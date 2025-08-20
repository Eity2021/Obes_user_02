import React from 'react'








export default function BasicInfo({ surveyList }) {
    let basicInfo = surveyList?.data?.anslist;
    console.log("data", basicInfo);


    const questions = [
        {
            "id" : 1,
            "question": "What is your age?",
            "answer": basicInfo?.age
        },

        {
             "id" : 2,
            "question": "What is your Body Mass Index (BMI)?",
            "answer": basicInfo?.bmi
        },
        {
               "id" : 3,
            "question": "How many calories do you consume daily?",
            "answer": basicInfo?.calory
        },
        {
               "id" : 4,
            "question": "What is your email address?",
            "answer": basicInfo?.email
        },
        {
               "id" : 5,
            "question": "What is your gender?",
            "answer": basicInfo?.gender
        },
        {
               "id" : 6,
            "question": "What is your height (in inches)?",
            "answer": basicInfo?.height
        },
         {
               "id" : 7,
            "question": "What is your weight (in lbs)?",
            "answer": basicInfo?.weight
        },
      
        {
               "id" : 8,
            "question": "What is your mobile number?",
            "answer": basicInfo?.mobile
        },
        {
               "id" : 9,
            "question": "What is your obesity category?",
            "answer": basicInfo?.obesity_category
        },
       
    ]



    return (
        <div>
            {
                questions?.map((question) => (
                    <div>
                        <div key={question?.id} className="rounded-lg shadow-lg border-l-4 border-primary bg-white mb-4">
                            <div className="px-6 py-4 bg-gradient-to-r from-[#7B1E19]/10 to-[#7B1E19]/10 rounded-t-lg">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-md font-semibold text-gray-800  font-[poppins]">Question {question?.id}</h2>
                                    <div className="flex gap-2">
                                        <span className="bg-[#7B1E19]/20 text-primary text-xs font-medium px-2 py-1 rounded">Basic Information</span>
                                    </div>
                                </div>
                            </div>
                       
                        <div className="px-6 py-4 space-y-4">
                            {/* Question Section */}
                            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                                <h3 className="font-medium text-gray-700 mb-2 flex items-center gap-2 font-[poppins]">
                                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M12 9v2m0 4h.01M12 19c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z" />
                                    </svg>
                                    Question: 
                                </h3>
                                <p className="text-gray-800 font-[poppins]">{question?.question}</p>
                            </div>
                            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                                <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2 font-[poppins]">
                                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M5 13l4 4L19 7" />
                                    </svg>
                                    Response:
                                </h3>
                                <div className="text-gray-800">
                                    <div className="flex items-center gap-2 p-2 bg-white rounded border">
                                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-800 font-[poppins]">{question?.answer}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                     </div>
                ))
            }
        </div>


    )
}
