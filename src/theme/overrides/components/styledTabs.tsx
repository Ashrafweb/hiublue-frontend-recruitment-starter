import { styled, Tab, Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#000000", // Changed to black
    height: "2px",
  },
});

export const StyledTab = styled(Tab)({
  textTransform: "none",
  fontWeight: 600,
  "&.Mui-selected": {
    color: "#000000",
  },
});
