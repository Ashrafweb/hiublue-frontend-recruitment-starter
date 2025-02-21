"use client";

import StatsComponent from "@/components/stats";
import OffersList from "@/components/Tables/OfferList";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";

import { useEffect, useState, useTransition } from "react";
import { getStats, getSummary } from "@/lib/apiClient";
import { WeeklyData, CardData } from "@/types";
import { ExpandMore } from "@mui/icons-material";
import SummaryComponent from "@/components/cards/DashboardCards";
import { revalidateDashboard } from "@/lib/actions";

export default function DashboardView() {
  const [summaryData, setSummaryData] = useState<CardData | null>(null);
  const [stats, setStats] = useState<WeeklyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<string>("this-week");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await revalidateDashboard();
        const query = `?filter=${period}`;
        const [summary, stats] = await Promise.all([
          getSummary(query),
          getStats(query),
        ]);
        if (!summary || !stats) {
          throw new Error("Failed to fetch data from API");
        }

        setSummaryData(summary);
        setStats(stats);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [period]);

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

  return (
    <Box sx={{ flexGrow: 1, p: 2, maxWidth: "1500px", margin: "auto" }}>
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
      <SummaryComponent cardData={summaryData} loading={loading} />{" "}
      <Box sx={{ mt: 4 }}>
        <StatsComponent stats={stats} loading={loading} />
      </Box>
      <Box sx={{ mt: 4 }}>
        <OffersList loading={loading} />
      </Box>
    </Box>
  );
}
