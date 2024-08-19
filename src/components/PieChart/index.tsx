// components/PieChart.js
import React, { FC } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data1 = {
  labels: ["Đại biểu tôn giáo", "Đại biểu nữ", "Đại biểu dân tộc thiểu số", "Đại biểu người ngoài Đảng"],
  datasets: [
    {
      label: "Số đại biểu",
      data: [33, 148, 17, 90],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const data2 = {
  labels: ["Trên đại học", "Đại học", "Cao đẳng,trung cấp"],
  datasets: [
    {
      label: "Số đại biểu",
      data: [164, 152, 9],
      backgroundColor: ["rgba(255, 206, 86, 0.8)", "rgba(75, 192, 192, 0.8)", "rgba(153, 102, 255, 0.8)"],
      borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
      borderWidth: 1,
    },
  ],
};

const data3 = {
  labels: ["Cử nhân, Cao cấp", "Trung cấp", "Sơ cấp"],
  datasets: [
    {
      label: "Số đại biểu",
      data: [191, 74, 19],
      backgroundColor: ["rgba(255, 99, 132, 0.8)", "rgba(54, 162, 235, 0.8)", "rgba(255, 206, 86, 0.8)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
      borderWidth: 1,
    },
  ],
};

const PieChart: FC<any> = ({ type }) => {
  const data = type === 1 ? data1 : type === 2 ? data2 : data3;

  return <Pie data={data} />;
};

export default PieChart;
