import DashboardStats from "./components/DashboardStats";
import LineChart from "./components/LineChart";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";
import HorizontalBarChart from "./components/HorizontalBarChart";
import StepsPieChart from "./components/StepsPieCharts";

function Dashboard() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { data: dashboard } = useGetDashboardQuery(auth?.role);
  let profileData = dashboard?.data?.profile;
  let mySteps = dashboard?.data?.my7steps;
  let bmiList = dashboard?.data?.bmiEM;
 
  return (
    <>
      <div className="">
        <DashboardStats profileData={profileData} />
      </div>
      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <LineChart bmiList={bmiList}/>
        <HorizontalBarChart mySteps={mySteps} />
      </div>
      <div>
        <div className="bg-[#ffff] py-4 shadow-md rounded-[13px] mt-3">
          <h2 className="px-4 text-[18px] font-semibold font-[poppins]">
            7 Steps Charts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
          <StepsPieChart
            title="Exercise"
            yes={mySteps?.ExYesCount || 50}
            no={mySteps?.ExNoCount || 50}
            colors1="#4CAF50"
            colors2="#FD8695"
          ></StepsPieChart>
          <StepsPieChart
            title="Fruits & Vegetables"
            yes={mySteps?.FVYesCount || 50}
            no={mySteps?.FVNoCount || 50}
            colors1="#FFC107"
            colors2="#2196F3"
          ></StepsPieChart>

          <StepsPieChart
            title="Meals"
            yes={mySteps?.MYesCount || 50}
            no={mySteps?.MNoCount || 50}
            colors1="#9C27B0"
            colors2="#FF9800"
          ></StepsPieChart>
          <StepsPieChart
            title="Sleep"
            yes={mySteps?.SleepYesCount || 50}
            no={mySteps?.SleepNoCount || 50}
            colors1="#3F51B5"
            colors2="#E91E63"
          ></StepsPieChart>

          <StepsPieChart
            title="Sugary Drinks"
            yes={mySteps?.SYesCount || 50}
            no={mySteps?.SNoCount || 50}
            colors1="#00BCD4"
            colors2="#8BC34A"
          ></StepsPieChart>
          <StepsPieChart
            title="Screen Time"
            yes={mySteps?.STYesCount || 50}
            no={mySteps?.STNoCount || 50}
            colors1="#FF5722"
            colors2="#607D8B"
          ></StepsPieChart>
          <StepsPieChart
            title="treatment"
            yes={mySteps?.TYesCount || 50}
            no={mySteps?.TNoCount || 50}
            colors1="#795548"
            colors2="#009688"
          ></StepsPieChart>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
