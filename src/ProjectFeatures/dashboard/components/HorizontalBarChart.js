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
        data: [mySteps?.ExYesCount, mySteps?.FVYesCount, mySteps?.MYesCount, mySteps?.SleepNoCount, mySteps?.SYesCount, mySteps?.STYesCount, mySteps?.TYesCount],
        backgroundColor: "#4CAF50", // green
      },
      {
        label: "No",
        data: [mySteps?.ExNoCount, mySteps?.FVNoCount, mySteps?.MNoCount, mySteps?.SleepYesCount, mySteps?.SNoCount, mySteps?.STNoCount, mySteps?.TNoCount],
        backgroundColor: "#4CBFC8", // pink
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
