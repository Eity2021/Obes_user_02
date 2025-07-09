import moment from "moment";
import TitleCard from "../../components/Cards/TitleCard";
import { useState } from "react";
import Nutrition from "./Nutrition";
import ExercisePlan from "./ExercisePlan";

function Exercise() {
  const [tab, setTab] = useState("today");

  return (
    <>
      <TitleCard title="Recent Transactions" topMargin="mt-2">
        <div>
          <div>
            <div className="mb-8">
              <h1
                className="text-[32px] font-bold tracking-tight text-text-[#101010] md:text-[42px]"
                style={{ fontFamily: "poppins" }}
              >
                Nutrition + Exercise Plan
              </h1>
              <p
                className="mt-0 text-lg text-gray-600"
                style={{ fontFamily: "poppins" }}
              >
                Your personalized routine for optimal health and fitness
              </p>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-4">
            <div class="col-span-2 ...">
              <Nutrition></Nutrition>
            </div>
            <div class="...">
              <ExercisePlan></ExercisePlan>
            </div>
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Exercise;
