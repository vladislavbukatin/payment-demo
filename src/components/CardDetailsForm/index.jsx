import React from "react";
import {
  TextField,
  Box,
  InputAdornment,
  Grid,
  Checkbox,
  Typography,
  Divider,
  keyframes,
  useMediaQuery,
} from "@mui/material";
import { CardWrapper, EmailWrapper, PaymentAmount } from "./styled";
import { CreditCard } from "@mui/icons-material";

const CardDetailsForm = ({
  setPaymentData,
  paymentData,
  errors,
  validateField,
}) => {
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    let formattedValue = "";

    if (value.length >= 2) {
      formattedValue = value.slice(0, 2);
      if (value.length > 2) {
        formattedValue += " / " + value.slice(2, 4);
      }
    } else {
      formattedValue = value;
    }

    setPaymentData({
      ...paymentData,
      expiryMonth: value.slice(0, 2),
      expiryYear: value.length > 2 ? value.slice(2, 4) : "",
    });
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setPaymentData({ ...paymentData, cvv: value });
  };

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (e) => {
    setPaymentData({
      ...paymentData,
      cardNumber: formatCardNumber(e.target.value),
    });
  };

  const handleCardHolderChange = (e) => {
    setPaymentData({ ...paymentData, cardHolder: e.target.value });
  };

  const handleEmailChange = (e) => {
    setPaymentData({ ...paymentData, email: e.target.value });
  };

  const isMobile = useMediaQuery("(max-width:500px)");

  return (
    <Box>
      <PaymentAmount>
        <Typography>Payment Amount</Typography>
        <Typography>$1.00</Typography>
      </PaymentAmount>
      <CardWrapper>
      <Typography variant="subtitle1" sx={{ width: "100%", mb: 1 }}>Card Details</Typography>
        <Grid container columnSpacing={isMobile ? 0 : 2} >
          <Grid size={12}>
            <TextField
              fullWidth
              required
              autoComplete="off"
              value={paymentData.cardNumber}
              label="Card Number"
              placeholder="5559 0000 0000 0000"
              margin="normal"
              onBlur={(e) => validateField("cardNumber", e.target.value)}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              onChange={handleCardNumberChange}
              slotProps={{
                input: {
                  maxLength: 19,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  endAdornment: (
                    <InputAdornment position="end">
                      <CreditCard />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid>
          <Grid size={isMobile ? 12 : 6}>
            <TextField
              className="card-holder"
              required
              fullWidth
              size="small"
              autoComplete="off"
              error={!!errors.cardHolder}
              onBlur={(e) => validateField("cardHolder", e.target.value)}
              value={paymentData.cardHolder}
              onChange={handleCardHolderChange}
              label="Name"
              placeholder="SAM SMITH"
              margin="normal"
            />
          </Grid>
          <Grid size={isMobile ? 6 : 3.5}>
            <TextField
              className="expiry-date"
              required
              label="MM/YY"
              size="small"
              error={!!errors.expiryMonth || !!errors.expiryYear}
              onBlur={(e) => {
                validateField("expiryMonth", e.target.value);
                validateField("expiryYear", e.target.value);
              }}
              autoComplete="off"
              value={`${paymentData.expiryMonth}${
                paymentData.expiryYear ? ` / ${paymentData.expiryYear}` : ""
              }`}
              onChange={handleExpiryDateChange}
              placeholder="MM / YY"
              margin="normal"
            />
          </Grid>
          <Grid size={isMobile ? 6 : 2.5} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <TextField
              className="cvv"
              required
              size="small"
              value={paymentData.cvv}
              type="password"
              error={!!errors.cvv}
              onBlur={(e) => validateField("cvv", e.target.value)}
              onChange={handleCvvChange}
              label="CVV"
              autoComplete="off"
              placeholder="CVV"
              margin="normal"
              slotProps={{
                input: {
                  maxLength: 3,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                },
              }}
            />
          </Grid>
          <Grid size={12}>
            <Box className="save-card">
              <Checkbox />
              <Typography variant="body2">Save card details</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardWrapper>
      <EmailWrapper>
        <TextField
          fullWidth
          error={!!errors.email}
          onBlur={(e) => validateField("email", e.target.value)}
          value={paymentData.email}
          onChange={handleEmailChange}
          label="Email"
          autoComplete="off"
          helperText={
            !!errors.email
              ? errors.email
              : "Optional field, enter if you want to receive a receipt"
          }
          placeholder="Email"
          margin="normal"
        />
      </EmailWrapper>
    </Box>
  );
};

export default CardDetailsForm;
