"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useTheme } from "@mui/material";
import { OffersSentType } from "@/types";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const OffersSentChart = ({ offers_sent }: { offers_sent: OffersSentType }) => {
  const theme = useTheme();
  const offersSentData = Object.entries(offers_sent).map(([day, count]) => ({
    x: day,
    y: count as number,
  }));

  const options: ApexOptions = {
    chart: {
      height: 450,
      type: "line",
      zoom: { enabled: false },
      toolbar: { show: false },
      fontFamily: theme.typography.fontFamily,
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", colors: ["#000"], width: 3 },
    title: {
      text: "Offers Sent",
      style: {
        fontFamily: theme.typography.fontFamily,
        fontWeight: 700,
      },
    },

    xaxis: {
      categories: Object.keys(offers_sent).map((day) => day.substring(0, 3)),
    },
  };

  const series = [
    {
      name: "Offers Sent",
      data: offersSentData.map((item) => item.y),
    },
  ];

  return <Chart options={options} series={series} type='line' height={400} />;
};

export default OffersSentChart;
