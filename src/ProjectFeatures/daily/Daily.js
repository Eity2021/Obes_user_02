import { Check, Plus, X } from "lucide-react";
import TitleCard from "../../components/Cards/TitleCard";
import { useState } from "react";

function Daily() {
  const [activities, setActivities] = useState([
    { id: "1", name: "Morning workout", completed: false },
    { id: "2", name: "Read for 30 minutes", completed: false },
    { id: "3", name: "Drink 8 glasses of water", completed: false },
    { id: "4", name: "Meditate for 10 minutes", completed: false },
  ]);
  const [newActivity, setNewActivity] = useState("");

  const completedCount = activities.filter(
    (activity) => activity.completed
  ).length;
  const progress =
    activities.length > 0 ? (completedCount / activities.length) * 100 : 0;

  const toggleActivity = (id) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  };

  const addActivity = () => {
    if (newActivity.trim()) {
      setActivities([
        ...activities,
        {
          id: Date.now().toString(),
          name: newActivity.trim(),
          completed: false,
        },
      ]);
      setNewActivity("");
    }
  };

  const removeActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addActivity();
    }
  };

  const formatDate = () => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };
  return (
    <>
      <TitleCard title="Daily Tracker" topMargin="mt-2">
        <div>
          <div className="w-full bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <h2
                className="text-2xl font-bold"
                style={{ fontFamily: "poppins" }}
              >
                Daily Tracker
              </h2>
              <p className="text-gray-500 text-sm">{formatDate()}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span style={{ fontFamily: "poppins" }}>Progress</span>
                <span className="font-medium" style={{ fontFamily: "poppins" }}>
                  {completedCount}/{activities.length} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-[#FE9A00] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border rounded-lg p-3 shadow-sm border-[#d1d1cf]"
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => toggleActivity(activity.id)}
                      className={`h-6 w-6 flex items-center justify-center rounded-full border border-[#d1d1cf] ${
                        activity.completed
                          ? "bg-[#FE9A00] hover:bg-[#FE9A00]"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {activity.completed && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </button>
                    <span
                      className={`${
                        activity.completed
                          ? "line-through text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {activity.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeActivity(activity.id)}
                    className="h-6 w-6 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                placeholder="Add a new activity..."
                value={newActivity}
                onChange={(e) => setNewActivity(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 px-3 py-2 border border-[#d1d1cf] rounded-md focus:outline-none focus:ring-1 focus:ring-[#d1d1cf]"
              />
              <button
                onClick={addActivity}
                className="p-2 bg-[#FE9A00] text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="text-sm text-[#848580] border-t border-[#d1d1cf] pt-4">
              {completedCount === activities.length && activities.length > 0
                ? "Great job! All tasks completed."
                : "Keep going, you're making progress!"}
            </div>
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default Daily;
