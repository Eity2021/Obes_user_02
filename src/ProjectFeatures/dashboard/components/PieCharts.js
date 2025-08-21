import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Underweight", "Normal", "Overweight", "Obese"],
    datasets: [
      {
        label: "BMI Categories",
        data: [10, 40, 30, 20], // Example data (you can use your API values)
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
    <div className="mx-auto w-full bg-white p-4 rounded-2xl shadow-md">
         <h2 className="text-lg font-semibold mb-3 text-center">BMI Distribution</h2>
  <div className=" flex justify-center">
       <div className="w-[65%]">
      <Pie data={data} options={options} />
     </div>
  </div>
    </div>
  );
};

export default PieChart;
