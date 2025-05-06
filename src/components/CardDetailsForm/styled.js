import { styled } from "@mui/material";

export const CardWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "20px",
  padding: "20px",
  paddingBottom: "10px",
  backgroundColor: theme.palette.background.default,
  borderRadius: "12px",
  '& .MuiInputBase-root': {
    borderRadius: '8px'
  },
  "& .save-card": {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  '& .expiry-date': {
    minWidth: '89px',
    maxWidth: '89px'
  },
  '& .cvv': {
    minWidth: '70px',
    maxWidth: '70px',
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row'
  }
}));

export const PaymentAmount = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 15px",
  minHeight: "50px",
  borderRadius: "12px",
  backgroundColor: theme.palette.background.default,
  marginBottom: '20px',
  '& input::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& input::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '& input[type=number]': {
    '-moz-appearance': 'textfield',
  },
}));

export const EmailWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "5px 15px",
  marginBottom: "20px",
  borderRadius: "12px",
  backgroundColor: theme.palette.background.default,
}));