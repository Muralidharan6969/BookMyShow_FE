import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomModal = ({
  open,
  onClose,
  maxWidth,
  height,
  width,
  title,
  children,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Slide}
      transitionDuration={500}
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        },
        "& .MuiDialog-paper": {
          maxWidth: maxWidth ? maxWidth : "lg",
          minHeight: height ? height : "500px",
          width: width
            ? width
            : {
                xs: "90%", // 90% of viewport width on small screens
                sm: "80%",
                md: "60%", // 60% on medium screens
                lg: "50%",
              },
          borderRadius: "20px",
        },
      }}
    >
      <Box
        sx={{ backgroundColor: theme.palette.primary.main, height: "20px" }}
      ></Box>
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          fontSize: theme.typography.h3.fontSize,
          fontWeight: 700,
          color: theme.palette.text.main,
          textAlign: "left",
        }}
      >
        {title}
      </DialogTitle>
      {onClose && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 25,
            fontWeight: 700,
            color: theme.palette.secondary.main,
          }}
        >
          <CloseIcon sx={{ color: theme.palette.secondary.main }} />
        </IconButton>
      )}
      <DialogContent
        sx={{
          fontSize: theme.typography.body1.fontSize,
          fontWeight: theme.typography.body1.fontWeight,
          color: theme.palette.text.main,
          overflowY: "auto",
          maxHeight: "calc(100vh - 200px)",
          p: 2,
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
