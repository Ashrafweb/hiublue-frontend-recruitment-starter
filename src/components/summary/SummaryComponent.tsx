import * as React from "react";
import { Box, Grid, Skeleton } from "@mui/material";
import SummaryCard from "@/components/cards";
import { CardData } from "@/types";

const SummaryComponent = (props: {
  cardData: CardData | null;
  loading: boolean;
  isPending: boolean;
}) => {
  const { cardData, loading, isPending } = props;

  const renderSkeletons = () => (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        p: 2,
      }}
    >
      <Grid container spacing={6}>
        <Grid item xs={12} sm={6} md={4}>
          <Skeleton variant='rectangular' height={150} animation='wave' />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Skeleton variant='rectangular' height={150} animation='wave' />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Skeleton variant='rectangular' height={150} animation='wave' />
        </Grid>
      </Grid>
    </Box>
  );

  return loading || isPending ? (
    renderSkeletons()
  ) : cardData ? (
    <Box
      sx={{
        width: "100%",
        flexGrow: 1,
        p: 1,
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
  ) : null;
};

export default SummaryComponent;
