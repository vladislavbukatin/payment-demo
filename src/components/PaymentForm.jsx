import React from "react";
import { Box, Typography, Button, Checkbox } from "@mui/material";
import { styled } from "styled-components";
import CardDetailsForm from "./CardDetailsForm";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
  padding: 20px;
`;

const PaymentBox = styled(Box)`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

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
