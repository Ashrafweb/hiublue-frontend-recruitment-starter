import { Chip } from "@mui/material";

function MyChip({ status, label }: { status: string; label: string | number }) {
  const tagColor: { label: string; bgColor: string } = (() => {
    switch (status) {
      case "accepted":
        return { label: "rgb(17, 141, 87)", bgColor: "rgb(17, 141, 87,.4)" };
      case "pending":
        return { label: "rgb(183, 110, 0)", bgColor: "rgb(183, 110, 0,.4)" };

      case "rejected":
        return { label: "rgb(183, 29, 24)", bgColor: "rgb(183, 29, 24,.4)" };
      default:
        return { label: "rgb(27, 24, 183)", bgColor: "rgb(27, 24, 183,.4)" };
    }
  })();
  return (
    <Chip
      label={label}
      variant='filled'
      sx={{
        cursor: "default",
        bgcolor: tagColor.bgColor,
        color: tagColor.label,
        border: "none",
        width: "100%",
        borderRadius: "6px",
        "&:hover": {
          backgroundColor: "#fff",
        },
      }}
    />
  );
}

export default MyChip;
