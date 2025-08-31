import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TitleCard from "../../../components/Cards/TitleCard";

// Register required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = ({ mySteps }) => {
  const data = {
    labels: ["Exercise", "Fruits & Veggies", "Meals", "Sleep", "Sugary Drinks", "Screen Time", "treatment"],
    datasets: [
      {
        label: "Yes",
        data: [(mySteps?.ExYesCount || 10), (mySteps?.FVYesCount || 10), (mySteps?.MYesCount || 10),( mySteps?.SleepNoCount || 10),( mySteps?.SYesCount || 10),( mySteps?.STYesCount || 10), (mySteps?.TYesCount || 10)],
        backgroundColor: "#4CAF50", 
      },
      {
        label: "No",
        data: [(mySteps?.ExNoCount || 10),( mySteps?.FVNoCount || 10), (mySteps?.MNoCount || 10), (mySteps?.SleepYesCount || 10),( mySteps?.SNoCount || 10), (mySteps?.STNoCount || 10), (mySteps?.TNoCount || 10)],
        backgroundColor: "#E14954",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "7 Steps Bar Chart",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
    },
  };

  return (
    <TitleCard title={"7 Steps"}>
      <div className="w-full max-w-3xl mx-auto">
        <Bar data={data} options={options} />
      </div>
    </TitleCard>
  );
};

export default HorizontalBarChart;
