import {Utensils, Dumbbell, Heart } from "lucide-react";
import Routine from "./Routine";
export default function Nutrition() {

  return (
    <>
      {/* Team Member list in table format loaded constant */}
      <div>
        <div className="grid gap-6 ">
          <div className="md:col-span-2 w-full">
              <div className=" space-y-6">
                {/* Morning Card */}
                <Routine
                  title="Morning Routine"
                  time="6:00 - 9:00 AM"
                  bgColor="bg-green-100"
                  textColor="text-green-800"
                  description="Start your day with energy"
                  items={[
                    {
                      icon: <Utensils className="h-5 w-5" />,
                      title: "Breakfast",
                      points: [
                        "Protein smoothie (30g protein)",
                        "Whole grain toast with avocado",
                        "2 eggs (optional)",
                        "Green tea or black coffee",
                      ],
                    },
                    {
                      icon: <Dumbbell className="h-5 w-5" />,
                      title: "Morning Exercise",
                      points: [
                        "10 min stretching",
                        "20 min cardio (jogging or cycling)",
                        "10 min core exercises",
                      ],
                    },
                  ]}
                />

                {/* Midday Card */}
                <Routine
                  title="Midday Routine"
                  time="12:00 - 2:00 PM"
                  bgColor="bg-blue-100"
                  textColor="text-blue-800"
                  description="Maintain energy throughout the day"
                  items={[
                    {
                      icon: <Utensils className="h-5 w-5" />,
                      title: "Lunch",
                      points: [
                        "Grilled chicken or tofu (4-6oz)",
                        "Mixed vegetables (2 cups)",
                        "Quinoa or brown rice (1/2 cup)",
                        "Olive oil & lemon dressing",
                      ],
                    },
                    {
                      icon: <Heart className="h-5 w-5" />,
                      title: "Midday Activity",
                      points: [
                        "10-15 min walk after lunch",
                        "5 min desk stretches",
                        "Hydrate (16oz water)",
                      ],
                    },
                  ]}
                />

                {/* Evening Card */}
                <Routine
                  title="Evening Routine"
                  time="5:00 - 9:00 PM"
                  bgColor="bg-indigo-100"
                  textColor="text-indigo-800"
                  description="Wind down and recover"
                  items={[
                    {
                      icon: <Utensils className="h-5 w-5" />,
                      title: "Dinner",
                      points: [
                        "Baked salmon or lentils",
                        "Steamed vegetables",
                        "Sweet potato or whole grain",
                        "Herbal tea before bed",
                      ],
                    },
                    {
                      icon: <Dumbbell className="h-5 w-5" />,
                      title: "Evening Exercise",
                      points: [
                        "30 min strength training",
                        "10 min cool down stretches",
                        "5 min meditation",
                      ],
                    },
                  ]}
                />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
