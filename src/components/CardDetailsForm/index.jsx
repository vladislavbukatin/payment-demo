import React from "react";
import {
  TextField,
  Box,
  InputAdornment,
  Grid,
  Grid2,
  Checkbox,
  Typography,
} from "@mui/material";
import { CardBack, CardFront, CardStripe, CardWrapper, PaymentAmount } from "./styled";


const CardDetailsForm = ({ setPaymentData, paymentData }) => {
  return (
    <Box>
      <PaymentAmount>
        <Typography>Payment Amount</Typography>
        <Typography>$2.00</Typography>
      </PaymentAmount>
      <CardWrapper>
        <CardFront>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                required
                value={paymentData.cardNumber}
                label="Card Number"
                placeholder="5559 0000 0000 0000"
                margin="normal"
                onChange={(e) => {
                  setPaymentData({ ...paymentData, cardNumber: e.target.value });
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">💳</InputAdornment>
                  ),
                }}
              />
            </Grid2>
            <Grid2 size={6}>
              <TextField
                fullWidth
                required
                value={paymentData.cardHolder}
                onChange={(e) => {
                  setPaymentData({ ...paymentData, cardHolder: e.target.value });
                }}
                label="Cardholder Name"
                placeholder="SAM SMITH"
                margin="normal"
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                fullWidth
                required
                label="MM"
                value={paymentData.expiryMonth}
                onChange={(e) => {
                  setPaymentData({ ...paymentData, expiryMonth: e.target.value });
                }}
                placeholder="MM"
                margin="normal"
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                fullWidth
                required
                value={paymentData.expiryYear}
                onChange={(e) => {
                  setPaymentData({ ...paymentData, expiryYear: e.target.value });
                }}
                label="YY"
                placeholder="YY"
                margin="normal"
              />
            </Grid2>
          </Grid2>
        </CardFront>
        <CardBack>
          <CardStripe />
          <Grid2 container>
            <Grid2 size={6}>
              <Box className="save-card">
                <Checkbox />
                <Typography variant="body2">Save card details</Typography>
              </Box>
            </Grid2>
            <Grid2 size={6}>
              <TextField
                size="small"
                required
                value={paymentData.cvv}
                onChange={(e) => {
                  setPaymentData({ ...paymentData, cvv: e.target.value });
                }}
                label="CVV"
                placeholder="***"
                margin="normal"
              />
            </Grid2>
          </Grid2>
        </CardBack>
      </CardWrapper>
      <TextField
        fullWidth
        required
        value={paymentData.email}
        onChange={(e) => {
          setPaymentData({ ...paymentData, email: e.target.value });
        }}
        label="Email"
        placeholder="sam.smith@gmail.com"
        margin="normal"
      />
    </Box>
  );
};

export default CardDetailsForm;
