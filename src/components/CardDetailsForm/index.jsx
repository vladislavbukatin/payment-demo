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
import { CardBack, CardFront, CardStripe, CardWrapper } from "./styled";

const CardDetailsForm = () => {
  return (
    <Box>
      <CardWrapper>
        <CardFront>
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Card Number"
                placeholder="5559 0000 0000 0000"
                margin="normal"
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
                label="Cardholder Name"
                placeholder="SAM SMITH"
                margin="normal"
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                fullWidth
                label="MM"
                placeholder="MM"
                margin="normal"
              />
            </Grid2>
            <Grid2 size={3}>
              <TextField
                fullWidth
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
        label="Email"
        placeholder="sam.smith@gmail.com"
        margin="normal"
      />
    </Box>
  );
};

export default CardDetailsForm;
