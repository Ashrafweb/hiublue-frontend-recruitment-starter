"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useTheme } from "@mui/material";
import React from "react";
import { WebsiteVisitType } from "@/types";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const WebsiteVisitsChart = ({
  website_visits,
}: {
  website_visits: WebsiteVisitType;
}) => {
  const websiteVisitsData = Object.entries(website_visits).map(
    ([day, visits]) => ({
      x: day,
      y: {
        desktop: (visits as { desktop: number; mobile: number }).desktop,
        mobile: (visits as { desktop: number; mobile: number }).mobile,
      },
    })
  );

  const theme = useTheme();

  const options: ApexOptions = {
    chart: {
      fontFamily: theme.typography.fontFamily,
      type: "bar",
      toolbar: {
        show: false,
      },
    },

    colors: [theme.palette.success.main, theme.palette.info.main],
    stroke: { show: true, width: 4, colors: ["transparent"] },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
        columnWidth: "85%",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      markers: { shape: "circle" },
    },

    xaxis: {
      categories: Object.keys(website_visits).map((day) => day.substring(0, 3)),
    },
    yaxis: {
      title: { text: "" },
    },
    title: {
      text: "Website Visits",
      style: {
        fontFamily: "Inter Sans Serif, sans-serif",
        fontWeight: 600,
      },
    },
  };

  const series = [
    {
      name: "Desktop Visits",
      data: websiteVisitsData.map((item) => item.y.desktop),
    },
    {
      name: "Mobile Visits",
      data: websiteVisitsData.map((item) => item.y.mobile),
    },
  ];

  return <Chart options={options} series={series} type='bar' height={400} />;
};

export default WebsiteVisitsChart;
