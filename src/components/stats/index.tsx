import { Box, Grid, Paper, Skeleton } from "@mui/material";
import OffersSentChart from "../charts/offers";
import WebsiteVisitsChart from "../charts/visits";
import React from "react";
import { WeeklyData } from "@/types";

interface ChartsProps {
  stats: WeeklyData | null;
  loading: boolean;
  isPending: boolean;
}

const StatsComponent = (props: ChartsProps) => {
  const { stats, loading, isPending } = props;

  const renderSkeleton = () => (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Paper
            sx={{
              backgroundColor: "white",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Skeleton variant='rectangular' height={250} animation='wave' />
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper
            sx={{
              backgroundColor: "white",
              padding: 2,
              textAlign: "center",
            }}
          >
            <Skeleton variant='rectangular' height={250} animation='wave' />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return loading || isPending ? (
    renderSkeleton()
  ) : stats ? (
    <Box sx={{ flexGrow: 1, padding: 0 }}>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Paper
            sx={{
              backgroundColor: "#FFFFFF",
              padding: 2,
              textAlign: "center",
              boxShadow:
                "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
            }}
          >
            <WebsiteVisitsChart website_visits={stats.website_visits} />
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper
            sx={{
              backgroundColor: "#FFFFFF",
              padding: 2,
              textAlign: "center",
              boxShadow:
                "0px 0px 2px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
            }}
          >
            <OffersSentChart offers_sent={stats.offers_sent} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ) : null;
};

export default StatsComponent;
