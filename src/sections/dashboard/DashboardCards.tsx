import * as React from "react";
import { Box, Grid } from "@mui/material";
import SummaryCard from "@/components/cards";
import { CardData } from "@/types";
const DashboardCards = (props: { cardData: CardData }) => {
  const { cardData } = props;
  return (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        p: 2,
      }}
    >
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title='Total Active Users'
            currentValue={cardData.current.active_users / 1000}
            previousValue={cardData.previous.active_users / 1000}
            unit='k'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title='Total Clicks'
            currentValue={cardData.current.clicks / 1000}
            previousValue={cardData.previous.clicks / 1000}
            unit='k'
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SummaryCard
            title='Total Appearance'
            currentValue={cardData.current.appearance / 1000}
            previousValue={cardData.previous.appearance / 1000}
            unit='k'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardCards;
