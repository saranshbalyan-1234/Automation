import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
export default function Donut({ data, setTableData }) {
  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    let tempLabels = [];
    let tempSeries = [];
    data.forEach((el) => {
      tempLabels.push(el.title);
      tempSeries.push(el.total);
      setSeries(tempSeries);
      setLabels(tempLabels);
    });
  }, []);

  const options = {
    chart: {
      events: {
        dataPointSelection: (event, chartContext, config) => {
          setTableData(
            data.find((el) => {
              return el.title === config.w.config.labels[config.dataPointIndex];
            }).data
          );
        },
      },
      toolbar: {
        show: true,
      },
    },

    legend: {
      show: true,
      position: "top",
      // horizontalAlign: "center",
    },
    responsive: [
      {
        breakpoint: 1000,
        options: {
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    labels: labels,
    // ...chartOptions
  };
  return (
    <div style={{ width: "100%", maxWidth: "600px" }}>
      <Chart
        options={options}
        // height={400}
        // minWidth={500}
        series={series}
        type="donut"
      />
    </div>
  );
}
