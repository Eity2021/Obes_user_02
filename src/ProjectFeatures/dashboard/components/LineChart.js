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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MonthlyBMIChart = ({ bmiList }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  const monthlyBMI = {};
  months.forEach(m => monthlyBMI[m] = null);


  bmiList?.forEach(item => {
    const date = new Date(item.created_at);
    const month = months[date.getMonth()];
    const bmi = parseFloat(item.bmi);

    if (!monthlyBMI[month] || monthlyBMI[month] === null) {
      monthlyBMI[month] = { total: 0, count: 0 };
    }
    monthlyBMI[month].total += bmi;
    monthlyBMI[month].count += 1;
  });


  const bmiData = months.map(m => {
    if (monthlyBMI[m] && monthlyBMI[m].count) {
      return (monthlyBMI[m].total / monthlyBMI[m].count).toFixed(2);
    }
    return 0; 
  });

  const backgroundColors = months.map(m => {
    return (monthlyBMI[m] && monthlyBMI[m].count) ? "#4CAF50" : "#4CAF50"; // green if data, yellow if no data
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "BMI",
        data: bmiData,
        backgroundColor: backgroundColors,
        maxBarThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Monthly BMI (12 months)" },
    },
    scales: {
      y: { beginAtZero: true },
      x: {
  
        barPercentage: 0.6,      
        categoryPercentage: 0.7,
      },
    },
  };

  return (
    <TitleCard>
      <div className="w-full max-w-3xl mx-auto">
        <Bar data={data} options={options} />
      </div>
    </TitleCard>
  );

};

export default MonthlyBMIChart;
