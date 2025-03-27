import React, { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import PaymentForm from "./PaymentForm";
import { darkSecureTheme, lightSecureTheme } from "./theme";
import Footer from "./Footer";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? darkSecureTheme : lightSecureTheme}>
      <CssBaseline />
      <PaymentForm isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Footer />
    </ThemeProvider>
  );
};

export default App;
