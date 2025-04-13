import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import PaymentForm from "./PaymentForm";
import Footer from "./Footer";
import { darkSecureTheme, lightSecureTheme } from "../utils/theme";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <ThemeProvider theme={isDarkMode ? darkSecureTheme : lightSecureTheme}>
      <CssBaseline />
      <PaymentForm isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
