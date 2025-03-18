import React from "react";
import { TextField, Box, InputAdornment } from "@mui/material";

const CardDetailsForm = () => {
  return (
    <Box>
      <TextField
        fullWidth
        label="Card Number"
        placeholder="5559 0000 0000 0000"
        margin="normal"
        InputProps={{
          endAdornment: <InputAdornment position="end">💳</InputAdornment>,
        }}
      />
      <TextField fullWidth label="Cardholder Name" placeholder="SAM SMITH" margin="normal" />
      <Box display="flex" gap={2}>
        <TextField fullWidth label="Month" placeholder="MM" margin="normal" />
        <TextField fullWidth label="Year" placeholder="YY" margin="normal" />
      </Box>
      <TextField fullWidth label="CVC/CVV" placeholder="***" margin="normal" />
      <TextField fullWidth label="Email" placeholder="sam.smith@gmail.com" margin="normal" />
    </Box>
  );
};

export default CardDetailsForm;
