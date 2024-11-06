import { Pie } from "react-chartjs-2";
import "chart.js/auto"; // Required for auto-registration in Chart.js

const DashboardSalesRanking = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="w-1/2 mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default DashboardSalesRanking;
