import { Box, Grid, Paper } from "@mui/material";
import OffersSentChart from "./offers";
import WebsiteVisitsChart from "./visits";
import React from "react";
import { WeeklyData } from "@/types";

interface ChartsProps {
  stats: WeeklyData;
}
const Charts: React.FC<ChartsProps> = ({ stats }) => {
  return (
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
            <WebsiteVisitsChart website_visits={stats.website_visits} />
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
            <OffersSentChart offers_sent={stats.offers_sent} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Charts;
