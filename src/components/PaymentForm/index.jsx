import React from "react";
import { Box, Typography, Button, Checkbox } from "@mui/material";
import { Container, PaymentBox } from "./styled";
import CardDetailsForm from "../CardDetailsForm";

const PaymentForm = () => {
  return (
    <Container>
      <PaymentBox>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <CardDetailsForm />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Continue
        </Button>
      </PaymentBox>
    </Container>
  );
};

export default PaymentForm;
