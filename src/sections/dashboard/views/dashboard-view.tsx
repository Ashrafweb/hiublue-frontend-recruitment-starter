"use client";

import Charts from "@/components/charts";
import OffersList from "@/components/Tables/OfferList";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import DashboardCards from "../DashboardCards";
import { useEffect, useState } from "react";
import { getDashboardStats, getDashboardSummary } from "@/lib/apiClient";
import { WeeklyData, CardData } from "@/types";
import { ExpandMore } from "@mui/icons-material";

export default function DashboardView() {
  const [summaryData, setSummaryData] = useState<CardData | null>(null); // Use CardData type
  const [stats, setStats] = useState<WeeklyData | null>(null); // Use WeeklyData type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<string>("this-week");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `?filter=${period}`;
        const summary = await getDashboardSummary(query);
        const stats = await getDashboardStats(query);

        if (!summary || !stats) {
          throw new Error("Failed to fetch data from API");
        }

        setSummaryData(summary);
        setStats(stats);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [period]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          color: "red",
        }}
      >
        Error: {error}
      </Box>
    );
  }

  if (!summaryData || !stats) {
    // Check for both summaryData and stats
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        No data available
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3, maxWidth: "1500px", margin: "auto" }}>
      <Box sx={{ mb: 4, mx: 2 }}>
        <Grid container justifyContent='space-between'>
          <Typography variant='h3' component='h1' gutterBottom>
            Dashboard
          </Typography>
          <Select
            labelId='week-range-label'
            id='week-range-select'
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            IconComponent={() => <ExpandMore />}
          >
            <MenuItem value='this-week'>This Week</MenuItem>
            <MenuItem value='prev-week'>Previous Week</MenuItem>
          </Select>
        </Grid>
      </Box>
      <DashboardCards cardData={summaryData} /> {/* Pass summaryData */}
      <Box sx={{ mt: 4 }}>
        <Charts stats={stats} /> {/* Pass stats */}
      </Box>
      <Box sx={{ mt: 4 }}>
        <OffersList />
      </Box>
    </Box>
  );
}
