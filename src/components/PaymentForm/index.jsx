import React from "react";
import { Box, Typography, Button, Checkbox, Container } from "@mui/material";
import { PaymentBox } from "./styled";
import CardDetailsForm from "../CardDetailsForm";

const PaymentForm = () => {
  return (
    <Container>
      <PaymentBox>
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>
        <CardDetailsForm />
        <Box display="flex" alignItems="center" mt={1}>
          <Checkbox />
          <Typography variant="body2">Save card details</Typography>
        </Box>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Continue
        </Button>
      </PaymentBox>
    </Container>
  );
};

export default PaymentForm;
