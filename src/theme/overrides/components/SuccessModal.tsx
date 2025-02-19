// components/SuccessModal.tsx
import * as React from "react";
import { Modal, Box, Typography, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  message: string; // The success message to display
  title?: string; // Optional title, defaults to "Success"
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  open,
  onClose,
  message,
  title = "Success",
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "8px",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant='h5' component='h2' gutterBottom>
          {title} {/* Use the title prop */}
        </Typography>
        <Typography variant='body2' color='text.secondary' gutterBottom>
          {message} {/* Use the message prop */}
        </Typography>

        <Button
          onClick={onClose}
          variant='contained'
          sx={{
            mt: 2,
            bgcolor: "#00a76f",
            color: "white",
            "&:hover": { bgcolor: "#008050" },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
