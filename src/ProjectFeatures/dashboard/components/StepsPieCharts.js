import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TitleCard from "../../../components/Cards/TitleCard";

ChartJS.register(ArcElement, Tooltip, Legend);

const StepsPieChart = ({ yes, no, title, colors1, colors2 }) => {
  const data = {
    labels: [Number(yes) || 0, Number(no) || 0],
    datasets: [
      {
        data: [Number(yes) || 0, Number(no) || 0],
        backgroundColor: [
          colors1,
          colors2,
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
    <TitleCard title={title}>
      <div className="flex justify-center">
        <div className="w-[60%]">
          <Pie data={data} options={options} />
        </div>
      </div>
    </TitleCard>
  );
};

export default StepsPieChart;
