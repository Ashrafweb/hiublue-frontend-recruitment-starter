import { Chip } from "@mui/material";

function MyChip({ status, label }: { status: string; label: string | number }) {
  const tagStyles: { textColor: string; bgColor: string; hoverBg: string } =
    (() => {
      switch (status) {
        case "accepted":
          return {
            textColor: "#116D46",
            bgColor: "rgba(17, 109, 70, 0.2)",
            hoverBg: "rgba(17, 109, 70, 0.3)",
          };
        case "pending":
          return {
            textColor: "#B36E00",
            bgColor: "rgba(183, 110, 0, 0.2)",
            hoverBg: "rgba(183, 110, 0, 0.3)",
          };
        case "rejected":
          return {
            textColor: "#B71C1C",
            bgColor: "rgba(183, 28, 24, 0.2)",
            hoverBg: "rgba(183, 28, 24, 0.3)",
          };
        default:
          return {
            textColor: "#1B18B7",
            bgColor: "rgba(27, 24, 183, 0.2)",
            hoverBg: "rgba(27, 24, 183, 0.3)",
          };
      }
    })();

  return (
    <Chip
      label={label}
      variant='filled'
      sx={{
        cursor: "default",
        bgcolor: tagStyles.bgColor,
        color: tagStyles.textColor,
        borderRadius: "6px",
        paddingX: 1.5,
        fontSize: "0.875rem",
        fontWeight: 600,
        minWidth: "100px", // Ensures all chips have the same width
        display: "flex",
        justifyContent: "center", // Centers the text
        "&:hover": {
          backgroundColor: tagStyles.hoverBg,
        },
        "&:focus": {
          outline: "2px solid #000",
          outlineOffset: "2px",
        },
      }}
    />
  );
}

export default MyChip;
