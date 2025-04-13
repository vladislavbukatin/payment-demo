import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ width: "100%", textAlign: "center", py: 2, borderTop: "1px solid #ccc", mt: 3 }}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} TransCrypter. All rights reserved.
      </Typography>
      <Box mt={1}>
        <Link href="/privacy" sx={{ mx: 1, fontSize: "12px" }}>
          Privacy Policy
        </Link>
        <Link href="/terms" sx={{ mx: 1, fontSize: "12px" }}>
          Terms of Service
        </Link>
        <Link href="/support" sx={{ mx: 1, fontSize: "12px" }}>
          Support
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
