import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TitleCard from "../../../components/Cards/TitleCard";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Underweight", "Normal", "Overweight", "Obese"],
    datasets: [
      {
        label: "BMI Categories",
        data: [10, 40], 
        backgroundColor: [
          "#FD8695", // pink
          "#4CAF50", // green
          "#FFC107", // yellow
          "#A67A5E", // brown
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14,
            family: "Poppins",
          },
        },
      },
    },
  };

  return (

    <TitleCard title={"7 Steps"}>
        <div className=" flex justify-center">
          <div className="w-[65%]">
            <Pie data={data} options={options} />
         </div>
       </div>
  </TitleCard>
 
  );
};

export default PieChart;
