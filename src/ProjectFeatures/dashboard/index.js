import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import LineChart from './components/LineChart'
import { useGetDashboardQuery } from '../../features/dashboard/dashboardApi'
import PieChart from './components/PieCharts'

function Dashboard() {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const { data: dashboard } = useGetDashboardQuery(auth?.role);
  let avgInfo = dashboard?.data?.bmiDQ;
  let profileData = dashboard?.data?.profile;
  console.log("dashboard", dashboard);
    return (
        <>
            <div className="">          
            <DashboardStats  profileData={profileData}/>
            </div>
            {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <PieChart />
            </div>
            {/** ---------------------- Different stats content 2 ------------------------- */}
            {/* <div className="">
                 <AmountStats avgInfo={avgInfo}/> 
            </div> */}
        </>
    )
}

export default Dashboard