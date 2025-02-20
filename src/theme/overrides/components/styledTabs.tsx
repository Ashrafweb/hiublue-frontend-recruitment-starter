import { styled, Tab, Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#222222", // Darker for better contrast
    height: "2px",
  },
});

export const StyledTab = styled(Tab)({
  textTransform: "none",
  fontWeight: 600,
  color: "#555555",
  "&.Mui-selected": {
    color: "#222222", // Darker than black for softer contrast
  },
  "&:hover": {
    color: "#333333", // Slight hover effect for better visibility
  },
  "&:focus": {
    outlineOffset: "2px",
  },
});
