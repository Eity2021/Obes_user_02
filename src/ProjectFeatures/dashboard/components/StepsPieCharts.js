import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TitleCardSteps from "./TitleCardSteps";

ChartJS.register(ArcElement, Tooltip, Legend);

const StepsPieChart = ({ yes, no, title, colors1, colors2 }) => {
  const data = {
    labels: ["Yes", "No"],
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
    <TitleCardSteps title={title}>
      <div className="flex justify-center" >
        <div className="w-[60%] flex justify-center">
          <Pie data={data} options={options} />
        </div>
      </div>
    </TitleCardSteps>
  );
};

export default StepsPieChart;
