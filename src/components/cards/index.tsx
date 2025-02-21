import * as React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  useTheme,
  Box,
} from "@mui/material";
import Image from "next/image";
import { formatPercentageChange } from "@/lib/formatData";

interface CardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  unit?: string;
}

const SummaryCard = ({
  title,
  currentValue,
  previousValue,
  unit = "",
}: CardProps) => {
  const theme = useTheme();

  const percentageChange = previousValue
    ? ((currentValue - previousValue) / previousValue) * 100
    : 0;

  const isPositive = percentageChange > 0;
  const isNegative = percentageChange < 0;

  const icon = isPositive
    ? "/alt-arrow-up-bold-duotone.svg"
    : isNegative
    ? "/alt-arrow-down-bold-duotone.svg"
    : null;

  return (
    <Card sx={{ width: "100%", boxShadow: 3, height: "100%" }}>
      <CardActionArea
        sx={{
          height: "100%",
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": { backgroundColor: "action.selectedHover" },
          },
        }}
      >
        <CardContent
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 1.5,
          }}
        >
          <Typography variant='h6' component='h2' fontWeight={600}>
            {title}
          </Typography>

          <Typography
            variant='h3'
            fontWeight={700}
            sx={{ fontFamily: theme.typography.fontSecondaryFamily }}
          >
            {currentValue}
            {unit}
          </Typography>

          <Box display='flex' alignItems='center' gap={0.8}>
            {icon && (
              <Image
                src={icon}
                alt={isPositive ? "Increase" : "Decrease"}
                height={20}
                width={20}
                aria-hidden='true'
              />
            )}
            <Typography
              variant='h5'
              fontWeight={700}
              color={
                isPositive
                  ? "success.main"
                  : isNegative
                  ? "error.main"
                  : "text.secondary"
              }
            >
              {formatPercentageChange(percentageChange)}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              previous month
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SummaryCard;
