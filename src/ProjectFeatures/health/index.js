
import { useState } from 'react';
import TitleCard from "../../components/Cards/TitleCard";
import HealthMetrics from "./components/HealthMetrics";
import ReviewForm from "./components/ReviewForm";
import HealthSummary from "./components/HealthSummary";


function Health(){
  const [rating, setRating] = useState("3");
  const [submitted, setSubmitted] = useState(false);
  const [currentTab, setCurrentTab] = useState("metrics");

    return(
        <>
          <TitleCard title="Health Review" topMargin="mt-2">  
        <div className="h-[100%] bg-[rgba(123,30,25,0.1)] p-4 md:p-8  rounded-lg">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1
            className="text-3xl md:text-[42px] font-bold text-primary pt-4"
            style={{ fontFamily: "poppins" }}
          >
            Health Review Portal
          </h1>
          <p
            className="mt-2 text-gray-600 text-[16px]"
            style={{ fontFamily: "poppins" }}
          >
            Track, review, and improve your health journey
          </p>
        </header>

        {/* Tabs using DaisyUI */}
             <div className="w-full">
            <div className="grid grid-cols-3 mb-4">
              {["metrics", "review", "summary"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCurrentTab(tab)}
                  className={`py-2 px-4 font-medium border-b-2 ${
                    currentTab === tab
                      ? "text-[#7b1e19] border-[#7b1e19]"
                      : "text-gray-500 border-transparent hover:border-[#7b1e19]"
                  }`}
                >
                  {tab === "metrics"
                    ? "Health Metrics"
                    : tab === "review"
                    ? "Review Form"
                    : "Summary"}
                </button>
              ))}
            </div>

            {/* Health Metrics */}

            {currentTab === "metrics" && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <HealthMetrics
                  setRating={setRating}
                  setSubmitted={setSubmitted}
                  rating={rating}
                ></HealthMetrics>
              </div>
            )}

            {/* Review Form */}

            {currentTab === "review" && (
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <ReviewForm setRating={setRating} rating={rating}></ReviewForm>
              </div>
            )}

            {/* Summary */}
            {currentTab === "summary" && (
              <div className="bg-white rounded-lg shadow p-6">
                <HealthSummary
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  rating={rating}
                ></HealthSummary>
              </div>
            )}
          </div>
      </div>
    </div>
            </TitleCard>
        </>
    )
}

export default Health;