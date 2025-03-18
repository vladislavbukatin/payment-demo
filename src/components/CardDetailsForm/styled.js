import styled from "styled-components";

const CARD_BACKGROUND_COLOR = "#f5f5f5";

export const CardWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "10px",
  '& .MuiInputBase-root': {
    backgroundColor: '#fff'
  }
}));

export const PaymentAmount = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 15px",
  minHeight: "50px",
  borderRadius: "12px",
  backgroundColor: CARD_BACKGROUND_COLOR,
  marginBottom: '30px'
}));

export const CardFront = styled("div")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "10px",
  backgroundColor: CARD_BACKGROUND_COLOR,
  padding: "10px",
  width: "95%",
  marginRight: "5%",
  borderRadius: "12px",
  border: '2px solid #ffffff',
  zIndex: 2,
}));

export const CardStripe = styled("div")(() => ({
  width: "100%",
  height: "50px",
  backgroundColor: "#2c2c2c",
  zIndex: 1,
  marginBottom: '30px',
  marginRight: '-20px'
}));

export const CardBack = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  zIndex: 1,
  width: "95%",
  marginLeft: "5%",
  alignItems: "center",
  backgroundColor: CARD_BACKGROUND_COLOR,
  marginTop: "-100px",
  marginBottom: "20px",
  padding: "20px 10px 10px 10px",
  borderRadius: "12px",
  "& .MuiGrid2-container": {
    width: "100%",
    minHeight: "50px",
    "& .MuiGrid2-root:first-child": {
      justifyContent: "flex-start",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },
    "& .MuiGrid2-root:last-child": {
      justifyContent: "flex-end",
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      "& .MuiFormControl-root": {
        maxWidth: "75px",
      },
    },
    "& .save-card": {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
  },
}));
