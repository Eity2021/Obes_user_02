import DashboardStats from "./components/DashboardStats";
import LineChart from "./components/LineChart";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";
import PieChart from "./components/HorizontalBarChart";
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
        <PieChart mySteps={mySteps} />
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
            yes={mySteps?.ExYesCount}
            no={mySteps?.ExNoCount}
            colors1="#4CAF50"
            colors2="#FD8695"
          ></StepsPieChart>
          <StepsPieChart
            title="Fruits & Vegetables"
            yes={mySteps?.FVYesCount}
            no={mySteps?.FVNoCount}
            colors1="#FFC107"
            colors2="#2196F3"
          ></StepsPieChart>

          <StepsPieChart
            title="Meals"
            yes={mySteps?.MYesCount}
            no={mySteps?.MNoCount}
            colors1="#9C27B0"
            colors2="#FF9800"
          ></StepsPieChart>
          <StepsPieChart
            title="Sleep"
            yes={mySteps?.SleepYesCount}
            no={mySteps?.SleepNoCount}
            colors1="#3F51B5"
            colors2="#E91E63"
          ></StepsPieChart>

          <StepsPieChart
            title="Sugary Drinks"
            yes={mySteps?.SYesCount}
            no={mySteps?.SNoCount}
            colors1="#00BCD4"
            colors2="#8BC34A"
          ></StepsPieChart>
          <StepsPieChart
            title="Screen Time"
            yes={mySteps?.STYesCount}
            no={mySteps?.STNoCount}
            colors1="#FF5722"
            colors2="#607D8B"
          ></StepsPieChart>
          <StepsPieChart
            title="treatment"
            yes={mySteps?.TYesCount}
            no={mySteps?.TNoCount}
            colors1="#795548"
            colors2="#009688"
          ></StepsPieChart>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
