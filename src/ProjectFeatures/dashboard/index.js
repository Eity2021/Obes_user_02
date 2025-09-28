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
        <LineChart bmiList={bmiList} />
        <HorizontalBarChart mySteps={mySteps} />
      </div>
      <div>
        <div className=" bg-base-100 py-4 shadow-md rounded-[13px] mt-3">
          <h2 className="px-4 text-[18px] font-semibold font-[poppins]">
            7 Steps Charts
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
          <StepsPieChart
            title="Exercise"
            yes={mySteps?.ExYesCount || 50}
            no={mySteps?.ExNoCount || 50}
            colors1="#4CA4FF"
            colors2="#00B6DF"
          ></StepsPieChart>
          <StepsPieChart
            title="Fruits & Vegetables"
            yes={mySteps?.FVYesCount || 50}
            no={mySteps?.FVNoCount || 50}
            colors1="#95E500"
            colors2="#00CB4D"
          ></StepsPieChart>

          <StepsPieChart
            title="Meals"
            yes={mySteps?.MYesCount || 50}
            no={mySteps?.MNoCount || 50}
            colors1="#00DE73"
            colors2="#00C07C"
          ></StepsPieChart>
          <StepsPieChart
            title="Sleep"
            yes={mySteps?.SleepYesCount || 50}
            no={mySteps?.SleepNoCount || 50}
            colors1="#343F50"
            colors2="#151C2D"
          ></StepsPieChart>

          <StepsPieChart
            title="Sugary Drinks"
            yes={mySteps?.SYesCount || 50}
            no={mySteps?.SNoCount || 50}
            colors1="#FF850B"
            colors2="#FC3835"
          ></StepsPieChart>
          <StepsPieChart
            title="Screen Time"
            yes={mySteps?.STYesCount || 50}
            no={mySteps?.STNoCount || 50}
            colors1="#C578FF"
            colors2="#F33CA2"
          ></StepsPieChart>
          <StepsPieChart
            title="treatment"
            yes={mySteps?.TYesCount || 50}
            no={mySteps?.TNoCount || 50}
            colors1="#FF6080"
            colors2="#F73997"
          ></StepsPieChart>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
