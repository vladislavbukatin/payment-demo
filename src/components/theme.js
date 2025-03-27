import { createTheme } from "@mui/material/styles";
import "@fontsource/space-grotesk";

export const darkSecureTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#009688",
    },
    secondary: {
      main: "#FFC107",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
      card: "#212121",
      input: "#2C2C2C",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B2DFDB",
    },
  },
  typography: {
    fontFamily: "Space Grotesk, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 500, textTransform: "none" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.5)",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          paddingLeft: "8px",
          color: "#7ec8e3",
        },
      },
    },
    MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#2C2C2C",
              borderRadius: "8px",
      
              "& fieldset": { 
                borderColor: "#009688",
              },
              "&:hover fieldset": { 
                borderColor: "#B2DFDB",
              },
              "&.Mui-focused fieldset": { 
                borderColor: "#FFC107",
              },
            },
            "& input": { 
              color: "#B2DFDB",
              backgroundColor: "transparent",
            },
            "& .MuiInputLabel-root": {
              color: "#B2DFDB",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#FFC107",
            },
            "& .MuiFormHelperText-root": {
              color: "#B2DFDB",
              backgroundColor: "transparent",
              padding: "2px 8px",
            },
          },
        },
      },
      
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#009688",
          color: "#121212",
          "&:hover": { backgroundColor: "#00796B" },
        },
      },
    },
  },
});

export const lightSecureTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#00796B",
    },
    secondary: {
      main: "#FFA726",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
      card: "#E3F2FD",
      input: "#E0F2F1",
    },
    text: {
      primary: "#212121",
      secondary: "#004D40",
    },
    error: {
      main: "#D32F2F",
    },
  },
  typography: {
    fontFamily: "Space Grotesk, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    body1: { fontWeight: 400 },
    button: { fontWeight: 500, textTransform: "none" },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#E0F2F1",
              borderRadius: "8px",
      
              "& fieldset": {
                borderColor: "#00796B",
              },
              "&:hover fieldset": {
                borderColor: "#004D40",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FFA726", 
              },
            },
            "& input": {
              color: "#004D40", 
              backgroundColor: "transparent",
            },
          },
        },
      },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#00796B",
          color: "#FFFFFF",
          "&:hover": { backgroundColor: "#004D40" },
        },
      },
    },
  },
});
