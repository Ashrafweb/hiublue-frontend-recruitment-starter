import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardActionArea,
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

interface CardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  unit?: string; // Optional unit (e.g., 'k', '%')
}

const SummaryCard = ({
  title,
  currentValue,
  previousValue,
  unit = "",
}: CardProps) => {
  const percentageChange = () => {
    if (previousValue === 0) return 0;
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  const change = percentageChange();
  const icon =
    change > 0 ? (
      <ArrowUpward
        sx={{
          fontSize: "1rem",
          color: "success.main",
          verticalAlign: "middle",
          mr: 0.5,
        }}
      />
    ) : change < 0 ? (
      <ArrowDownward
        sx={{
          fontSize: "1rem",
          color: "error.main",
          verticalAlign: "middle",
          mr: 0.5,
        }}
      />
    ) : null;

  return (
    <Card sx={{ width: "100%", boxShadow: 3, height: "100%" }}>
      {" "}
      {/* Added height:100% */}
      <CardActionArea
        sx={{
          height: "100%", // Added height:100%
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
      >
        <CardContent sx={{ height: "100%" }}>
          {" "}
          {/* Added height:100% */}
          <Typography variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='h3' fontWeight={800} component='div'>
            {currentValue} {unit}
          </Typography>
          <Typography variant='h5' component='div'>
            <Typography variant='h5' component='span' fontWeight={700}>
              {icon}
              {Math.abs(change).toFixed(1)}%
            </Typography>
            <span style={{ fontWeight: 400, fontSize: 16 }}>
              &nbsp; previous month
            </span>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SummaryCard;
