import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";

export const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  padding: "20px",
}));

export const PaymentBox = styled("div")(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "450px",
  width: "95%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  "& .payment-title": {
    marginBottom: "26px",
    marginLeft: "20px",
    width: "100%",
  },
}));

export const ThemeIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "inherit",
}));

export const LogoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  marginBottom: "24px",
  "& img": {
    width: "100%",
    maxWidth: "230px",
  },
}));

export const TermsWrapper = styled("div")(({ theme }) => ({
  marginLeft: "5px",
  marginTop: "5px",
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "flex-start",
  width: "100%",
  "& a": {
    color: "#FFC107",
    marginLeft: "3px",
  },
}));

export const FullScreenIframe = styled("iframe")(() => ({
  position: "fixed",
  top: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  border: "none",
  background: "rgba(0, 0, 0, 0.8)",
  zIndex: "1000",
}));

export const ModalContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  background: theme.palette.background.paper,
  borderRadius: "12px",
  padding: "32px",
  width: "90%",
  maxWidth: "420px",
  boxShadow: "0 6px 16px rgba(0, 0, 0, 0.3)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
}));

export const SuccessIcon = styled(CheckCircleOutline)(({ theme }) => ({
  fontSize: "64px",
  color: theme.palette.success.main,
}));

export const ErrorIcon = styled(ErrorOutline)(({ theme }) => ({
  fontSize: "64px",
  color: theme.palette.error.main,
}));