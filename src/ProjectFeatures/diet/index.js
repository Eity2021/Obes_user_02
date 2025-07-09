import { CalendarDays } from "lucide-react";

import TitleCard from "../../components/Cards/TitleCard";
import PlanBuilder from "./PlanBuilder";
import DailySummery from "./DailySummery";
export default function DietPlan() {
  return (
    <TitleCard title="Your Diet Plan" topMargin="mt-2">
      <div className="container mx-auto py-12 px-4">
        <header className="mb-8">
          <h1
            className="text-3xl font-bold text-[#101010]"
            style={{ fontFamily: "poppins" }}
          >
            Your Diet Plan
          </h1>

          <div className="mt-2 flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-gray-500" />
            <span
              className="text-sm text-gray-500"
              style={{ fontFamily: "poppins" }}
            >
              Monday, April 13, 2025
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <PlanBuilder />
          </div>
          <div>
            <DailySummery />
          </div>
        </div>
      </div>
    </TitleCard>
  );
}
